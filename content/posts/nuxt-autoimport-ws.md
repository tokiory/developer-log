---
title: Чиним глобальные импорты в Webstorm
tags:
  - webstorm
  - nuxt
  - typescript
  - note
date: 2023-09-14
---

При разработке блога я столкнулся с проблемой, когда автоимпорты в Nuxt работали не совсем
так как планировалось. Если кратко, то весь редактор был в ошибках 🫡

Внизу будет объяснение как я устранил данную проблему.

# Использование typescript из проекта

Первое что я сделал - настроил Webstorm, чтобы он использовал Typescript который
находится в проекте, а не тот что поставляется вместе с WebStorm:

![](/posts/nuxt-autoimport-ws/ws.png)

# Отключение no-undef в ESLint

Подсвечивал все ошибки не WebStorm, а ESLint. Именно поэтому я сразу же загуглил есть ли проблемы
у ESLint в связке с Nuxt 3. Вот что я нашел:

::ContentBookmark{url="https://stackoverflow.com/questions/67437478/why-eslint-dont-see-global-typescript-types-in-vue-files-no-undef"}
::

Если говорить кратко, то в документации typescript-eslint говорится о том, что ESLint может не подхватить глобальные типы и подсвечивать
все переменные и функции, которые не были объявлены в текущем файле. Фиксится это простым отключением файла:

```js [.eslintrc.cjs]
module.exports = {
  // ... the rest of your config ...
  overrides: [
    {
      files: ['*.ts', '*.mts', '*.cts', '*.tsx', '*.vue'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
```

# Дополнительно: jsconfig.json

Хоть `jsconfig.json` и не является обязательным условием для фикса вышеупомянутой ошибки, я все же добавил
его для того чтобы в других редакторах также не было проблем:

```json [jsconfig.json]
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
    }
  },
  "exclude": [
    "node_modules",
    ".output",
    ".nuxt",
    "dist"
  ]
}
```
