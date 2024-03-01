---
title: Модули в Javascript
tags:
  - javascript
  - web
  - under-the-hood
date: 2023-09-06
exclusive: true
keywords:
  - commonjs
  - esm
  - module
  - requirejs
  - amd
  - umd
  - systemjs
references:
  - name: "Dev.to: An Overview of Javascript Module Types"
    url: https://dev.to/ndesmic/an-overview-of-javascript-modules-dfg
  - name: "Habr: Понимание (всех) «модульных» форматов и инструментов JavaScript"
    url: https://habr.com/ru/articles/501198/
  - name: "Wikipedia: CommonJS"
    url: https://en.wikipedia.org/wiki/CommonJS
  - name: ""
    url: https://objectpartners.com/2019/05/24/javascript-modules-a-brief-history/
  - name: ""
    url: http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
---

Модули в Javascript - интересная тема, которую к сожалению не все хорошо понимают.
Сам же я на нее наткнулся при настройке `tsconfig.json`, ~~а затем еще и на собеседовании~~.

В данной статье мы рассмотрим все виды модулей, посмотрим на их плюсы и минусы, а также разберем как бандлеры разгребали
бесконечное число импортов и экспортов модулей. Вперед под кат, разберемся с модулями 👊

```json5 [tsconfig.json]
{
  "compilerOptions": {
    "module": "ESNext" // Пример использования модулей ESNext
  }
}
```

# С чего все начиналось?
Вы наверняка пользовались ключевыми словами `import` и `export`, ну или же `require` и конструкцией `module.exports = {}`.

Дайте вернемся назад в прошлое и подумаем что люди делали без данных ключевых слов
и конструкций? Самое первое *подобие* на модули, которые мы используем сейчас появилось в 2011 году, это была библиотека Require.js,
именно она реализовывала простейшее асинхронное подтягивание скриптов, однако до этого еще нужно дойти.

::ContentBookmark{:url="https://www.npmjs.com/package/requirejs?activeTab=versions"}
::

До данной библиотеки разработчикам тоже как-то надо было работать с модулями, до изобретения Require.js (до которого мы еще дойдем) мы использовали IIFE.

## IIFE (Immediately-Invoked Function Expression)
На данном этапе важно объяснить в чем заключается преимущество модулей перед написанием огромного полотна кода в одном файле.
Если мы будем использовать полотно кода, то у нас будет очень много переменных, **глобальных переменных**. Мы можем запутаться какой функционал
отвечает за определенную логику, не говоря уже о том, что у нас буквально могут быть конфликты имен.

До стандарта ES6, который вышел в 2015 году
разработчики использовали `var`, у которого есть огромное количество недостатков перед `let` и `const`. Например, мы могли просто затереть уже существующую переменную,
а интерпретатор JS не сказал бы нам ни слова:

```js [var.js]
var a = 1;
console.log(a); // 1

var a = 2;
console.log(a); // 2
```

Внутри области видимости функции все становится немного легче, `var` не может выползти за область видимости:

```js [var-func.js]
function hello() {
  var hello = '1';
}

console.log(hello); // undefined
```

Если говорить просто о том что такое "Немедленно вызванное функциональное выражение", то это простое объявление анонимной функции
с последующим ей вызовом. Такая "немедленная" функция и стала в то время модулем. Разработчики использовали ее для того чтобы в JS
была хоть какая-то инкапсуляция логики.

```js [iife.js]
(function() {
  var hello = "Hello, world";
  console.log(hello);
})();
```

Вроде бы говорим про модули, но данный "модуль" не возвращает ничего.
Это легко исправить, ведь тут на замену `export` нам приходит `return`:

```js [iife-export.js]
const module = (function() {
  var hello = "Hello, world";
  console.log(hello);
  return {
    hello
  };
})();

console.log(module.hello); // "Hello, World"
```

Отлично, у нас есть модуль с экспортированием каких-либо данных, но что делать с импортами?
Нашему модулю для успешной жизнедеятельности могут быть нужны другие модули. На этом этапе к нам на помощь приходят
примеси. Идея состоит в том, что мы просто передадим другие модули от которых зависит наш модуль в виде аргументов:

```js [iife-import.js]
const hello = (function() {
  var hello = "Hello, world";
  return {
    hello
  };
})();

const logger = (function(helloModule) {
  console.log(helloModule.hello);
})(hello);
```

На таких ~~трех слонах и черепахе~~ анонимных функциях когда-то строили целые библиотеки, одной из них был JQuery в свои ранние годы.

## CommonJS
С выходом Node.js у разработчиков серверных-приложений появилась острая нужда
в быстром импортировании и экспортировании модулей. В 2009 году разработчик из Mozilla Firefox - Кевин Дангур
начал работу над системой модулей, которая изначально называлась ServerJS.

Сам Кевин описывал свою работу следующим образом:

::ContentQuote{:author="Кевин Дангур"}
То, что я здесь описываю, не является технической проблемой. Это вопрос того, как люди собираются вместе и принимают решение сделать шаг вперед и начать вместе создавать что-то большее и крутое.
::

Сам синтаксис CJS модулей выглядит следующим образом:

```js [hello.cjs]
const hello = "Hello, World";
exports.hello = hello; // Экспортируем переменную
```

```js [logger.cjs]
const helloModule = require('./hello')

const logHello = () => {
  console.log(helloModule.hello);
}

logHello();

// Мы также можем экспортировать нашу функцию с помощью module.exports:
module.exports = {
  logHello
}
```

Во время выполнения таких модулей Node.js обернет все наше барахло в следующие функции:

```js [node-runtime.js]
// hello.cjs
(function(exports, require, module, __filename, __dirname) {
  const hello = 'Hello, World!';
  module.exports = {
    hello,
  }
  return module.exports
}).call(thisValue, exports, require, module, filename, dirname)

// logger.cjs
(function(exports, require, module, __filename, __dirname) {
  const helloModule = require('./helloModule')
  const logHello = () => {
    console.log(helloModule.hello);
  }

  logHello();

  module.exports = {
    logHello,
  };

  return module.exports;
}).call(thisValue, exports, require, module, filename, dirname)
```

| Название                   | Описание                                                                                                                                                                                                       |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `exports`                  | алиас к `module.exports`                                                                                                                                                                                       |
| `require`                  | функция, которая: вычисляет путь к требуемоему модулю, оборачивает данный модуль в такую же функцию как мы видим вверху, выполняет данную функцию, возвращает данные из `module.exports` импортируемого модуля |
| `module`                   | это преинициализированный объект, который содержит данные о текущем модуле и пустое свойство `exports`                                                                                                         |
| `__filename` и `__dirname` | строки, которые содержат абсолютные пути к файлу модуля и директории модуля                                                                                                                                    |


Важно заметить, что каждое импортирование модуля выполняется синхронно, поэтому дерево зависимостей
перед выполнением определить нельзя.

Также стоит заметить что импорты модулей выполняются во время выполнения, поэтому могут быть какие-либо сайд-эффекты во время импортирования.

> Следует заметить, что такой формат модулей не поддерживается браузерами из коробки.

# Асинхронные импорты
Проблема синхронных импортов была в том, что браузеры должны были загрузить весь код, обработать его и только потом выполнять
фукционал модулей.

Кроме того, были огромные проблемы со сложностями отладки, синхронные модули сложно поддавались поиску багов и несли собой некий коллбэк-хелл.

Чтобы решить данную проблему были придуманы несколько технологий.

## AMD (Asynchronous Module Definition)

AMD это спецификация для реализации модулей, которой пользуется [Require.js](https://requirejs.org/docs).
Суть данной спецификации заключается в том, что модули будут загружаться асинхронно.
AMD был придуман как удобное импортозамещение CommonJS. Синтаксис у AMD-модулей очень схож с CJS:

```js [hello.js]
define('hello', [], function() {
  const hello = "Hello, World";
  return {hello}; // Экспортируем переменную
});
```

```js [logger.js]
define('logger', ["hello"], function(helloModule) {
  const logHello = function() {
    console.log(helloModule.hello);
  }

  logHello();

  return {logHello};
});
```

Функция `define` создает новый модуль, в саму функцию мы должны передать:
- Имя модуля
- Массив из имен зависимостей
- Функция с модулем (ее еще называют фабричной функцией)

### Динамический импорт
Мы можем опустить название модуля, а также список из зависимостей и передать в фабричную функцию другую функцию - `require`:

```js [logger.js]
define(function (require) {
  const helloModule = require('hello');

  const logHello = function() {
    console.log(helloModule.hello);
  }

  logHello();

  return {logHello};
});
```

Данный импорт называется динамическим, ибо мы явно не указываем зависимости, а сам
импорт происходит во время выполнения фабричной функции.

::ContentBookmark{:url="https://github.com/amdjs/amdjs-api/blob/master/AMD.md"}
::

### Реализация асинхронности и Require.js
Сама спецификация ничего естественно не реализовывает. Реализует данную cпецификацию Require.js.

Реализация по сути до жути простая:
- Мы объявляем модули с помощью `define`;
- Мы подтягиваем главный модуль, который импортирует другие модули;
- Импортирование модулей [происходит с помощью обычной вставки тега `script` в тег `head`](https://requirejs.org/docs/api.html#mechanics)

## UMD (Universal Module System)
UMD это надстройка над AMD, которая нужна для того чтобы код одинаково выполнялся в разных средах (в браузере и Node.js).
Данная спецификация просто улучшает совместимость AMD с Node.js и его CommonJS.

UMD создает оболочку для модулей. В зависимости от того доступен ли Require.js - используется Require.js.
Если же Require.js не доступен, то модуль импортируется в глобальный объект в именном пространстве Window.

Следующая обертка гарантированно будет работать в браузере:

```js [logger.js]
(function (root, factory) {
  // Пытаемся найти amd
  if (typeof define === 'function' && define.amd) {

    // В случае если есть amd - используем его
    define('logger', ['hello'], factory)
  } else {
    // В случае если у нас нет AMD мы просто добавляем модуль как глобальный объект
    // root в данном случае является this || self (self, аналог this в Node.js)
    root.umdCounterModule = factory(root.hello)
  }
})(typeof self !== undefined ? self : this, (helloModule) => {
  const logHello = function() {
    console.log(helloModule.hello);
  }

  logHello();

  return {logHello};
})
```

Если же целью является создать модуль, который будет работать как в браузере с Require.js, так и в Node.js с помощью CommonJS,
то код будет примерно следующим:

```js [logger.js]
(
  // Сам модуль
  define => define((require, exports, module) => {
    const dependencyModule1 = require("hello")
    const logHello = function() {
      console.log(helloModule.hello);
    }

    logHello();

    module.export = {
      logHello,
    }
  })
)(
  // В зависимости от того есть ли в текущем рантайме module и module.exports
  // передаем фабричной функцией require, exports и module из CommonJS
  // Если же module и module.exports нет - используем Require.js
  typeof module === 'object' && module.exports && typeof define !== 'function' ?
    // CommonJS: Создаем фабрику ручками.
    factory => module.exports = factory(require, exports, module) :
    // Require.js: Используем уже готовую фабрику
    define
)
```

> На случай если вы не совсем понимаете про какую "фабрику" идет речь, советую вам посмотреть на паттерн
> ["Фабрика" на patterns.dev](https://www.patterns.dev/posts/factory-pattern)

# Обратная совместимость и SystemJS

::ContentBookmark{url="https://github.com/systemjs/systemjs"}
::

Для поддержки очень старых браузеров (которые не поддерживают ES6) был придуман SystemJS. Это еще одна система для
сборки модулей.

Давайте напишем `logger.js` и `hello.js`:

```js [hello.mjs]
const hello = "Hello, World!";
export {hello};
```

```js [logger.mjs]
import {hello} from './hello';

const logHello = () => {console.log(hello)}
logHello();

export {logHello};
```

Мы можем транспилировать данный код с помощью SystemJS:

```js [hello.js]
System.register([], function(exports_1, context_1) {
  'use strict'
  var hello
  var __moduleName = context_1 && context_1.id
  return {
    execute: function() {
      hello = "Hello, World!"

      // Именованный экспорт
      exports_1('hello', hello);

      // или экспорт по умолчанию
      exports_1('default', {
        hello,
      })
    }
  }
})
```

```js [logger.js]
System.register(['./hello'], function(exports_1, context_1) {
    'use strict'
    var dependencyModule1_js_1, logHello

    var __moduleName = context_1 && context_1.id
    return {
        setters: [
            function(dependencyModule1_js_1_1) {
                dependencyModule1_js_1 = dependencyModule1_js_1_1
            },
        ],
        execute: function() {
            dependencyModule1_js_1.default.api1()
            logHello = function() {
              console.log(dependencyModule1_js_1.hello)
            };

            logHello();

            exports_1('logHello', logHello)
            exports_1('default', {
              logHello,
            })
        }
    }
})
```

Данный код более не использует ES6 и использует только встроенный функционал SystemJS, который совместим со старыми
версиями браузеров.

# ES6 и его модули
ES6 привнес достаточно много изменений, одним из главных изменений были модули.

Модули привнесли нам уже знакомый (на момент 2023 года) синтаксис:

```js [hello.mjs]
const hello = "Hello, World!";
export {hello};
```

```js [logger.mjs]
import {hello} from './hello';

const logHello = () => {console.log(hello)}
logHello();

export {logHello};
```

Мы можем использовать модули в браузере с помощью указания атрибута `type="module"` у тега `script`:

```html
<script type="module" src="./app.js" />
```

Мы также можем использовать ESM (EcmaScript Modules, они же ES6 Modules) в Node.js начиная с версии 8.5.0.
