<template>
  <header
    class="header"
    :class="{active: isHeaderMenuActive}"
  >
    <div class="header__wrapper">
      <ALink
        class="header__logo"
        aria-label="Logo"
        :to="localePath('/')"
      >
        <ALogo />
      </ALink>
      <nav class="header__navigation nav">
        <ul class="nav__list">
          <li
            v-for="item in navigation"
            :key="item"
            class="nav__item"
          >
            <ALink
              :to="localePath(item.url)"
              :aria-label="$t(item.name)"
              hover
              class="nav__link"
            >
              {{ capitalize($t(item.name)) }}
            </ALink>
          </li>
        </ul>
      </nav>
      <ul class="header__social social">
        <li
          v-for="item in social!.list"
          :key="item"
          class="social__item"
        >
          <ALink
            :to="item.url"
            hover
            :aria-label="item.name"
            target="_blank"
            class="social__link"
          >
            <Icon
              size="24"
              :name="item.icon"
            />
          </ALink>
        </li>
      </ul>
      <ThemeSwitcher
        v-if="hasThemeFeature"
        class="header__theme"
      />
      <HeaderBurger
        v-model="isHeaderMenuActive"
        class="header__burger"
      />
    </div>
    <HeaderMenu
      v-model="isHeaderMenuActive"
      :navigation="navigation"
    />
  </header>
</template>

<script setup lang="ts">
import { social } from "@/data/content";
import navigation from "@/data/navigation";

import { capitalize } from "vue";
const isHeaderMenuActive = ref(false);
const localePath = useLocalePath();
const hasThemeFeature = useFeature("THEME_SWITCH");
</script>

<style lang="scss" scoped>
.header {
  background: rgba(255, 255, 255, 0.87);
  border-bottom: 1px solid var(--color-neutral-4);
  backdrop-filter: blur(10px);
  position: sticky;
  overflow: hidden;
  top: 0;
  @include zi(header);
  @include spacing-layout;

  &.active {
    border: none;
    bottom: 0;
    height: 100vh;

    &::after {
      content: '';
      background-color: var(--color-red-normal);
      opacity: 0.35;
      mask-size: 380px;
      width: 380px;
      height: 296px;
      position: fixed;
      right: -100px;
      bottom: 0;
      mask-repeat: no-repeat;
      mask-image: url(/tokiory/outline.svg);
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
    position: relative;
  }

  &__logo {
    margin: 0 auto;
    width: 55px;
    height: 55px;
  }

  &__social {
    margin-left: auto;
  }

  &__theme,
  &__burger {
    cursor: pointer;
    color: inherit;
    position: absolute;
    background: none;
    border: none;
    padding: 8px;
    @include zi(header-control);
  }

  &__burger {
    right: 16px;
  }

  &__theme {
    left: 16px;
  }
}

.nav {
  display: none;
  align-items: center;

  &__list {
    display: flex;
    gap: 24px;
  }
}

.social {
  display: none;
  gap: 24px;
}

@include from-md {
  .social {
    display: flex;
  }

  .nav {
    display: flex;
    padding-left: 64px;
  }

  .header {
    &__logo {
      margin: initial;
    }

    &__burger {
      display: none;
    }

    &__theme {
      position: initial;
      margin-left: 32px;
    }
  }
}

@include from-xl {
  .nav {
    padding-left: 128px;
  }
}

@include theme-dark {
  .header {
    background: rgba(51, 51, 51, 0.87);
    border-bottom: 1px solid var(--color-neutral-9);

    &.active::after {
      background-color: var(--color-green-normal);
    }
  }
}
</style>
