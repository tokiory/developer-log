<template>
  <nav
    v-if="navigation.length > 1"
    ref="containerReference"
    class="post-navigation"
  >
    <ATitle
      class="post-navigation__title"
      level="3"
    >
      Навигация
    </ATitle>
    <ul class="post-navigation__list">
      <li
        v-for="item in navigation"
        :id="`nav-${item.anchor}`"
        :key="item"
        :ref="v => itemsReference.push(v as HTMLDivElement)"
        class="post-navigation__item"
        :style="{marginLeft: `${8 * item.level}px`}"
      >
        <NuxtLink
          :href="getNavigationUrl(item.anchor)"
          class="post-navigation__link"
          @click="$emit('update:modelValue', item.anchor)"
        >
          <AText
            :class="{active: item.anchor === modelValue}"
            class="post-navigation__text"
            secondary
          >
            {{ item.title }}
          </AText>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { PostNavigationItem } from "@/types/posts";

interface PostNavigationProperties {
  navigation: PostNavigationItem[];
  modelValue: PostNavigationItem["anchor"];
}

const properties = defineProps<PostNavigationProperties>();
defineEmits<{"update:modelValue": [value: string]}>();

const containerReference = ref<HTMLElement>();
const itemsReference = ref<HTMLDivElement[]>([]);
const route = useRoute();
const getNavigationUrl = (id: string) => `${route.path}#${encodeURI(id)}`;
const getNavId = (anchor: string) => `nav-${anchor}`;

watch(() => properties.modelValue, anchor => {
  if (!useFeature("POST_NAVIGATION")) {
    return;
  }

  if (!containerReference.value || itemsReference.value.length === 0) {
    return;
  }

  const item = itemsReference.value
    .find(node => node.id === getNavId(anchor));

  if (item) {
    containerReference.value.scrollTo({ top: item.offsetTop, behavior: "smooth" });
  }
}, { immediate: true });
</script>

<style lang="scss" scoped>
.post-navigation {
  max-width: 300px;
  max-height: calc(100vh - var(--size-header) - 32px * 2);
  padding: 8px;
  @include base-scroll(inherit);

  &__list {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__text {
    color: var(--color-neutral-8);

    &:hover {
      color: var(--color-red-normal-hover);
    }

    &.active {
      color: var(--color-red-normal);
    }
  }
}

@include theme-dark {
  .post-navigation {
    @include base-scroll(inherit, var(--color-green-normal));

    &__text {
      color: var(--color-neutral-5);

      &:hover {
        color: var(--color-green-normal-hover);
      }

      &.active {
        color: var(--color-green-normal);
      }
    }
  }
}
</style>
