<template>
  <div
    v-if="model"
    class="banner"
  >
    <ACard class="banner__wrapper">
      <div class="banner__description description">
        <AText class="description__text">
          {{ $t('cookie.title').concat(' ') }}
        </AText>
        <AText class="description__text">
          {{ $t('cookie.description') }}
        </AText>
      </div>
      <AButton
        class="banner__button"
        @click="handleAccept"
      >
        {{ $t('dialog.accept') }}
      </AButton>
    </ACard>
  </div>
</template>

<script lang="ts" setup>
import localStorageKey from "@/data/local-storage-key";

const model = defineModel<boolean>();
const cookie = useLocalStorageState<boolean>(localStorageKey.cookie);

const handleAccept = () => {
  cookie.value = true;
  model.value = false;
};
</script>

<style lang="scss" scoped>
.banner {
  position: fixed;
  bottom: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 16px;
  right: 16px;

  &__wrapper {
    max-width: 1388px;
    width: 100%;
    background: var(--color-neutral-2);
    border-color: var(--color-red-normal-active);
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
  }

  &__button {
    width: 100%;
  }
}

.description {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__text {
    display: inline;
  }
}

@include from-xl {
  .description {
    display: block;
  }

  .banner {
    left: 2vw;
    right: 2vw;

    &__wrapper {
      flex-direction: row;
    }

    &__button {
      width: fit-content;
    }
  }
}

//@at-root body[data-theme=dark] {
//  .banner__wrapper {
//    background: var(--color-neutral-10);
//    border-color: var(--color-green-normal-active);
//  }
//}

@include theme-dark {
  .banner__wrapper {
    background: var(--color-neutral-10);
    border-color: var(--color-green-normal-active);
  }
}
</style>
