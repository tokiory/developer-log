<template>
  <main class="projects">
    <ul
      role="menu"
      class="projects__menu menu"
    >
      <li
        v-for="(item, idx) in projects.list"
        :key="idx"
        role="menuitem"
        tabindex="0"
        class="menu__item"
        @click="activeProjectIndex = idx"
        @keydown.enter="activeProjectIndex = idx"
      >
        <ACard
          :class="{active: activeProjectIndex === idx}"
          class="menu__card"
        >
          <AText class="menu__title">
            {{ item.name }}
          </AText>
          <AText class="menu__description">
            {{ $t(item.description.short) }}
          </AText>
        </ACard>
      </li>
    </ul>
    <Transition
      mode="out-in"
      name="projects"
    >
      <div
        v-if="activeProject"
        :key="activeProjectIndex"
        class="projects__view view"
      >
        <ATitle class="view__title">
          {{ activeProject.name }}
        </ATitle>
        <AText
          v-for="(item, idx) in activeProject.description.long"
          :key="idx"
          class="view__description"
        >
          {{ $t(item) }}
        </AText>
        <div
          v-if="isStackVisible"
          class="view__stack stack"
        >
          <ATitle
            level="2"
            class="stack__title"
          >
            {{ $t("page.projects.stack") }}
          </ATitle>
          <ul class="stack__list stack__list_primary">
            <li
              v-for="(item, idx) in activeProject.stack.primary"
              :key="idx"
              class="stack__item"
            >
              <NuxtImg
                class="stack__image"
                :src="`/stack/${item}.svg`"
                preload
                preset="stack"
                :alt="item"
              />
            </li>
          </ul>
          <ul class="stack__list stack__list_additional">
            <li
              v-for="(item, idx) in activeProject.stack.additional"
              :key="idx"
              class="stack__item"
            >
              <NuxtImg
                class="stack__image"
                preset="stack"
                preload
                :alt="item"
                :src="`/stack/${item}.svg`"
              />
            </li>
          </ul>
        </div>
        <div
          v-if="isLinksVisible"
          class="view__links links"
        >
          <ATitle
            level="2"
            class="links__title"
          >
            {{ $t("page.projects.links") }}
          </ATitle>
          <ul class="links__list">
            <li
              v-for="item in activeProject.links"
              :key="item"
              class="links__item"
            >
              <ContentBookmark :url="item.url" />
            </li>
          </ul>
        </div>
      </div>
      <div
        v-else
        class="projects__empty empty"
      >
        <NuxtImg
          class="empty__cat"
          src="/tokiory/question.svg"
          preload
          format="webp"
        />
        <ATitle class="empty__title">
          {{ $t("page.projects.chooseTitle") }}
        </ATitle>
        <AText class="empty__text">
          {{ $t("page.projects.chooseDescription") }}
        </AText>
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { projects } from "@/data/content";

const { t } = useI18n();
const url = useRequestURL();

useSeoMeta({
  ...useOpenGraph({
    title: `${t("title")}: ${t("page.projects.tabTitle")}`,
    image: {
      title: `${t("title")}: ${t("page.projects.tabTitle")}`,
      description: t("page.home.hero").split(".").slice(0, 2).join(".") + ".",
    },
    url,
    author: "Daniil Shilo (tokiory) <tokiory.personal@gmail.com>",
  }),
});

const activeProjectIndex = ref<number>();

const activeProject = computed(() => {
  return projects.list?.[activeProjectIndex.value!];
});


const isStackVisible = computed(() => {
  if (activeProject.value?.stack) {
    return activeProject.value.stack.primary.length > 0
      || activeProject.value.stack.additional.length > 0;
  }

  return false;
});

const isLinksVisible = computed(() => {
  return activeProject.value?.links && activeProject.value.links.length > 0;
});
</script>

<style lang="scss" scoped>
.projects {
  @include spacing-content;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: calc(100vh - var(--size-header));
}

.menu {
  display: flex;
  gap: 24px;
  flex-shrink: 0;
  overflow: auto;
  flex-wrap: nowrap;
  padding: 12px 0;
  max-height: calc(100vh - var(--size-header) - 64px);

  @include base-scroll;

  &__item {
    width: 100%;
    min-width: 300px;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
  }

  &__description {
    margin-top: 8px;
    color: var(--color-neutral-8);
  }

  &__card {
    height: 100%;
    padding: 18px;
    cursor: pointer;

    &:hover {
      border-color: var(--color-red-dark);
    }

    &.active {
      border-color: var(--color-red-normal);
    }
  }
}

.view {
  &__title {
    color: var(--color-red-dark);
  }

  &__description {
    @include spacing-adaptive(top, 12px);
  }
}

.stack {
  margin-top: 24px;

  &__list {
    margin-top: 12px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__image {
    max-width: 100%;
    width: 100%;
  }

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    width: 55px;
    border: 1px solid var(--color-neutral-4);
    border-radius: 4px;
    padding: 8px;
    overflow: hidden;
  }
}

.links {
  margin-top: 24px;

  &__list {
    margin-top: 12px;
  }

  &__item {
    position: relative;
  }
}

.empty {
  display: flex;
  flex-direction: column;
  place-items: center;
  height: 100%;
  width: calc(100% - 16px);

  &__cat {
    max-width: 184px;
    width: 100%;
  }

  &__title {
    margin-top: 24px;
    text-align: center;
  }

  &__text {
    margin-top: 12px;
    text-align: center;
  }
}

.projects-enter-active,
.projects-leave-active,
.view-enter-active,
.view-leave-active {
  transition:
    opacity 200ms ease-in-out,
    height 200ms ease-in-out;
}

.projects-enter-from,
.projects-leave-to,
.view-enter-from,
.view-leave-to {
  opacity: 0;
}

@include from-sm {
  .empty {
    flex-grow: 1;
  }
}

@media screen and (min-height: 670px) {
  .empty {
    padding-top: 24px;
    padding-bottom: 10vh;

    &__cat {
      max-width: 280px;
    }
  }
}

@include from-xl {
  .projects {
    flex-direction: row;
  }

  .empty {
    width: calc(100% - 92px);
  }

  .menu {
    padding: 0 12px;
    width: 415px;
    flex-direction: column;
    overflow: auto;
  }
}

@include theme-dark {
  .menu {
    @include base-scroll(var(--color-neutral-9), var(--color-green-normal));
    &__description {
      color: var(--color-neutral-6);
    }

    &__card {
      &:hover {
        border-color: var(--color-green-dark);
      }

      &.active {
        border-color: var(--color-green-normal);
      }
    }
  }

  .stack__item {
    border-color: var(--color-neutral-9);
  }

  .view__title {
    color: var(--color-green-normal);
  }
}
</style>
