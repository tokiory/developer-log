<template>
  <ALink
    :href="url"
    class="technology"
  >
    <ACard class="technology__card">
      <AText class="technology__title">
        {{ t(title) }}
      </AText>
      <AText
        class="technology__value"
      >
        {{ value }}
      </AText>
    </ACard>
  </ALink>
</template>

<script setup lang="ts">
import type { TechnologiesStackItemContent } from "@/types/content";
defineProps<TechnologiesStackItemContent>();

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.technology {
  display: block;

  &__card {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    gap: 12px;

    &:hover {
      border-color: var(--color-red-normal-hover);
    }
  }

  &__value {
    color: var(--color-neutral-8);
    white-space: nowrap;
  }
}

@include theme-dark {
  .technology {
    &__card {
      &:hover {
        border-color: var(--color-green-normal-hover);
      }
    }

    &__value {
      color: var(--color-neutral-6);
    }
  }
}
</style>
