<template>
  <details
    class="details"
  >
    <summary
      class="details__summary"
      role="button"
      :aria-expanded="active"
      tabindex="0"
      @click="active = !active"
      @keydown.enter="active = !active"
    >
      {{ title }}
      <Icon
        :name="active ? 'uil:angle-up' : 'uil:angle-down'"
        class="details__icon"
      />
    </summary>
    <div class="details__content">
      <slot />
    </div>
  </details>
</template>

<script setup lang="ts">
interface ContentDetailsProperties {
  title: string;
}

defineProps<ContentDetailsProperties>();

const active = ref(false);
</script>

<style lang="scss" scoped>
.details {
  margin: 24px 0;
  border: 1px solid var(--color-neutral-4);
  border-radius: 6px;

  &[open] {
    padding-bottom: 12px;
  }

  &__icon {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__content {
    padding: 12px 18px;
  }

  &__summary {
    cursor: pointer;
    background: var(--color-neutral-3);
    padding: 12px 18px;
    font-weight: 500;
    position: relative;

    &::-webkit-details-marker,
    &::marker {
      content: '';
      display: none;
    }
  }
}

@include theme-dark {
  .details {
    &__summary {
      background: var(--color-neutral-9);
    }
    border-color: var(--color-neutral-8);
  }
}
</style>
