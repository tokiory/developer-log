<template>
  <button
    class="theme-switcher"
    title="Кликните правой кнопкой мыши, чтобы сбросить настройки"
    @click="onClick"
    @click.right="onRightClick"
  >
    <Transition
      type="transition"
    >
      <!-- There's two elements for transition animation -->
      <Icon
        v-if="theme === 'dark'"
        class="theme-switcher__icon"
        size="24"
        name="fe:sunny-o"
      />
      <Icon
        v-else
        class="theme-switcher__icon"
        size="24"
        name="uil:moon"
      />
    </Transition>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from "#imports";
import localStorageKey from "@/data/local-storage-key";

import { loadIcon } from "@iconify/utils";

const { theme } = useTheme();

useAsyncData(async () => {
  await loadIcon("fe", "sunny-o");
  await loadIcon("uil", "moon");
}, {
  server: false,
  immediate: true,
});

const onClick = () => {
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  switch (theme.value) {
  case "dark": {
    theme.value = "light";
    break;
  }
  case "light": {
    theme.value = "dark";
    break;
  }
  default: {
    theme.value = preferredTheme === "dark" ? "light" : "dark";
  }
  }
};

const onRightClick = (event: Event) => {
  event.preventDefault();
  theme.value = null;
  localStorage.removeItem(localStorageKey.theme);
};
</script>

<style lang="scss" scoped>
.theme-switcher {
  cursor: pointer;
  padding: 8px;
  border: none;
  background: inherit;
}
.v-enter-active,
.v-leave-active {
  transition: transform 400ms ease-in-out,
  rotate 500ms linear,
  opacity 400ms ease-in-out
}

.v-enter-from,
.v-leave-to {
  position: absolute;
  opacity: 0;
  transform: rotate(180deg);
}
</style>
