<template>
  <AText class="post-content-text">
    <slot />
  </AText>
</template>

<style lang="scss">
.post-content-text {
  @include spacing-adaptive(top, 8px);
  line-height: 145% !important;

  strong {
    font-weight: 600;
  }
}
</style>
