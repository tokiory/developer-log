# Open Graph Module

This module is needed so that the application has the ability to set og tags, generate dynamic images for Open Graph, and also flexibly configure everything.

## How module works?

On each page we set OG tags, which in turn are generated using
composable `useOpenGraph`, which in turn is an adapter for `useSeoMeta`.
`useOpenGraph` also collects a special link for OG Image, which will take us
to the endpoint `/api/og/`

`/api/og` simply generates an OG preview image using [satori](https://github.com/vercel/satori),
and then uses resvg to turn the svg into png

## Configuration options

- `title`: Title of the page;
- `description`: Description of the page;
- `image`:
    - `title`: Title that will appear on og image
    - `description`: Description that will appear on og image
- `author`: Author og tag
- `url`: URL of the site

It is not necessary to specify the URL, it is better to explicitly
pass the URL when using `useOpenGraph`.

The URL of the current page can be
obtained using [`useRequestURL`](https://nuxt.com/docs/api/composables/use-request-url):

```typescript
const { t } = useI18n();

const url = useRequestURL();

useSeoMeta({
  ...useOpenGraph({
    title: t("title"),
    image: {
      title: `${t("title")}: ${t("page.home.tabTitle")}`,
      description: t("page.home.hero").split(".").slice(0, 2).join(".") + ".",
    },
    url,
    author: "Daniil Shilo (tokiory) <tokiory.personal@gmail.com>",
  }),
});
```

Fields not passed will
be taken from the configuration in `runtimeConfig.public.openGraph`.

### Usage

```ts
const runtimeConfig: NuxtConfig["runtimeConfig"] = {
  public: {
    openGraph: {
      title: "Лог разработчика",
      description: "",
      image: {
        title: "",
        description: "",
      },
      author: "Daniil Shilo <tokiory.personal@gmail.com>",
    },
  }
};
```
