<template>
  <ol class="post-content-ol">
    <slot />
  </ol>
</template>

<style lang="scss">
.post-content-ol {
  @include spacing-adaptive(top, 8px);
  padding-left: 26px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  }
</style>
