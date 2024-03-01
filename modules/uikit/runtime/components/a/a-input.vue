<template>
  <input
    v-bind="$attrs"
    v-model="model"
    class="input"
  >
</template>

<script lang="ts" setup>
const model = defineModel<string>();
</script>

<style lang="scss" scoped>
.input {
  padding: 12px;
  border: 1px solid var(--color-neutral-5);
  border-radius: 6px;
  outline: none;
}

@include theme-dark {
  .input {
    background: var(--color-neutral-10);
    border-color: var(--color-neutral-9);
    color: var(--color-neutral-2);
  }
}
</style>
