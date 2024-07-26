<template>
  <div class="tab-select">
    <div
      v-for="{key, value} of tabs"
      :key="key"
      role="button"
      tabindex="0"
      class="tab-select__tab"
      :class="{'active': key === model}"
      @click="() => onTabClick(key)"
      @keydown.enter="() => onTabClick(key)"
      @keydown.space="() => onTabClick(key)"
    >
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface ATabSelectProperties {
  tabs: TabOption[];
}

defineProps<ATabSelectProperties>();
const model = defineModel<string>();

const onTabClick = (id: string) => {
  model.value = id;
};
</script>

<style scoped lang="scss">
.tab-select {
  display: flex;
  width: fit-content;
  gap: 8px;
  padding: 4px 8px;
  border: 1px solid var(--color-neutral-4);
  border-radius: 6px;

  &__tab {
    cursor: pointer;
    border-radius: 4px;
    padding: 6px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    user-select: none;

    &:hover {
      background-color: var(--color-neutral-3);
    }

    &:active {
      background-color: var(--color-neutral-5);
    }

    &.active {
      background-color: var(--color-red-normal);
      color: var(--color-neutral-1);

      &:hover {
        background-color: var(--color-red-normal-hover);
      }

      &:active {
        background-color: var(--color-red-normal-active);
      }
    }
  }
}

@include theme-dark {
  .tab-select {
    border: 1px solid var(--color-neutral-9);
    &__tab {
      &:hover {
        background-color: var(--color-neutral-9);
      }

      &:active {
        background-color: var(--color-neutral-8);
      }

      &.active {
        background-color: var(--color-green-dark);

        &:hover {
          background-color: var(--color-green-dark-hover);
        }

        &:active {
          background-color: var(--color-green-dark-active);
        }
      }
    }
  }
}
</style>
