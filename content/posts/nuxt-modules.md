---
title: "Пишем свой модуль в Nuxt"
tags:
  - guide
  - typescript
  - web
  - nuxt
date: 2023-09-12
references:
  - name: "Nuxt Docs: Module Author Guide"
    url: https://nuxt.com/docs/guide/going-further/modules
---

Сегодня поговорим о модулях в Nuxt, разберемся из чего они состоят, зачем они нужны и разберемся с самым
главным вопросом "Как написать свой модуль?".

# Начинаем работу с модулями

Для того чтобы инициализировать новый модуль в Nuxt достаточно просто ввести следуюущую команду:

```bash
npx nuxi init -t module nuxt-module-guideline
```

Данная команда создаст директорию с именем "nuxt-module-guideline", перейдем в нее и увидим следующее:

```markdown
.
├── package.json
├── playground
│  ├── app.vue
│  ├── nuxt.config.ts
│  ├── package.json
│  ├── server
│  │  └── tsconfig.json
│  └── tsconfig.json
├── pnpm-lock.yaml
├── README.md
├── src
│  ├── module.ts
│  └── runtime
│     └── plugin.ts
├── test
│  ├── basic.test.ts
│  └── fixtures
│     └── basic
│        ├── app.vue
│        ├── nuxt.config.ts
│        └── package.json
└── tsconfig.json
```

Нас мало интересуют директории `playground` и `test`, ибо у них предназначение тестировать
наш модуль, а не разрабатывать его. Самое интересное, естественно, находится в директории `src`.

## Рассматриваем то, что создано темплейтом

Внутри директории `src` есть первый файл который нам нужно рассмотреть - `module.ts`:

```typescript [module.ts]
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Опции плагина
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({

  // Мета-информация модуля
  meta: {
    name: 'my-module',    // Название модуля
    configKey: 'myModule' // Название поля для конфигурации модуля в nuxt.config.ts
  },

  // Значения конфигурации модуля по умолчанию
  defaults: {},

  // Функция, которая будет выполняться при подключении модуля
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Добавляем плагин
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
});
```

Как мы можем увидеть функция `setup` определяет что будет подключено к нашему модулю, она может добавлять:
- Компоненты;
- Плагины;
- Автоимпорты (services, composables и многое другое);
- Цепляться к хукам в Nuxt;

У функции `setup` также есть два параметра:

- `options` - Конфигурация модуля, которая была задана в `nuxt.config.ts`;
- `nuxtApp` - Контекст приложения Nuxt, в котором данный модуль будет использоваться;

Сама функция `defineNuxtModule` имеет дженерик, который принимает интерфейс. Данный интерфейс будет описывать
конфигурацию модуля, которую мы можем задать в `nuxt.config.ts`.

```typescript [module.ts]
// ...

// Опции плагина
export interface ModuleOptions {
  foo: string;
}

export default defineNuxtModule<ModuleOptions>({

  // Мета-информация модуля
  meta: {
    name: 'foo-module',    // Название модуля
    configKey: 'fooModule' // Название поля для конфигурации модуля в nuxt.config.ts
  },
// ...
});
```

```typescript [nuxt.config.ts]
export default defineNuxtConfig({
  // ...
  fooModule: {
    foo: '123',
  },
  // ...
})
```

# Расширяем наш модуль
В данном разделе мы будем расширять наш модуль посредством добавления в него разных сущностей.
Начнем с самого простого, и зачастую самого нужного: composable.

## Добавление composables в модуль
Тут все достаточно тривиально, для начала нам нужно написать сам composable:

```typescript [src/composables/hello.ts]
export default function () {
  console.log('Hello, world!');
}
```

Данный композабл будет просто выводить "Hello, World!" в консоль. Для того чтобы мы могли подключить его
к модулю достаточно произвести следующие действия в функции `setup` внутри `src/module.ts`:

```typescript [src/module.ts]
import { defineNuxtModule, addImports, createResolver } from '@nuxt/kit'

export default defineNuxtModule({

  // ...

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addImports({
      name: 'useHello', // Имя composable
      as: 'useHello',   // Имя, которое composable будет иметь после импорта модуля
      from: resolver.resolve('./composables/hello.ts')
    })
  }
})
```

`resolver` - это обычный объект, который содержит функцию `resolve`.
При передаче в вышеупомянутую функцию относительного пути (напр. `./composable/hello.ts`) - она
отдаст абсолютный путь относительно модуля Nuxt.

`addImports` в свою очередь служит для того чтобы добавить автоимпорт для всего, чего нам только захочется.

Если нам нужно добаить целую директорию - это тоже не составит труда:

```typescript [src/module.ts]
import { defineNuxtModule, addImportsDir, createResolver } from '@nuxt/kit'

export default defineNuxtModule({

  // ...

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    addImportsDir(resolver.resolve('./composables'))
  }
})
```

## Добавление components в модуль
Мы также можем добавить компонент к нашему модулю:

```vue [components/hello-world.vue]
<template>
  <div class="hello">Hello, world!</div>
</template>
```

После того как мы написали наш компонент мы можем добавить его в модуль:

```typescript [src/module.ts]
import { defineNuxtModule, addComponent, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  // ...
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    addComponent(resolver.resolve('./components/hello-world.vue'))
  }
})
```

Мы также можем добавить целую директорию с компонентами:

```typescript [src/module.ts]
import { defineNuxtModule, addComponentsDir, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  // ...
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    addComponentsDir(resolver.resolve('./components'))
  }
})
```

## Добавление plugins в модуль
Добавление плагина осуществляется ровно тем же способом, что и добавление других сущностей:

```typescript [src/module.ts]
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    addPlugin(resolve('./plugins/plugin'))
  }
})
```

Помимо того, что мы можем добавить плагины для Nuxt, мы также можем добавить плагины
для Vite и Webpack:
```typescript [src/module.ts]
import { defineNuxtModule, addVitePlugin, addWebpackPlugin, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Добавляем плагин для Vite
    addVitePlugin(resolve('./vite/plugin'));

    // Добавляем плагин для Webpack
    addWebpackPlugin(resolve('./webpack/plugin'));
  }
})
```

## Добавление api в модуль

Мы также можем добавить серверную часть в наш модуль:

```typescript [src/module.ts]
import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addServerHandler({
      route: '/api/hello',
      handler: resolver.resolve('./server/api/hello.get.ts')
    })
  }
})
```

## Добавление types в модуль

Добавление типизации также не составит никакого труда:

```typescript [src/module.ts]
import { defineNuxtModule, createResolver, addTypeTemplate } from '@nuxt/kit';

export default defineNuxtModule({
  // ...
  setup (moduleOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    addTypeTemplate({
      filename: 'types/module.d.ts',
      src: resolve('./types/types.ts')
    });
  }
});
```

## Добавление других файлов в модуль
Как уже было сказано ранее, мы можем запихнуть все, что только захотим в наш модуль.
Если у вас есть файл, который должен быть доступен для импорта, то мы можем использовать `addTemplate`:

```typescript [src/module.ts]
import { defineNuxtModule, createResolver, addTemplate } from '@nuxt/kit';

export default defineNuxtModule({
  // ...
  setup (moduleOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    addTemplate({
      filename: 'types/module.d.ts',
      src: resolve('./otherFile.mjs')
    });
  }
});
```
