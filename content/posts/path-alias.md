---
title: Сокращение путей с помощью алиасов
tags:
  - typescript
  - web
  - note
description: В данной статье рассмотрим как с помощью алиасов сократить пути для импортов.
date: 2023-04-01
origin:
  type: vc
  url: https://vc.ru/dev/661503-sokrashchenie-putey-s-pomoshchyu-aliasov
---

# Предистория
Когда для создания блога я использовал Nuxt я увидел там крутую фичу: для указания корневого каталога использовался
алиас `@` или `~~`.

```typescript
// Вместо того чтобы писать
import Data from '../../../data/someData';

// В Nuxt можно было писать следующим образом:
import Data from '@d/someData';
```

Сегодня мы реализуем такую же возможность при помощи изменения конфигурации для
[Typescript](https://www.typescriptlang.org/) и [Vite](https://vitejs.dev/).

# Typescript
Для того чтобы Typescript понимал алиасы - нам достаточно добавить следующие поля в `tsconfig.json`:

**tsconfig.json**:
```json
{
  // Добавляем директорию откуда будут строиться пути
  "baseUrl": ".",

  // Добавляем алиасы для путей
  "paths": {
    "@/*": ["src*"],
    "@data/*": ["src/data/*"]
  }
}
```

# Vite
Если мы используем Vite без Typescript, то нам нужно указать алиасы в конфигурации Vite:

**vite.config.ts**:
```typescript
import {fileURLToPath} from "url";
import {defineConfig} from 'vite';

export default defineConfig({
  // ...
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@data', replacement: fileURLToPath(new URL('./src/data', import.meta.url)) },
    ],
  },
  // ...
})
```

# Webpack

Если же мы <del>являемся мамонтом</del> собираем продукт на Webpack, то нам нужно написать следующее в конфигурации
Webpack:

**webpack.config.js**:
```js
const path = require('path');

module.exports = {
  //...
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src/'),
      "@data": path.resolve(__dirname, 'src/data/'),
    },
  },
  // ...
};
```

# Rollup

Для того чтобы использовать алиасы в Rollup нам нужен плагин. Плагин можно установить следующей командой:

```bash
npm i -D @rollup/plugin-alias
```

Далее пишем следующий код в конфигурации:

**rollup.config.js**:
```js
import alias from '@rollup/plugin-alias';

module.exports = {
  // ...
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: 'src/' },
        { find: '@data', replacement: 'src/data/' }
      ]
    })
  ]
  // ...
};
```

# ESBuild

Для того чтобы добавить алиасы к ESBuild нужно установить плагин:

```bash
npm i -D esbuild-plugin-alias
```

Затем нужно добавить следующее в конфигурацию:

```js
const esbuild = require('esbuild');
const alias = require('esbuild-plugin-alias');

esbuild.build({
  // ...
  plugins: [
    alias({
      '@': path.resolve(__dirname, `./src/*`),
      '@data': path.resolve(__dirname, `./src/data/*`),
    }),
  ],
  // ...
});
```
