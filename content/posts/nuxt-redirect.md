---
title: Редирект на Nuxt 3
tags:
  - nuxt
  - note
date: 2023-06-04
---

Недавно деприкейтнул страницу в блоге со слагом `/tutorial`. Так как менять все ссылки на данный раздел было впадлу (да и не целесообразно это, ломать обратную совместимость), искал как сделать редирект.

Кроме как сделать middleware, для того чтобы редиректить пользователя еще на этапе обработки запроса сервером, хороших вариантов не было.

```ts [server/middleware/redirect.ts]
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  console.log("URL: ", url.pathname);

  // Redirect from old tutorial page
  if (url.pathname.includes("/tutorial/")) {
    const newUrl = url.pathname.replaceAll("/tutorial/", "/article/");
    await sendRedirect(event, newUrl, 301);
  }
});
```

> Если не поставить `await` перед `sendRedirect`, то сервер ответит пользователю раньше, нежели редирект совершится.
> В итоге это приведет к [крашу serverless-функции](https://stackoverflow.com/questions/63188983/nuxt-js-ssr-error-cannot-set-headers-after-they-are-sent-to-the-client) в Vercel.
