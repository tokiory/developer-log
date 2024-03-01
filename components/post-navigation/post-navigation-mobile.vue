<template>
  <ContentDetails
    title="Навигация"
    class="navigation"
  >
    <ul class="navigation__list">
      <li
        v-for="item in navigation"
        :key="item"
        class="navigation__item"
      >
        <ALink
          class="navigation__item"
          color
          :href="getNavigationUrl(item.anchor)"
        >
          {{ item.title }}
        </ALink>
      </li>
    </ul>
  </ContentDetails>
</template>

<script setup lang="ts">
import type { PostNavigationItem } from "@/types/posts";

interface PostNavigationMobileProperties {
  navigation: PostNavigationItem[];
}
defineProps<PostNavigationMobileProperties>();

const route = useRoute();
const getNavigationUrl = (id: string) => `${route.path}#${encodeURI(id)}`;
</script>

<style lang="scss" scoped>
.navigation {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__item {
    display: block;
  }
}
</style>
