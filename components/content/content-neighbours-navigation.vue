<template>
  <div
    class="neighbours"
  >
    <ALink
      v-if="neighbours[0]"
      external
      class="neighbours__link"
      :href="localePath(neighbours[0]._path)"
    >
      <AButton
        class="neighbours__button"
        theme="tertiary"
        @click="onNeighbourButtonClick"
      >
        <div class="neighbours__navigation">
          <Icon
            class="neighbours__icon"
            name="uil:angle-left-b"
          />
          <AText>
            {{ $t("page.post.neighbours.previous") }}
          </AText>
        </div>
        <AText
          secondary
          class="neighbours__title neighbours__title_left"
        >
          {{ neighbours[0]?.title }}
        </AText>
      </AButton>
    </ALink>
    <ALink
      v-if="neighbours[1]"
      external
      class="neighbours__link neighbours__link_right"
      :href="localePath(neighbours[1]._path)"
    >
      <AButton
        class="neighbours__button"
        theme="tertiary"
        @click="onNeighbourButtonClick"
      >
        <div class="neighbours__navigation">
          <AText class="neighbours__text">
            {{ $t("page.post.neighbours.next") }}
          </AText>
          <Icon
            class="neighbours__icon"
            name="uil:angle-right-b"
          />
        </div>
        <AText
          secondary
          class="neighbours__title neighbours__title_right"
        >
          {{ neighbours[1]?.title }}
        </AText>
      </AButton>
    </ALink>
  </div>
</template>

<script lang="ts" setup>
import { useLocalePath } from "#i18n";

interface NeighboursNavigationProperties {
  url: string;
}

const localePath = useLocalePath();
const properties = defineProps<NeighboursNavigationProperties>();

const query = queryContent()
  .where({
    _draft: { $ne: true },
  })
  .sort({ date: -1 })
  .only([ "_path", "title" ]);

const { data: neighbours } = await useAsyncData(() => {
  return query.findSurround(properties.url);
});

const onNeighbourButtonClick = () => {
  scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style lang="scss" scoped>
.neighbours {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @include from-md {
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  &__link {
    width: 100%;
    color: var(--color-neutral-13);

    @include theme-dark {
      color: var(--color-neutral-3);
    }

    @include from-md {
      width: fit-content;
      &_right {
        margin-left: auto;
      }
    }
  }

  &__button {
    width: 100%;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;

    @include from-md {
      align-items: flex-start;
      width: fit-content;
    }
  }

  &__navigation {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__title {
    @include from-md {
      text-align: left;
      &_left {
        margin-left: auto;
      }

      &_right {
        margin-right: auto;
      }
    }
  }
}
</style>
