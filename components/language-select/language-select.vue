<template>
  <div
    ref="languageSelectReference"
    class="language-select"
  >
    <div class="language-select__wrapper">
      <div
        class="language-select__current"
        :class="{active}"
        role="menu"
        tabindex="0"
        @keydown.enter="active = !active"
        @click="active = !active"
      >
        <Icon
          size="24"
          :name="`circle-flags:${languageFlag[locale]}`"
        />
      </div>

      <div
        class="language-select__options"
        :class="{active}"
      >
        <div
          v-for="item in otherLanguages as Language[]"
          :key="item"
          role="menuitem"
          :lang="item"
          tabindex="0"
          class="language-select__option"
          @keydown.enter="selectLanguage(item)"
          @click="selectLanguage(item)"
        >
          <Icon
            size="24"
            :name="`circle-flags:${languageFlag[item]}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import languageFlag from "@/data/language-flag";

import type { LocaleObject } from "vue-i18n-routing";

type Language = keyof typeof languageFlag;

const { locale, setLocale, locales } = useI18n();

/**
 * Select current language
 * @param language
 */
const selectLanguage = (language: Language) => {
  setLocale(language);
  active.value = false;
};

const otherLanguages = computed(() => {
  return (locales.value as LocaleObject[])
    .filter(item => item.code !== locale.value)
    .map(item => item.code);
});

const languageSelectReference = ref<HTMLDivElement>();
const active = ref(false);


const handleOutsideClick = (event: MouseEvent) => {
  if (!languageSelectReference.value) {
    return;
  }

  if (
    !(event.target === languageSelectReference.value
      || languageSelectReference.value.contains(event.target as Node))
  ) {
    active.value = false;
  }
};

onMounted(() => {
  document.body.addEventListener("click",  handleOutsideClick);
});

onUnmounted(() => {
  document.body.removeEventListener("click",  handleOutsideClick);
});
</script>

<style lang="scss" scoped>
.language-select {
  &__wrapper {
    position: relative;
  }


  &__current,
  &__option {
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
  }

  &__current {
    @include base-transition;
    opacity: .4;

    &.active,
    &:hover {
      opacity: 1;
    }
  }

  &__options {
    display: none;
    padding: 12px;
    background: var(--color-neutral-2);
    border: 1px solid var(--color-neutral-4);
    border-radius: 4px;
    flex-direction: column;
    gap: 24px;
    position: absolute;
    bottom: 48px;
    left: -14px;

    &.active {
      display: flex;
    }
  }
}

@include theme-dark {
  .language-select__options {
    background: var(--color-neutral-9);
    border: 1px solid var(--color-neutral-8);
  }
}
</style>
