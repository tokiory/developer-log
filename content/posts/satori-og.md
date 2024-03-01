---
title: Автогенерация превью с помощью Satori
tags:
  - open-graph
  - web
  - backend
  - nuxt
description: >
  В данной статье рассказывается об автогенерации превью с помощью Satori. Satori - библиотека от Vercel, которая создана для
  того чтобы превращать HTML-верстку в SVG картинки. С помощью данной библиотеки мы будем динамически генерировать
  Open Graph превью для страниц. В данном блоге превью сделаны именно по этому принципу, так что вперед под кат :)
date: 2023-04-08
origin:
  type: vc
  url: https://vc.ru/dev/661531-avtogeneraciya-prevyu-s-pomoshchyu-satori
---

У каждого сайта есть специальные теги - [Open Graph](https://www.ogp.me), они нужны для того чтобы поисковые системы оптимизировали
выдачу контента в самом поиске. Также данные теги нужны для того чтобы при отправке ссылки мессенджеры могли
подтянуть заголовок, описание и превью для сайта.

Тема OG несколько запутана, однако сейчас мы постараемся разложить все по полочкам. Open Graph-теги выглядят следующим
образом:

```html[open-graph-head.html] Базовые Open Graph-теги
<meta property="og:title" content="Заголовок сайта" />
<meta property="og:description" content="Описание сайта" />
<meta property="og:image" content="Ссылка к превью" />
```

По умолчанию `og:image` подтягивает только картинки с форматом `.jpg, .png`. Нам предстоит сделать генерацию этих картинок с помощью
API.

> Далее все действия выполняются в рабочем пространстве Nuxt

# Принцип генерации превью

Принцип по которому генерируются превью следующий:
1. Мы генерируем темплейт с помощью [satori-html](https://www.npmjs.com/package/satori-html), он нужен для того чтобы затем мы перевели его в SVG-формат;
2. После генерации темплейта - нам нужно трансформировать его в svg-формат. Это делается с помощью [satori](https://github.com/vercel/satori);
3. Как только мы получили svg-формат нашего темплейта - мы можем конвертировать его в png/jpg. Это делается с помощью
   [resvg-js](https://github.com/yisibl/resvg-js?ysclid=lgakhbuhhk179171891) или [sharp](https://github.com/lovell/sharp);
4. Мы делаем API, который при обращении будет отдавать картинку. Все параметры должны быть переданы через GET Query;
5. Мы добавляем ссылку на данное API в мета-тег с `property="og:image"`, указывая внутри GET Query для получения правильной превью;
6. Внутри API мы берем GET-параметры и декомпозируем их. К примеру для данного блога нужны были параметры:
    ```yaml
    title: "Заголовок"
    subtitle: "Опциональный подзаголовок"
    description: "Описание"
    url: "Ссылка"
    gradient: "Цвет градиента"
    ```
7. Генерируем темплейт внутри API, конвертируем его, отдаем пользователю.


# Генерация VDOM-темплейта
Как мы уже говорили до этого - нам нужно сгенерировать темплейт с помощью satori-html. Сама генерация темплейта тоже делится на несколько частей:
1. Написать стилизацию;
2. Написать верстку;
3. Добавить данные, которые придут с API;
4. Сгенерировать темлейт.

Создадим файл `previewTemplate.ts`, в котором будем писать наш темплейт.

## Типизация
Сперва мы поговорим о типизации. В моем темплейте будет виден заголовок, подзаголовок, описание и url. Все это будет на фоне
градиента, основной цвет которого мы будем передавать внутри параметра `gradient`.

Также нам нужна схема для того чтобы проверять пришли ли нам все параметры в GET-запросе. Мы будем делать это с помощью
Zod.

::ContentBookmark{url="https://github.com/colinhacks/zod"}
::

```typescript[preview.types.ts]
import { z } from "zod";

export type PreviewGradientColor = "pink" |
  "red" |
  "green" |
  "blue" |
  "rainbow" |
  "yellow" |
  "orange" |
  "purple" |
  "black";

export interface PreviewTemplate {
  title: string;
  subtitle?: string;
  description: string;
  url: string;
  gradient?: PreviewGradientColor;
}

export const previewTemplateSchema = {
  title: z.string(),
  subtitle: z.optional(z.string()),
  description: z.string(),
  url: z.string(),
  gradient: z.optional(z.string()),
};
```

## Стили
Начнем со стилей. Первое что нужно знать (обо что лично я споткнулся) - satori поддерживает ограниченную коллекцию CSS-свойств.
[Они перечислены здесь](https://github.com/vercel/satori#css).

Внутри файла `previewTemplate.ts` создадим константный объект, который будет хранить в себе стили:

```typescript[previewTemplate.ts] Пишем стили
// Styles for the template
// Docs: https://github.com/vercel/satori#css
const STYLE = {
  main: `
    display: flex;
    font-family: Manrope, sans-serif;
    justify-content: space-between;
    padding: 120px;
    align-items: center;
    height: 100vh;
    gap: 320px;
  `,
  blockInfo: `
    display: flex;
    flex-direction: column;
    gap: 32px;
  `,
  title: `
    font-size: 72px;
    font-weight: 700;
    white-space: pre-wrap;
  `,
  subtitle: `
    font-size: 44px;
    font-weight: 600;
    white-space: pre-wrap;
    font-family: "JetBrainsMono";
    text-decoration: underline;
    text-decoration-style: dashed;
    padding-bottom: 8px;
  `,
  description: `
    font-size: 32px;
  `,
  url: `
    display: flex;
    font-size: 18px;
  `,
  logo: `
    text-align: left;
    font-family: 'JetBrainsMono', monospace;
    font-weight: 400;
  `
};
```

Также лично мне нужна функция, которая в зависимости от переданного параметра `gradient` - будет менять градиент (удивительно).

Данная функция будет выглядеть следующим образом:

```typescript[previewTemplate.ts]
/**
 * Utility for generation gradients
 * @param color Primary color of gradient
 */
const getGradientCss = (color: PreviewGradientColor) => {

  // Colors for fonts
  const BLACK_COLOR = "#222222";
  const WHITE_COLOR = "#f8f8f8";

  switch (color) {
    case "red":
      return `
        background-image: linear-gradient(90deg, rgb(242, 132, 105) 0%, rgb(255, 82, 131) 100%);
        color: ${WHITE_COLOR};
      `;
    case "pink":
      return `
        background-image: linear-gradient(45deg, rgba(255,191,217,1) 0%, rgba(194,255,193,1) 100%);
        color: ${BLACK_COLOR};
      `;
    case "orange":
      return `
        background-image: linear-gradient(77deg, rgba(247,217,171,1) 0%, rgba(221,111,128,1) 100%);
        color: ${WHITE_COLOR};
      `;
    case "black":
      return `
        background-image: linear-gradient(162deg, rgba(0,0,0,1) 0%, rgba(83,83,83,1) 100%);
        color: ${WHITE_COLOR};
      `;
    case "purple":
      return `
        background-image: linear-gradient(90deg, #efd5ff 0%, #515ada 100%);
        color: ${BLACK_COLOR};
      `;
    case "yellow":
      return `
        background-image: linear-gradient(143deg, rgba(255,239,145,1) 0%, rgba(181,255,143,1) 100%);
        color: ${BLACK_COLOR};
      `;
    case "green":
      return `
         background-image: linear-gradient(45deg, rgba(145,173,255,1) 0%, rgba(145,255,143,1) 100%);
         color: ${BLACK_COLOR};
      `;
    case "rainbow":
      return `
        background-image:
          linear-gradient(
            108.4deg,
            rgba(250,236,190,1) 4.2%,
            rgba(247,202,205,1) 30.7%,
            rgba(255,186,233,1) 53.9%,
            rgba(214,176,214,1) 73.9%,
            rgba(148,195,231,1) 90.4%
          );
        color: ${BLACK_COLOR};
      `;
    default: // Blue
      return `
        background-image: linear-gradient(to right, #a8c0ff, #3f2b96);
        color: ${WHITE_COLOR};
      `;
  }
};
```

## Темплейт
Теперь нам нужно сгенерировать сам темплейт. Мы будем делать это с помощью satori-html, который позволяет передать HTML-строку,
на выходе мы получим VDOM, который совместим с satori.

Сам темплейт мы будем генерировать с помощью метода `generatePreviewTemplate`, который выглядит следующим образом:

```tsx[previewTemplate.ts]
const generatePreviewTemplate = ({ title, subtitle, description, url, gradient = "red" }: PreviewTemplate) => {
  const template = `
  <div
    style="${STYLE.main} ${getGradientCss(gradient)};"
  >
    <div style="${STYLE.blockInfo}">
      <div style="${STYLE.title}">${title}</div>
      ${subtitle && `<div style="${STYLE.subtitle}">${subtitle}</div>`}
      <div style="${STYLE.description}">${description}</div>
      <pre style="${STYLE.logo}">${FULL_LOGO_PREVIEW}</pre>
      <div style="${STYLE.url}">${url}</div>
    </div>
  </div>
  `;

  return html(template);
};
```

# API
Теперь нам нужно создать эндпоинт, который внутри будет генерировать темплейт, конвертировать его в svg, а затем и в png.

Для того чтобы создать API в Nuxt нам потребуется создать директорию `server/api` и добавить туда файл, имя которого и будет
являть эндпоинтом, в моем случае это `og.get.ts`, который будет доступен по ссылке `/api/og`.

Далее приведен листинг с полным содержанием `og.get.ts`, не пугайтесь большого количества непонятного кода, ниже мы рассмотрим
все поэтапно:

```typescript[og.get.ts]
import satori, { FontWeight } from "satori";
import generatePreviewTemplate from "@d/previewTemplate";
import { getFontUrl } from "~/utils/fontPath";
import { OPEN_GRAPH_PREVIEW_SIZE } from "@/constants/openGraph";
import type { Fonts } from "@/types/fonts.types";
import { PreviewGradientColor, previewTemplateSchema } from "@/types/preview.types";
import { useSafeValidatedQuery } from "h3-zod";
import { Resvg } from "@resvg/resvg-js";

interface Font {
  name: Capitalize<Fonts>,
  weight: FontWeight,
  style: "normal" | "italic",
  data: ArrayBuffer
}

export default defineEventHandler(async (event) => {

  // Fonts
  const manropeNormalFont: Font = {
    name: "Manrope",
    data: await fetch(getFontUrl("manrope", "400"))
      .then(response => response.arrayBuffer()),
    weight: 400,
    style: "normal"
  };
  const manropeBoldFont: Font = {
    name: "Manrope",
    data: await fetch(getFontUrl("manrope", "700"))
      .then(response => response.arrayBuffer()),
    weight: 700,
    style: "normal"
  };
  const jetbrainsMonoRegular: Font = {
    name: "JetbrainsMono",
    data: await fetch(getFontUrl("jetbrainsMono", "400"))
      .then(response => response.arrayBuffer()),
    weight: 400,
    style: "normal"
  };
  const jetbrainsMonoSemi: Font = {
    name: "JetbrainsMono",
    data: await fetch(getFontUrl("jetbrainsMono", "600"))
      .then(response => response.arrayBuffer()),
    weight: 600,
    style: "normal"
  };


  // Validation of GET query
  const query = await useSafeValidatedQuery(event, previewTemplateSchema);

  if (!query.success) {
    return "400! Bad Request :(";
  }

  const template = generatePreviewTemplate({
    title: decodeURIComponent(query.data.title),
    subtitle: decodeURIComponent(query.data.subtitle ?? ""),
    description: decodeURIComponent(query.data.description),
    url: decodeURIComponent(query.data.url).replaceAll(/[\\{2}"]/g, ""),
    gradient: query.data.gradient as PreviewGradientColor ??
      "red"
  });

  const svg = await satori(template, {
    ...OPEN_GRAPH_PREVIEW_SIZE,
    fonts: [
      manropeNormalFont,
      manropeBoldFont,
      jetbrainsMonoRegular,
      jetbrainsMonoSemi,
    ]
  });

  const resvg = new Resvg(Buffer.from(svg));
  const pngBuffer = resvg.render().asPng();
  return send(event, pngBuffer, "image/png");
});
```

## Импорты
Для начала разберемся с импортами:

```typescript
import satori, { FontWeight } from "satori";
import generatePreviewTemplate from "@d/previewTemplate";
import { getFontUrl } from "~/utils/fontPath";
import { OPEN_GRAPH_PREVIEW_SIZE } from "@/constants/openGraph";
import type { Fonts } from "@/types/fonts.types";
import { PreviewGradientColor, previewTemplateSchema } from "@/types/preview.types";
import { useSafeValidatedQuery } from "h3-zod";
import { Resvg } from "@resvg/resvg-js";
```

1. Импортируется `satori` и `FontWeight`. Первый нужен для того чтобы сгенерировать svg, второй для того чтобы указать
  жирность шрифта. Satori нужен хотя бы один шрифт для того чтобы зарендерить темплейт в svg;
2. `generatePreviewTemplate` нужен для того чтобы сгенерировать VDOM-дерево (темплейт), который будет рендерить Satori;
3. `getFontUrl` нужен для того чтобы достать полный путь к шрифту;
4. `OPEN_GRAPH_PREVIEW_SIZE` - константа с размером для картинки превью. Золотой стандарт - 1200px x 630px;
5. `Fonts` - типизация для шрифтов. Ее можно посмотреть
  [вот тут](https://github.com/tokiory/station/blob/master/types/fonts.types.ts);
6. `PreviewGradientColor` и `previewTemplateSchema` нужны для того чтобы типизировать наши параметры у GET-запроса;
7. `useSafeValidatedQuery` используется для того чтобы проверить пришли ли все параметры в GET-запросе, исходя из zod-схемы;
8. `Resvg` - библиотека для конвертации из svg в png.

## Интерфейс для шрифтов
Мы также создаем свой интерфейс для шрифтов, для того чтобы их было удобнее писать, типизируя новый объект:

```typescript
interface Font {
  name: Capitalize<Fonts>,
  weight: FontWeight,
  style: "normal" | "italic",
  data: ArrayBuffer
}
```

## Шрифты
Далее мы достаем нужные нам шрифты. Они все будут использоваться при генерации svg с помощью Satori.

> **Важно**. Нужно достать абсолютный путь для шрифтов:
> - `dev`: `http://localhost:3000/fonts/manrope/Manrope-Regular.ttf`,
> - `prod`: `https://tokiory.vercel.app/fonts/manrope/Manrope-Regular.ttf`.

Все шрифты как можно увидеть мы специально оборачиваем в `arrayBuffer` после получения. Это нужно чтобы передать их Satori.

```typescript
// Fonts
const manropeNormalFont: Font = {
  name: "Manrope",
  data: await fetch(getFontUrl("manrope", "400"))
    .then(response => response.arrayBuffer()),
  weight: 400,
  style: "normal"
};
const manropeBoldFont: Font = {
  name: "Manrope",
  data: await fetch(getFontUrl("manrope", "700"))
    .then(response => response.arrayBuffer()),
  weight: 700,
  style: "normal"
};
const jetbrainsMonoRegular: Font = {
  name: "JetbrainsMono",
  data: await fetch(getFontUrl("jetbrainsMono", "400"))
    .then(response => response.arrayBuffer()),
  weight: 400,
  style: "normal"
};
const jetbrainsMonoSemi: Font = {
  name: "JetbrainsMono",
  data: await fetch(getFontUrl("jetbrainsMono", "600"))
    .then(response => response.arrayBuffer()),
  weight: 600,
  style: "normal"
};
```

## Валидация GET-параметров
Далее мы обрабатываем наш GET-запрос и выцепляем параметры. Если некоторые обязательные
параметры отсутствуют - то `useSafeValidatedQuery` вернет `{success: false, error: Error}`.

```typescript
// Validation of GET query
const query = await useSafeValidatedQuery(event, previewTemplateSchema);
if (!query.success) {
  return "400! Bad Request :(";
}
```

## Генерация темплейта
Теперь нам нужно сгенерировать темплейт, мы делаем это исходя из наших GET-параметров:

```typescript
const template = generatePreviewTemplate({
  title: decodeURIComponent(query.data.title),
  subtitle: decodeURIComponent(query.data.subtitle ?? ""),
  description: decodeURIComponent(query.data.description),
  url: decodeURIComponent(query.data.url).replaceAll(/[\\{2}"]/g, ""),
  gradient: query.data.gradient as PreviewGradientColor ??
    "red"
});
```

Можно заметить тут функции `decodeURIComponent` - они используются для того чтобы декодировать данные из GET-параметров.
Чуть дальше (когда будем писать composable) мы увидим почему их приходится декодировать.

## Генерация svg и png
Теперь дело за малым - сгенерировать svg, конвертировать в png и отдать пользователю:

```typescript
const svg = await satori(template, {
  ...OPEN_GRAPH_PREVIEW_SIZE,
  fonts: [
    manropeNormalFont,
    manropeBoldFont,
    jetbrainsMonoRegular,
    jetbrainsMonoSemi,
  ]
});
const resvg = new Resvg(Buffer.from(svg));
const pngBuffer = resvg.render().asPng();
return send(event, pngBuffer, "image/png");
```

Вот и все, теперь мы можем обратиться к API по урлу, где с помощью GET-параметров укажем все данные и API отдаст нам картинку.

[Вот пример такой ссылки](https://tokiory.vercel.app/api/og?title=%255Bstation%255D%2520kioto&description=%25D0%259C%25D0%25B5%25D1%2581%25D1%2582%25D0%25BE%2520%25D0%25B3%25D0%25B4%25D0%25B5%2520%25D0%25BC%25D0%25BE%25D0%25B6%25D0%25BD%25D0%25BE%2520%25D1%2581%25D0%25BF%25D0%25BE%25D0%25BA%25D0%25BE%25D0%25B9%25D0%25BD%25D0%25BE%2520%25D1%2581%25D0%25B5%25D1%2581%25D1%2582%25D1%258C%2520%25D0%25B8%2520%25D0%25BF%25D0%25BE%25D1%2587%25D0%25B8%25D1%2582%25D0%25B0%25D1%2582%25D1%258C%2520%25D0%25BE%2520%25D1%2580%25D0%25B0%25D0%25B7%25D1%2580%25D0%25B0%25D0%25B1%25D0%25BE%25D1%2582%25D0%25BA%25D0%25B5.&url=%2522http%253A%252F%252Flocalhost%253A3000%252F%2522&gradient=green)

# Composable
Теперь нужно сделать так, чтобы страницы в Nuxt динамически встраивали в себя Open Graph мета-теги, которые мы укажем.
Мы будем делать это с помощью composable.

::ContentBookmark{url="https://nuxt.com/docs/guide/directory-structure/composables"}
::

Внизу предоставлен полный листинг нашего composable:

```typescript[useOpenGraph.ts]
import type { PreviewTemplate } from "@/types/preview.types";
import { OPEN_GRAPH_PREVIEW_SIZE } from "~/constants/openGraph";

/**
 * Utility for generation OG Preview URL
 * @param rootUrl URL of the site
 * @param params Preview parameters
 * @returns URL
 */
const generatePreviewURL = (rootUrl: string, params: PreviewTemplate): string => {
  const title = encodeURIComponent(params.title);
  const description = encodeURIComponent(params.description);
  const url = encodeURIComponent(params.url);
  const queryParams = new URLSearchParams({
    title,
    description,
    url,
  });


  if (params.subtitle) {
    queryParams.append(
      "subtitle",
      encodeURIComponent(params.subtitle)
    );
  }

  if (params.gradient) {
    queryParams.append("gradient", params.gradient);
  }

  return `${rootUrl}/api/og?${queryParams.toString()}`;
};

/**
 * Include Open Graph meta tags (and twitter too🐦) into page head tag
 * @param title Title of the page
 * @param subtitle Subtitle of the page
 * @param description Description of the page
 * @param gradient Gradient to use
 */
export const useOpenGraph = async ({ description, gradient, title, subtitle }: Omit<PreviewTemplate, "url">) => {
  const route = useRoute();
  const config = useRuntimeConfig();
  const url = `"${config.public.URL}${route.path}"`;

  debugDo(() => {
    console.groupCollapsed("useOpenGraph.ts: Preview of generated API URL");
    console.log("URL", generatePreviewURL(config.public.URL, { description, url, title, gradient, subtitle }));
    console.groupEnd();
  });

  const previewSizeMeta = Object.keys(OPEN_GRAPH_PREVIEW_SIZE).map(key => {
    return {
      property: `og:image:${key}`,
      content: OPEN_GRAPH_PREVIEW_SIZE[
        key as keyof typeof OPEN_GRAPH_PREVIEW_SIZE
        ].toString()
    };
  });

  const previewURL = generatePreviewURL(config.public.URL, { description, gradient, title, subtitle, url });

  useHead({
    meta: [
      // Twitter OG
      {
        property: "twitter:card",
        content: "summary_large_image",
      },
      {
        property: "twitter:image",
        content: previewURL
      },

      // Basic OG
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:image",
        content: previewURL
      },
      ...previewSizeMeta,
    ]
  });
};
```

## Генерирование URL'а для Open Graph Image

Нам нужно сгенерировать ссылку, которая будет вести на эндпоинт нашего API, причем нужно сделать это так, чтобы
в URL'е были все необходимые GET-параметры. Этим занимается функция `generatePreviewURL`:

```typescript
/**
 * Utility for generation OG Preview URL
 * @param rootUrl URL of the site
 * @param params Preview parameters
 * @returns URL
 */
const generatePreviewURL = (rootUrl: string, params: PreviewTemplate): string => {
  const title = encodeURIComponent(params.title);
  const description = encodeURIComponent(params.description);
  const url = encodeURIComponent(params.url);
  const queryParams = new URLSearchParams({
    title,
    description,
    url,
  });


  if (params.subtitle) {
    queryParams.append(
      "subtitle",
      encodeURIComponent(params.subtitle)
    );
  }

  if (params.gradient) {
    queryParams.append("gradient", params.gradient);
  }

  return `${rootUrl}/api/og?${queryParams.toString()}`;
};
```

> Мы можем увидеть что тут мы используем функцию `encodeURIComponent`, которая инкапсулирует все пробелы и спец. символы
> которые не могут находиться в URL'е. Именно поэтому
> [мы декодировали](http://localhost:3000/article/satori-og#генерация-темплейта) все параметры которые нам пришли.

## Проверка ссылки
В самом начале нашего composable мы проводим проверку корректно ли сгенерировался URL. `debugDo` - утилита, которая вызывает
переданный коллбэк в случае, если `process.dev === true`:

```typescript
/**
 * Include Open Graph meta tags (and twitter too🐦) into page head tag
 * @param title Title of the page
 * @param subtitle Subtitle of the page
 * @param description Description of the page
 * @param gradient Gradient to use
 */
export const useOpenGraph = async ({ description, gradient, title, subtitle }: Omit<PreviewTemplate, "url">) => {
  const route = useRoute();
  const config = useRuntimeConfig();
  const url = `"${config.public.URL}${route.path}"`;

  debugDo(() => {
    console.groupCollapsed("useOpenGraph.ts: Preview of generated API URL");
    console.log("URL", generatePreviewURL(config.public.URL, {description, url, title, gradient, subtitle}));
    console.groupEnd();
  });
  // ...
}
```

## Генерация тегов для размерности картинки
В Open Graph существует два специальных мета-тега для указания картинки для превью, у этих тегов следующие `property`:
- `og:image:width`;
- `og:image:height`.

В данном листинге мы с помощью функционального выражения генерируем данные мета-теги:

```typescript
// OPEN_GRAPH_PREVIEW_SIZE был импортирован и имеет следующие поля:
// export const OPEN_GRAPH_PREVIEW_SIZE = {
//   width: 1200,
//   height: 630
// };

const previewSizeMeta = Object.keys(OPEN_GRAPH_PREVIEW_SIZE).map(key => {
  return {
    property: `og:image:${key}`,
    content: OPEN_GRAPH_PREVIEW_SIZE[
      key as keyof typeof OPEN_GRAPH_PREVIEW_SIZE
      ].toString()
  };
});
```

## Использование мета-тегов
Теперь нам осталось просто использовать другой composable - `useHead`, который вставляет перечисленные теги в `<head>`.

> Стоит упомянуть, что `useHead` доступен только в Nuxt, но в других SSR-фреймворках есть его аналоги.

```typescript
const previewURL = generatePreviewURL(config.public.URL, { description, gradient, title, subtitle, url });

useHead({
  meta: [
    // Twitter OG
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:image",
      content: previewURL
    },

    // Basic OG
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:image",
      content: previewURL
    },
    ...previewSizeMeta,
  ]
});
```

Кроме Open Graph превью мы также сгенерировали превью для твиттера, так как некоторые сайты используют его.

# Использование того что мы написали
Теперь для того чтобы динамически сгенерировать превью для страницы достаточно просто использовать composable `useOpenGraph`
внутри любой страницы:

```vue
<script lang="ts" setup>
useOpenGraph({
  title: "Заголовок страницы",
  subtitle: "Подзаголовок страницы",
  description: "Описание страницы",
  gradient: "red",
});
</script>
```
