<template>
  <main class="home">
    <section class="home__content content">
      <ATitle class="content__title">
        {{ $t('page.home.title') }}
      </ATitle>
      <div class="content__subtitle subtitle">
        <Icon
          size="24"
          name="uil:document-layout-left"
          class="subtitle__icon"
        />
        <AText class="subtitle__text">
          {{ $t('page.home.description') }}
        </AText>
      </div>
      <AText class="content__text">
        {{ $t('page.home.hero') }}
      </AText>
      <NuxtLink
        :href="social!.telegram"
        target="_blank"
        class="content__link"
      >
        <AButton
          theme="primary"
          class="content__telegram"
        >
          {{ $t('page.home.telegramButton') }}
        </AButton>
      </NuxtLink>
      <div class="content__posts posts">
        <ATitle level="2">
          {{ $t('page.home.subtitle') }}
        </ATitle>
        <RecentPosts
          class="posts__list"
          :posts="posts ?? []"
        />
      </div>
    </section>
    <section class="home__waterfall waterfall">
      <WaterfallPattern
        class="waterfall__item"
        theme="circle"
      />
      <WaterfallPattern
        class="waterfall__item"
        theme="lava"
      />
      <WaterfallPattern
        class="waterfall__item"
        theme="line"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { social } from "@/data/content";

import type { PostItemContent } from "~/types/content";

const { t } = useI18n();

const url = useRequestURL();

useSeoMeta({
  ...useOpenGraph({
    title: t("title"),
    image: {
      title: `${t("title")}: ${t("page.home.tabTitle")}`,
      description: t("page.home.hero").split(".").slice(0, 2).join(".") + ".",
    },
    url,
    author: "Daniil Shilo (tokiory) <tokiory.personal@gmail.com>",
  }),
});

const { data: posts } = useAsyncData<PostItemContent[]>(async () => {
  const fields: Array<keyof PostItemContent> = [
    "_id",
    "_path",
    "title",
    "date",
    "tags",
    "description",
  ];

  const posts = await queryContent<PostItemContent>()
    .where({
      _draft: { $ne: true },
      _dir: { $eq: "posts" },
    })
    .only(fields)
    .find();
  posts.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });
  return posts.slice(0, 5).map(item => {
    return {
      ...item,
      tags: item.tags.slice(0, 2)
    };
  });
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  min-height: calc(100vh - var(--size-header));
}

.content {
  @include spacing-content;
  flex-grow: 1;

  &__title {
    font-size: 32px;
    font-weight: 800;
  }

  &__subtitle {
    margin-top: 12px;
  }

  &__text,
  &__telegram,
  &__posts {
    margin-top: 32px;
  }
}

.subtitle {
  display: flex;
  gap: 12px;

  &__icon {
    flex-shrink: 0;
  }

  &__text {
    display: flex;
    align-items: center;
  }
}

.posts {
  &__list {
    margin-top: 24px;
  }
}

.waterfall {
  display: none;
  align-items: center;

  &__item {
    width: 200px;
  }
}

@include from-md {
  .content__title {
      font-size: 48px !important;
  }
}

@include from-xl {
  .waterfall {
    display: flex;
  }
}

@include from-xxl {
  .content__title {
    font-size: 72px !important;
  }

  .waterfall__item {
    width: 250px;
  }
}
</style>
