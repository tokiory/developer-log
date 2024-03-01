<template>
  <div class="tag">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.tag {
  font-size: var(--fz-text-secondary);
  display: flex;
  padding: 4px 8px;
  background: var(--color-red-light);
  border: 1px solid var(--color-red-normal);
  border-radius: 4px;
  white-space: nowrap;

  &:hover {
    background: var(--color-red-light-hover);
    border-color: var(--color-red-normal-hover);
  }
}

@include from-sm {
  .tag {
    padding: 4px 12px;
  }
}

@include theme-dark {
  .tag {
    background: var(--color-green-dark);
    border: 1px solid var(--color-green-normal);

    &:hover {
      background: var(--color-green-dark-hover);
      border-color: var(--color-green-normal-hover);
    }
  }
}
</style>
