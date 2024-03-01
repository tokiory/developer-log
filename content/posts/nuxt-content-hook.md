---
title: Генерация кастомного TOC в Nuxt Content
tags:
  - nuxt
  - note
  - under-the-hood
date: 2023-10-16
references:
  - url: https://content.nuxt.com/recipes/hooks
    name: "Nuxt content: Hooks"
---





В блоге на странице статей есть навигация по заголовкам, которая показывает где пользователь находится в текущий момент.
Пришлось генерировать кастомный TOC из-за того что [нативный TOC](https://content.nuxt.com/get-started/configuration#markdown)
отдавал только заголовки второго уровня. На момент использования
версии Nuxt Content 2.7.2, я не нашел способа корректно настроить встроенный TOC,
попытки настроить TOC с помощью конфигурации не увенчались успехом.

# Первая итерация
Самое первое решение заключалось в том, чтобы генерировать TOC как только пользователь перейдет на страницу статьи.
Я понимал что это было не самой лучшей идеей в моей жизни, но тем не менее это было единственным решением, которое я мог применить
на момент разработки страницы поста на тот момент:

```typescript
// Navigation section
const navigation = computed<PostNavigationItem[]>(() => {
  if (!data.value) {
    return [];
  }

  return data.value.body.children
    // Фильтруем только те ноды, которые являются заголовками
    .filter(node => {
      const headerRegex = /^h\d$/g;
      const text = node.children?.at(0)?.type === "text" ? node.children?.at(0)?.value : "";
      return node.tag && headerRegex.test(node.tag) && text;
    })
    // Трансформируем их в нормальный вид, который нужен для того чтобы отобразить заголовки в навигации
    .map((node, id) => {
      const title = node.children?.at(0)?.value ?? "";
      const level = Number.parseInt(node.tag?.replaceAll(/\D/g, "") ?? "");
      return {
        title,
        level: Number.isNaN(level) ? 0 : level - 1,
        anchor: node.props?.id,
        id
      };
    });
});
```

У такого решения были как свои плюсы, так и свои минусы.

**Плюсы**:
- Возможность парсить TOC только для того контента, который нам нужен;
- Генерация TOC лежит в файле для страницы поста;

**Минусы**:
- Генерация TOC занимает время при SSR;
- При повторном запросе страницы TOC будет заново генерироваться;
- Парсинг не оптимизирован, нам приходится работать с уже готовой структурой;

# Вторая итерация
После того как на блоге начались проблемы с TTFB я сразу понял, что проблема в долгом рендеринге на SSR.
Помимо того, что у нас по итогу приходит огромный HTML, из-за больших статей, мы также пробегаемся по *абсолютно всем элементам*
в отрендеренном DOM-дереве и ищем заголовки.

Тогда я подумал: "Можно ли заранее сгенерировать навигацию для каждого Markdown-файла?"

Оказалось, это решение является жизнеспособным благодаря хуку `content:file:afterParse`. Суть решения состоит в том, чтобы
пройтись по каждому файлу с расширением `.md` и спарсить все заголовки, которые находятся внутри обрабатываемого файла.

По сути мы будем делать все то же, что делали и в первой итерации, однако теперь это будет происходить **один раз при старте сервера**:

```typescript [server/plugins/markdown-toc.ts]
import { MarkdownNode } from "@nuxt/content/dist/runtime/types";
import { HookKeys } from "hookable";
import { NitroRuntimeHooks } from "nitropack";
import { visit } from "unist-util-visit";

const headingRegex = new RegExp("^h\\d$");

/**
 * Get toc item from markdown node
 * @param element
 * @param id
 */
const getTableOfContentItem = (element: MarkdownNode, id?: number) => {
  const text = element.children?.at(0)?.type === "text" ? element.children?.at(0)?.value : "";

  if (!text) {
    return;
  }

  if (!id) {
    id = Date.now();
  }

  const title = element.children?.at(0)?.value ?? "";
  const level = Number.parseInt(element.tag?.replaceAll(/\D/g, "") ?? "");

  return {
    title,
    level: Number.isNaN(level) ? 0 : level - 1,
    anchor: element.props?.id,
    id
  };
};

export default defineNitroPlugin((nitroApp) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  nitroApp.hooks.hook("content:file:afterParse" as HookKeys<NitroRuntimeHooks>, (file) => {
    if (file._id.endsWith(".md")) {
      file.toc = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      visit(file.body, (element: any) => headingRegex.test(element.tag), (node, id) => {
        file.toc.push(getTableOfContentItem(node, id));
      });
    }
  });
});
```
