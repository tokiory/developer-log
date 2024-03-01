<template>
  <th class="post-content-th">
    <slot />
  </th>
</template>

<style lang="scss" scoped>
.post-content-th {
  padding: 16px 16px;
  background: var(--color-neutral-3);
  border: 1px solid var(--color-neutral-6);
  border-radius: 4px;
  font-weight: 600;
}

@include theme-dark {
  .post-content-th {
    background: var(--color-neutral-11);
    border-color: var(--color-neutral-9);
  }
}
</style>
