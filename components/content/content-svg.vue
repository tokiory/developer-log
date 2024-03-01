<template>
  <div class="content-svg">
    <object
      class="content-svg__object"
      :data="src"
      :aria-label="alt"
      type="image/svg+xml"
    >
      <img
        class="content-svg__fallback"
        :src="src"
        loading="lazy"
        :alt="alt"
      >
    </object>
    <AText
      class="content-svg__description"
      secondary
    >
      {{ alt }}
    </AText>
  </div>
</template>

<script setup lang="ts">
interface ContentSvgProperties {
  src: string;
  alt?: string;
}

defineProps<ContentSvgProperties>();
</script>

<style lang="scss" scoped>
.content-svg {
  overflow: hidden;
  margin: 24px 0;
  border-radius: 4px;

  &__object {
    display: block;
    border-radius: 4px;
    width: 100%;
  }

  &__description {
    @include spacing-adaptive(top, 8px);
    margin-top: 8px;
    text-align: center;
  }

  &__fallback {
    display: block;
    border-radius: 4px;
    width: 100%;
  }
}

@include theme-dark {
  .content-svg {
    &__object {
      filter: invert(1);
    }
  }
}
</style>
