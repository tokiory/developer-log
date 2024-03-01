<template>
  <ul class="post-content-ul">
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
.post-content-ul {
  @include spacing-adaptive(top, 8px);
  padding-left: 26px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  :deep(li) {
    position: relative;
    margin: 2px 0;

    &::before {
      background: var(--color-neutral-13);
      top: 10px;
      position: absolute;
      content: '';
      left: -14px;
      width: 5px;
      height: 5px;
      border-radius: 5px;
    }
  }
}

@include theme-dark {
  .post-content-ul > :deep(li)::before {
    background: var(--color-neutral-2);
  }
}
</style>
