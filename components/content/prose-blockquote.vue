<template>
  <blockquote class="post-content-blockquote">
    <ACard class="post-content-blockquote__card">
      <AText class="post-content-blockquote__text">
        <Icon
          size="18"
          class="post-content-blockquote__icon"
          name="uil:info-circle"
        />
        Информация
      </AText>
      <slot />
    </ACard>
  </blockquote>
</template>

<style lang="scss" scoped>
.post-content-blockquote {
  padding: 0;
  margin: 12px 0;

  &__text {
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1;
    color: var(--color-red-dark);
  }


  &__card {
    padding: 12px;
  }
}

@include theme-dark {
  .post-content-blockquote__text {
    color: var(--color-green-normal);
  }
}
</style>
