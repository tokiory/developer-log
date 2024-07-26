<template>
  <div class="posts-group">
    <AText class="posts-group__date">
      {{ date }}
    </AText>
    <ul
      ref="groupReference"
      class="posts-group__list"
    >
      <li
        v-for="item in group"
        :key="item"
        class="posts-group__item"
      >
        <FeedPostsItem
          class="posts-group__post"
          v-bind="item"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { PostItemContent } from "@/types/content";

interface FeedPostsGroupProperties {
  group: PostItemContent[];
  date: string;
}

defineProps<FeedPostsGroupProperties>();
</script>

<style lang="scss" scoped>
.posts-group {
  position: relative;

  &__date {
    color: var(--color-neutral-8);
    font-size: 24px;
    margin-top: 12px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-top: 16px;
  }
}

@include from-xl {
  .posts-group {
    &__date {
      margin-top: 0;
      font-size: inherit;
      position: absolute;
      left: -180px;
      top: 12px;
    }

    &__list {
      margin: 0;
    }
  }
}
</style>
