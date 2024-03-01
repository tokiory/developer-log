<template>
  <button
    class="button"
    :class="theme"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface ButtonProperties {
  theme?: "primary" | "secondary" | "tertiary";
}

withDefaults(defineProps<ButtonProperties>(), {
  theme: "primary",
});
</script>

<style scoped lang="scss">
.button {
  padding: 12px 36px;
  border: 1px solid var(--color-neutral-5);
  border-radius: 6px;
  @include base-transition;

  &:hover {
    cursor: pointer;
  }

  &.primary {
    background: var(--color-red-normal);
    border-color: var(--color-red-dark);
    color: var(--color-neutral-2);

    &:hover {
      background: var(--color-red-normal-hover);
    }

    &:active {
      background: var(--color-red-normal-active);
    }
  }

  &.secondary {
    background: var(--color-neutral-4);

    &:hover {
      filter: brightness(0.95);
      border-color: var(--color-neutral-5);
    }

    &:active {
      filter: brightness(0.92);
      border-color: var(--color-neutral-5);
    }
  }

  &.tertiary {
    border-color: var(--color-red-dark);
    border-width: 2px;
    background-color: var(--color-neutral-1);

    &:hover {
      filter: brightness(0.97);
      border-color: var(--color-red-normal-hover);
    }

    &:active {
      filter: brightness(0.95);
    }
  }
}

@include theme-dark {
  .button {
    &.primary {
      background: var(--color-green-normal);
      border-color: var(--color-green-dark);
      color: var(--color-neutral-2);

      &:hover {
        background: var(--color-green-normal-hover);
      }

      &:active {
        background: var(--color-green-normal-active);
      }
    }

    &.tertiary {
      border-color: var(--color-green-dark);
      border-width: 2px;
      background-color: var(--color-neutral-11);
      color: inherit;

      &:hover {
        filter: brightness(0.97);
        border-color: var(--color-green-normal-hover);
      }

      &:active {
        filter: brightness(0.95);
      }
    }
  }
}
</style>
