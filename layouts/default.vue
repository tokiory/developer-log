<template>
  <div
    id="layout"
    class="default-layout"
  >
    <AHeader />
    <slot />
    <AFooter />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

watchEffect(() => {
  useSeoMeta({
    title: t("title"),
    ogLocale: locale.value,
  });

  useHead({
    htmlAttrs: {
      lang: locale.value,
    }
  });
}, { flush: "post" });
</script>
