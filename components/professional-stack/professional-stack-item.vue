<template>
  <ACard class="stack-item">
    <AText class="stack-item__title">
      {{ title }}
    </AText>
    <AText
      class="stack-item__description"
      secondary
    >
      {{ t(description) }}
    </AText>
    <AText
      class="stack-item__term"
      secondary
    >
      {{ t(`time.year.${timeInUse.amount}`, timeInUse.count) }}
    </AText>
  </ACard>
</template>

<script setup lang="ts">
import type { ProfessionalStackItemContent } from "@/types/content";

defineProps<ProfessionalStackItemContent>();
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.stack-item {
  height: 100%;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__description,
  &__term {
    color: var(--color-neutral-8);
  }
}

@include theme-dark {
  .stack-item {
    &__description,
    &__term {
      color: var(--color-neutral-6);
    }
  }
}
</style>
