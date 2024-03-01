<template>
  <blockquote class="quote">
    <slot />
    <AText
      v-if="author"
      class="quote__author"
    >
      — {{ author }}
    </AText>
  </blockquote>
</template>

<script setup lang="ts">
interface ContentQuoteProperties {
  author?: string;
}

defineProps<ContentQuoteProperties>();
</script>

<style lang="scss" scoped>
.quote {
  border-left: 3px solid var(--color-red-normal);
  margin: 24px 0;
  padding: 0 24px;

  &__author {
    margin-top: 12px;
  }
}

@include theme-dark {
  .quote {
    border-left-color: var(--color-green-normal);
  }
}
</style>
