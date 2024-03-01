---
title: Интеграция Excalidraw в блог
tags:
  - note
  - nuxt
date: 2023-09-19
---

Первое что я заметил - Excallidraw внутри svg-файлов подтягивает шрифты.
Для того чтобы это исправить я решил сделать отдельный компонент для диаграм,
который заранее будет один раз подтягивать шрифты:

```vue
<template>
  <div
    v-if="error === null"
    class="diagram"
    :class="{pending}"
  >
    <Transition
      mode="out-in"
      name="diagram"
    >
      <div
        v-if="pending"
        class="diagram__stub"
      >
        <ALoader
          size="32"
          class="diagram__loader"
        />
      </div>
      <div
        v-else
        class="diagram__content"
        v-html="scheme"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface ContentSchemeProperties {
  src: string;
}

const properties = defineProps<ContentSchemeProperties>();
const requestURL = useRequestURL();

const { pending, data: scheme, error } = await useAsyncData<string>(`${requestURL.pathname}-${properties.src}`, async () => {
  const absoluteURL = new URL(properties.src, requestURL);
  const response = await $fetch<Blob>(absoluteURL.href);
  return response.text();
}, { lazy: true });
</script>

<style scoped lang="scss">
.diagram {
  // ...
  &__content:deep(svg) {
    width: 100%;
    height: fit-content;
    font-family: "Virgil", 'Montserrat Variable', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  }
  // ...
}

.diagram-enter-active,
.diagram-leave-active {
  transition: opacity 0.5s ease-in-out, height 500ms ease-in-out;
}

.diagram-enter-from,
.diagram-leave-to {
  opacity: 0;
}
</style>
```

Первое на что тут стоит обратить внимание - Lazy Loading.
Мы подхватываем файл переданный в `properties.src` с помощью `ofetch`,
который встроен в Nuxt.

::ContentBookmark{url="https://github.com/unjs/ofetch"}
::

После того как мы загрузили необходимое изображение в формате SVG,
нам необходимо вставить его в HTML и стилизовать.

Я не нашел способа лучше, как просто использовать директиву
`v-html` и стилизовать контент с помощью селектора с `:deep`, с помощью него я и
устанавливаю шрифты для диаграм.

::ContentBookmark{url="https://vuejs.org/api/sfc-css-features.html#deep-selectors"}
::
