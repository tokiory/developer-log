<template>
  <div class="error-page">
    <NuxtImg
      class="error-page__logo"
      alt="Crying cat"
      src="/tokiory/cry.svg"
    />
    <ATitle class="error-page__title">
      {{ t('error.title') }}
    </ATitle>
    <AText class="error-page__text">
      {{ t('error.description') }}
    </AText>
    <AText class="error-page__text">
      {{ t('error.retry') }}
    </AText>
    <NuxtLink
      class="error-page__link"
      to="/"
    >
      <AButton>
        {{ t('error.go') }}
      </AButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
.error-page {
  padding: 12px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  &__logo {
    width: 264px;
  }

  &__title,
  &__text {
    text-align: center;
  }

  &__title {
    margin-top: 24px;
  }


  &__text {
    margin-top: 12px;

    &:first-child {
      margin-top: 24px;
    }
  }

  &__link {
    margin-top: 32px;
  }
}
</style>
