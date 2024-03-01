<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: 1px solid var(--color-neutral-4);
  border-radius: 6px;
}

@include theme-dark {
  .card {
    border-color: var(--color-neutral-9);
  }
}
</style>
