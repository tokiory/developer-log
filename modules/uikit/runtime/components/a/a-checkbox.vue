<template>
  <label
    :for="id"
    :aria-label="label"
    class="checkbox"
  >
    <input
      :id="id"
      v-model="model"
      :name="id"
      class="checkbox__input"
      type="checkbox"
    >
    <AText
      secondary
      class="checkbox__text"
    >
      {{ label }}
    </AText>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

interface CheckboxProperties {
  labelVisible?: boolean;
  label: string;
  id: string;
}

withDefaults(defineProps<CheckboxProperties>(), {
  labelVisible: false,
});
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;

  &__input {
    cursor: pointer;
    position: relative;
    width: 16px;
    height: 16px;
    appearance: none;
    border: 1px solid var(--color-neutral-6);
    border-radius: 4px;
    overflow: hidden;

    &:checked::before {
      content: '';
      position: absolute;
      inset: 2px;
      border-radius: 3px;
      background: var(--color-red-normal);
    }
  }

  &__text {
    user-select: none;
  }
}

@include theme-dark {
  .checkbox {
    &__input {
      border-color: var(--color-neutral-8);

      &:checked::before {
        background: var(--color-green-normal);
      }
    }
  }
}
</style>
