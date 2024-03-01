---
title: Сокращение типизации с помощью утилей в Typescript
tags:
  - typescript
  - web
description: >
  Поговорим о том как можно сократить код для типизации данных с помощью Util Types в Typescript.
date: 2023-04-21
origin:
  type: Habr
  url: https://habr.com/ru/articles/730906/
---

# Что такое Util Types?
TypeScript предоставляет утилит для облегчения преобразования типов.
Данные типы доступны глобально, они добавляют гибкости в создание типов и помогают соблюдать принцип DRY.

## Опциональные поля в типах - Partial\<T\>

Допустим, что нам нужно сделать все поля в структуре опциональными:

```typescript[user.types.ts]
interface UserData {
  uuid: string;
  username: string;
  age: number;
}

// Реализация такого типа ручками:
interface OptionalUserData {
  uuid?: string;
  username?: string;
  age?: number;
}
```

Трансформацию как в `OptionalUserData` можно сделать с помощью специального типа `Partial<T>`. Все Util Types содержат в себе
дженерик, в который мы передаем тип, который нам нужно преобразовать.

`Partial<T>` преобразует все поля в типе и делает их опциональными:

```typescript[user.types.ts]
interface UserData {
  uuid: string;
  username: string;
  age: number;
}

type OptionalUserData = Optional<UserData>; // Эквивалентно интерфейсу OptionalUserData, что был в листинге до этого
```

## Преобразование всех полей в обязательные - Required\<T\>

`Required` является противоположностью `Partial` - он делает все поля обязательными.

```typescript[user.types.ts]
interface UserData {
  uuid: string;
  username: string;
  age?: number; // Опциональный поле
}

type RequiredUserData = Required<UserData>;

// Property 'age' is missing in type '{ age: number; }' but required in type 'RequiredUserData'.
const person: RequiredUserData = {
  uuid: "fff",
  username: "tokiory"
};
```

## Создание строготипизированных объектов - Record\<T, U\>

`Record` используется для того чтобы создавать строготипизированные объекты.

- Тип `T` нужен для того чтобы указать тип ключа для объекта;
- Тип `U` указывает на тип значения поля.

```typescript[pets.types.ts]
interface PetInfo {
  age: number;
  breed: string;
}

type CatName = "lucas" | "oiko" | "jean";

const cats: Record<CatName, CatInfo> = {
  lucas: { age: 1, breed: "Maine Coon" },
  oiko: { age: 15, breed: "Persian" },
  jean: { age: 16, breed: "British Shorthair" },
};
```

> **Важно**
>
> Если указать вместо `CatName` в примере выше `string`, то у вас пропадет Intellisense для данного объекта в редакторе.
> Дело в том что Typescript будет думать, что внутрь объекта с типом `Record<string, ...>` можно положить любую строку
> в виде ключа и не будет анализировать те ключи, которые вы предоставили внутри объекта.


::ContentDetails
---
title: Как сделать так, чтобы значения были типизированы, а у полей было автодополнение
---
Если мы просто создадим `Record<string, ...>`, то автодополнения нам не видать. Typescript как уже было
сказано выше будет считать, что `Record<string, ...>` может иметь любое поле, что попадает под тип `string`:

```typescript
interface PersonInfo {
  isOnline: boolean;
  age: number;
}

type PersonalInfo = Record<string, PersonInfo>;

const persons: PersonalInfo = {
  john12: {
    isOnline: true,
    age: 20
  },
  tokiory: {
    isOnline: false,
    age: 20
  },
};

// Если мы напишем "persons." - то Intellisense не поймет чего мы от него хотим
```

Вместо этого подхода мы должны использовать оператор `satisfies`, который ввели в Typescript 4.9.

```typescript
interface PersonInfo {
  isOnline: boolean;
  age: number;
}

type PersonalInfo = Record<string, PersonInfo>;

const persons = {
  john12: {
    isOnline: true,
    age: 20
  },
  tokiory: {
    isOnline: false,
    age: 20
  },
} satisfies PersonalInfo;

// Если мы напишем "persons." - то Intellisense заработает!!!
```
Идея состоит в том, что оператор `satisfies` будет проверять каждое свойство и значение из `persons` на совместимость
с исходными типами в `PersonalInfo`. Например, поле `john12` является частным случаем типа `string`, `satisfies` видит это
и понимает что ключ объекта удовлетворяет тому, что все ключи должны быть типом `string` и не выводит никакой ошибки.

Важно отметить, что в отличии от первого подхода, второй - только проверяет совместимость с исходными типами, сами
типы объекту `persons` не назначены, то есть `persons` имеет тип:

```typescript
const persons: {john12: {isOnline: boolean, age: number}, tokiory: {isOnline: boolean, age: number}}
```
::

## Типы для функций - Parameters\<T\> и ReturnType\<T\>
Данные типы используются для того чтобы извлечь типы из функций.

- `Parameters<T>` - возвращает массив типов параметров в функции;
- `ReturnType<T>` - возвращает возвращаемый тип функции.

```typescript[functional.types.ts]
function capitalize({line}: {line: string}): string {
  return s.length ? s[0] + s.slice(1) : s;
}

type CapitalizeFuncArgs = Parameters<typeof capitalize>; // [ { line: string } ]
type CapitalizeFuncReturn = ReturnType<typeof capitalize>; // string
```

## Работа с полями интерфейса - Pick\<T, U\> и Omit\<T, U\>
`Pick` и `Omit` в основном используются с интерфейсами для удобной работы с полями.

- `Pick<T, U>` - позволяет вернуть одно или несколько полей из интерфейса;
- `Omit<T, U>` - позволяет вернуть весь интерфейс без определенных полей.

```typescript[interface.types.ts]
interface Person {
  name: string;
  surname: string;
  age: number;
  login: string;
  email: string;
}

type LoginInfo = Pick<Person, "login" | "email" | "name">; // => { login: string; email: string; name: string; }

type ShowName = Omit<Person, "login" | "email">;           // => { name: string; surname: string; age: number; }
```

## Общие элементы и уникальные элементы - Extract\<T, U\> и Exclude\<T, U\>
- `Extract` - возвращает все типы, которые есть и в одном, и в другом переданом союзе типов;
- `Exclude` - возвращает все типы, которые есть или в первом, или в другом переданом союзе типов;

```typescript[name.types.ts]
type MaleName = "Carl" | "Christian" | "Daren";
type FemaleName = "July" | "Daren" | "Ann";

type OnlyMaleName = Exclude<MaleName, FemaleName>; // "Carl" | "Christian"
type OnlyGeneralName = Extract<MaleName, FemaleName>; // "Daren"
```

## Взаимодействие с типами строк

Внизу предоставлены типы для взаимодействия со строковыми типами:

- `Uppercase<StringType>` - Тип который преобразует все символы в верхний регистр;
- `Lowercase<StringType>`- Тип который преобразует все символы в нижний регистр;
- `Capitalize<StringType>`- Тип который преобразует первый символ в верхний регистр;
- `Uncapitalize<StringType>`- Тип который преобразует первый символ в нижний регистр.

```typescript[string.types.ts]
type Cat = "cAt";
type UpperCat = Uppercase<Cat>; // "CAT"
type LowerCat = Lowercase<Cat>; // "cat"
type CapitalCat = Capitalize<Cat>; // "CAt"
type UncapitalCat = Capitalize<Cat>; // "cAt"
```

Если вы передаете данным союзный тип, то Typescript обработает тип для каждого элемента союза:

```typescript
type Pet = "doG" | "CaT";
type UpperCat = Uppercase<Cat>; // "DOG" | "CAT"
type LowerCat = Lowercase<Cat>; // "dog" | "cat"
type CapitalCat = Capitalize<Cat>; // "DoG" | "CaT"
type UncapitalCat = Capitalize<Cat>; // "doG" | "caT"
```
