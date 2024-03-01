<template>
  <ACard class="license-support">
    <AText class="license-support__text">
      {{ phrase }}
    </AText>
    <NuxtImg
      class="license-support__image"
      :src="icon"
    />
  </ACard>
</template>

<script setup lang="ts">
interface LicenseSupportProperties {
  phrase: string;
  icon: string;
}

defineProps<LicenseSupportProperties>();
</script>

<style lang="scss" scoped>
.license-support {
  padding: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;

  &__image {
    height: 32px;
  }
}
</style>
