<template>
  <td class="post-content-td">
    <slot />
  </td>
</template>

<style lang="scss" scoped>
.post-content-td {
  padding: 8px 16px;
  border: 1px solid var(--color-neutral-6);
}

@include theme-dark {
  .post-content-td {
    background: var(--color-neutral-10);
    border-color: var(--color-neutral-9);
  }
}
</style>
