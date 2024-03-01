<template>
  <ALink
    :to="localePath(_path)"
    class="post"
  >
    <ACard class="post__card">
      <AText class="post__title">
        {{ title }}
      </AText>
      <div class="post__info info">
        <ul class="info__tags tags">
          <li
            v-for="(tag, idx) in tags"
            :key="idx"
            class="tags__item"
          >
            <ClientOnly>
              <NuxtLink
                :to="localePath({path: '/posts', query: {search: tag}})"
                class="tags__link"
                @click.stop
              >
                <ATag class="tags__tag">
                  {{ tag }}
                </ATag>
              </NuxtLink>
            </ClientOnly>
          </li>
        </ul>
        <Icon
          class="info__icon"
          name="uil:angle-right"
        />
      </div>
    </ACard>
  </ALink>
</template>

<script setup lang="ts">
import type { PostItemContent } from "@/types/content";

const localePath = useLocalePath();
defineProps<PostItemContent>();
</script>

<style lang="scss" scoped>
.post {
  display: block;

  &__card {
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &:hover {
      @include base-transition;
      border-color: var(--color-red-dark);
    }
  }
}

.info {
  display: flex;
  align-items: center;
  gap: 16px;

  &__icon {
    display: none;
  }
}

.tags {
  display: flex;
  gap: 8px;
  align-items: center;
}

@include from-md {
  .post__card {
    gap: 24px;
    padding: 12px 36px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }

  .info__icon {
    display: flex;
  }
}

@include theme-dark {
  .post {
    &__card:hover {
      border-color: var(--color-green-dark);
    }
  }
}
</style>
