<template>
  <div
    class="text"
    :class="{bold, secondary, italic, inline}"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface TextProperties {
  bold?: boolean;
  italic?: boolean;
  secondary?: boolean;
  inline?: boolean;
}

defineProps<TextProperties>();
</script>

<style lang="scss" scoped>
.text {
  display: block;
  font-size: var(--fz-text);
  line-height: 120%;
  letter-spacing: 0.27px;
  color: var(--color-neutral-13);

  &.inline {
    display: inline;
  }

  &.bold {
    font-weight: 600;
  }

  &.italic {
    font-style: italic;
  }

  &.secondary {
    font-size: var(--fz-text-secondary);
    letter-spacing: 0.21px;
  }
}

@include theme-dark {
  .text {
    color: var(--color-neutral-2);
  }
}
</style>
