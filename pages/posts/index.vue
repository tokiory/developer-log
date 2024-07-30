<template>
  <main
    class="posts"
  >
    <div class="posts__search">
      <AInput
        v-model.trim="search"
        class="posts__input"
        :placeholder="t('page.posts.searchPlaceholder')"
      />
      <ACheckbox
        id="notes-visible"
        v-model="isNotesVisible"
        class="posts__checkbox"
        :label="$t('page.posts.showNotes')"
      />
    </div>
    <div
      v-if="pending"
      class="posts__loading"
    >
      <Icon
        size="48"
        name="line-md:loading-twotone-loop"
      />
    </div>
    <FeedPosts
      v-else-if="filteredPosts?.size"
      :groups="filteredPosts"
      class="posts__list"
    />
    <div
      v-else
      class="posts__stub stub"
    >
      <NuxtImg
        class="stub__image"
        preload
        quality="100"
        width="280"
        height="220"
        src="/tokiory/cry.svg"
        format="webp"
      />
      <ATitle>{{ $t('page.posts.stubTitle') }}</ATitle>
      <AText>{{ $t('page.posts.stubInfo') }}</AText>
      <AText>{{ $t('page.posts.stubTryAgain') }}</AText>
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { PostDateGroups } from "@/types/posts";

const { t, getLocaleCookie } = useI18n();
const locale = getLocaleCookie() || "ru";
const url = useRequestURL();

useSeoMeta({
  ...useOpenGraph({
    title: `${t("title")}: ${t("page.posts.tabTitle")}`,
    image: {
      title: `${t("title")}: ${t("page.posts.tabTitle")}`,
      description: t("page.home.hero").split(".").slice(0, 2).join(".") + ".",
    },
    url,
    author: "Daniil Shilo (tokiory) <tokiory.personal@gmail.com>",
  }),
});

const route = useRoute();
const search = ref(route.query?.search as string ?? "");
const isNotesVisible = ref(true);

// Watch
watch(() => route.query?.search, (v) => {
  search.value = (v ?? "") as string;
});

const { data: posts, pending } = await useGroupPosts({ locale });
// const { data: posts, pending } = useAsyncData("posts", async () => {
//   const fields: Array<keyof PostItemContent> = [
//     "_id",
//     "_path",
//     "title",
//     "date",
//     "tags",
//     "description",
//     "keywords"
//   ];
//
//   // FIX: dir in "where" is temporary, 'cause `queryContent("posts")` doesn't work in production build 👺
//   const posts = await queryContent<PostItemContent>()
//     .where({
//       _draft: { $ne: true },
//       _dir: { $eq: "posts" },
//     })
//     .sort({ date: -1 })
//     .only(fields)
//     .find();
//
//   return groupPostsByDate(posts);
// });

const filteredPosts = computed(() => {
  const filteredPostsGroups: PostDateGroups = new Map();
  const loweredQuery = (search.value as string).toLowerCase();

  if (!posts.value) {
    return filteredPostsGroups;
  }

  if (search.value === "" && isNotesVisible.value) {
    return posts.value;
  }

  for (const date of posts.value.keys()) {
    const filteredPosts = (posts.value.get(date) ?? [])
      .filter(post => {
        return isNotesVisible.value ? post : !post.tags.includes("note");
      })
      .filter(post => {
        return post.title.toLowerCase().includes(loweredQuery)
          || post.description.toLowerCase().includes(loweredQuery)
          || post.tags.some(tag => tag.includes(loweredQuery.replace("#", "")))
          || post.keywords?.some(word => word.toLowerCase().includes(loweredQuery));
      });

    if (filteredPosts?.length) {
      filteredPostsGroups.set(date, filteredPosts);
    }
  }

  return filteredPostsGroups;
});
</script>

<style lang="scss" scoped>
.posts {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: calc(100vh - var(--size-header));

  &__search {
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
  }

  &__input {
    width: 100%;
  }

  &__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  &__list {
    margin-top: 18px;
  }
}

.stub {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-align: center;
}

@include from-xl {
  .posts__search {
    margin-left: 180px;
  }
}
</style>
