<template>
  <div
    :id="selectors.appContainer.id"
    :data-theme="theme"
    :class="selectors.appContainer.class"
  >
    <NuxtLoadingIndicator
      :throttle="100"
      :duration="2000"
      :color="accentColor"
    />
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
    <LazyCookieBanner v-if="hasCookieFeature" />
  </div>
</template>

<script setup lang="ts">
import "@fontsource-variable/montserrat";
import { useFeature, useTheme } from "#imports";
import selectors from "@/data/selectors";
import "@style/index.scss";

const hasCookieFeature = useFeature("COOKIE_BANNER");
const { theme, accentColor } = useTheme();
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 100ms;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
