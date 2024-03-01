<template>
  <main class="author">
    <section class="author__content content">
      <ATitle class="content__title title">
        {{ $t('page.author.hello') }}
        <NuxtImg
          class="title__image"
          src="/tokiory/color.svg"
        />
      </ATitle>
      <div class="content__description description">
        <AText class="description__text">
          {{ $t('page.author.me') }}
        </AText>
        <AText class="description__text">
          {{ $t('page.author.role') }}
        </AText>
        <AText class="description__text">
          {{ $t('page.author.pursuit') }}
        </AText>
      </div>
      <LazyProfessionalStack
        v-bind="professionalStackContent"
        layout="row"
        class="content__professional"
      />
      <LazyTechnologiesStack
        class="content__tech"
        v-bind="technologiesStackContent"
      />
    </section>
    <section class="author__waterfall waterfall">
      <WaterfallPattern
        class="waterfall__item"
        theme="heartbeat"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import {
  professionalStack as professionalStackContent,
  technologiesStack as technologiesStackContent
} from "@/data/content";

const { t } = useI18n();
const url = useRequestURL();

useSeoMeta({
  ...useOpenGraph({
    title: `${t("title")}: ${t("page.author.tabTitle")}`,
    image: {
      title: `${t("title")}: ${t("page.author.tabTitle")}`,
      description: t("page.home.hero").split(".").slice(0, 2).join(".") + ".",
    },
    url,
    author: "Daniil Shilo (tokiory) <tokiory.personal@gmail.com>",
  }),
});
</script>

<style lang="scss" scoped>
.author {
  display: flex;
  min-height: calc(100vh - var(--size-header));
}

.content {
  @include spacing-content;

  &__professional,
  &__tech {
    @include spacing-adaptive(top, 24px);
  }
}

.title {
  color: var(--color-red-dark);
  &__image {
    height: 24px;
  }
}

.description {
  margin-top: 20px;

  &__text:not(:first-child) {
    margin-top: 24px;
  }
}

.waterfall {
  display: none;
  align-items: center;

  &__item {
    width: 300px;
  }
}

@include from-md {
  .content {
    &__professional,
    &__tech {
      max-width: 1064px;
      width: 100%;
    }
  }
}

@include from-xl {
  .waterfall {
    display: flex;
  }
}

@include from-xxl {
  .waterfall__item {
    width: 480px;
  }
}

@include theme-dark {
  .title {
    color: var(--color-green-dark);
  }
}
</style>
