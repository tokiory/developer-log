<template>
  <NuxtLink
    class="link"
    :class="{color, hover}"
    v-bind="nuxtLinkProperties"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { NuxtLinkProps } from "#app";

interface LinkProperties extends NuxtLinkProps {
  color?: boolean;
  hover?: boolean;
}

const properties = withDefaults(defineProps<LinkProperties>(), {
  color: false,
  hover: false,
  noPrefetch: undefined,
  prefetch: undefined,
});

const nuxtLinkProperties = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color: _color, hover: _hover, ...rest } = properties;
  return rest;
});
</script>

<style lang="scss" scoped>
.link {
  display: inline-block;
  cursor: pointer;
  &.color {
    color: var(--color-red-dark);
  }

  &.hover,
  &.color {
    &:hover {
      @include base-transition;
      color: var(--color-red-dark-hover);
    }
  }
}

@include theme-dark {
  .link {
    &.color {
      color: var(--color-green-normal);
    }

    &.color,
    &.hover {
      &:hover {
        color: var(--color-green-normal-hover);
      }
    }
  }
}
</style>
