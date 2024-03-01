<template>
  <ALink
    v-if="!error"
    :href="url"
    class="source"
    target="_blank"
  >
    <ALoader
      v-if="pending"
      size="18"
      class="source__spinner"
    />
    <div
      v-else
      class="source__content"
    >
      <img
        class="source__icon"
        alt="source icon"
        :src="meta?.icon"
      >
      <AText class="source__title">
        {{ meta?.title }}
      </AText>
    </div>
  </ALink>
</template>

<script setup lang="ts">
import type { SiteMetaResponse } from "@/types/api/meta";

interface PostSourceProperties {
  url: string;
}

const properties = defineProps<PostSourceProperties>();

const { data: meta, pending, error } = await useLazyFetch<SiteMetaResponse>("/api/meta",
  {
    method: "POST",
    body: {
      url: properties.url
    },
    key: properties.url
  });
</script>

<style lang="scss" scoped>
.source {
  border: 1px solid var(--color-neutral-5);
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;

  &__content {
    display: flex;
    gap: 12px;
  }

  &:hover {
    border-color: var(--color-neutral-6);
  }

  &__icon {
    height: 18px;
    margin-top: 1px;
    border-radius: 2px;
  }
}

@include theme-dark {
  .source {
    border-color: var(--color-neutral-9);
    &:hover {
      border-color: var(--color-neutral-8);
    }
  }
}
</style>
