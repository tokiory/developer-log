<template>
  <ul
    class="posts"
  >
    <li
      v-for="post in posts"
      :key="post"
      class="posts__item"
    >
      <RecentPostsItem
        class="posts__post"
        v-bind="post"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PostContent } from "@/types/content";

interface CompactPostsProperties {
  posts: PostContent,
}

defineProps<CompactPostsProperties>();
</script>

<style lang="scss" scoped>
.posts {
  &__item {
    border: 1px solid var(--color-neutral-5);
    border-radius: 4px;

    &:hover {
      background: var(--color-neutral-3);
      z-index: 1;
    }

    & + & {
      margin-top: -1px;
      border-radius: 0;
    }

    &:first-child {
      border-radius: 4px 4px 0 0;
    }

    &:last-child {
      border-radius: 0 0 4px 4px;
    }
  }

  &.pending {
    border: 1px solid var(--color-neutral-5);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
  }
}


@include theme-dark {
  .posts__item {
    border-color: var(--color-neutral-9);
    &:hover {
      background: var(--color-neutral-11);
    }
  }
}
</style>
