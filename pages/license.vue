<template>
  <main class="license">
    <section class="license__support support">
      <LazyLicenseSupport
        class="support__card support__card_ts"
        :phrase="$t('page.license.phrase.work')"
        icon="/stack/typescript.svg"
      />
      <LazyLicenseSupport
        class="support__card support__card_playwright"
        :phrase="$t('page.license.phrase.test')"
        icon="/stack/playwright.svg"
      />
      <LazyLicenseSupport
        class="support__card support__card_vitest"
        :phrase="$t('page.license.phrase.test')"
        icon="/stack/vitest.svg"
      />
      <LazyLicenseSupport
        class="support__card support__card_github"
        :phrase="$t('page.license.phrase.store')"
        icon="/stack/github.svg"
      />
      <LazyLicenseSupport
        class="support__card support__card_vercel"
        :phrase="$t('page.license.phrase.host')"
        icon="/stack/vercel.svg"
      />
      <LazyLicenseSupport
        class="support__card support__card_nuxt"
        :phrase="$t('page.license.phrase.made')"
        icon="/stack/nuxt.svg"
      />
      <LazyLicenseSupport
        class="support__card support__card_jetbrains"
        :phrase="$t('page.license.phrase.thanks')"
        icon="/stack/jetbrains.svg"
      />
    </section>
    <section class="license__content content">
      <ATitle>{{ $t("page.license.title") }}</ATitle>
      <ul class="content__list">
        <li
          v-for="item in license"
          :key="item"
          class="content__item"
        >
          <AText class="content__text">
            {{ item.title }}
          </AText>
          <div class="content__source source">
            <AText class="source__text">
              {{ $t("page.license.source") }}:
            </AText>
            <ALink
              color
              class="source__link"
              :href="item.source"
              target="_blank"
            >
              {{ item.source }}
            </ALink>
          </div>
          <div class="content__ref ref">
            <AText class="ref__text">
              {{ $t("page.license.license") }}:
            </AText>
            <ALink
              class="ref__link"
              color
              :href="item.license"
              target="_blank"
            >
              {{ item.license }}
            </ALink>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import license from "@/data/content/license";
</script>

<style lang="scss" scoped>
.license {
  padding: 32px 16px;
  min-height: calc(100vh - var(--size-header));
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1600px;
  margin: auto;
}

.content {
  &__source,
  &__ref {
    display: flex;
    gap: 4px;
    margin-top: 4px;
    &__text {
      font-size: 14px;
    }
  }

  &__text {
    font-weight: 500;
  }

  &__list {
    list-style: disc;
    padding-left: 16px;
    margin-top: 16px;
  }

  &__item:not(:first-child) {
    margin-top: 12px;
  }
}

.ref,
.source {
  &__link {
    white-space: pre;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.support {
  display: none;

  $names: (ts, playwright, vitest, github, vercel, nuxt, jetbrains);
  &__card {
    @each $name in $names {
      &_#{$name} {
        grid-area: $name;
      }
    }
  }
}

@include from-md {
  .support {
    display: grid;

    grid-template-areas:
    "ts playwright vitest"
    "github github github"
    "vercel vercel vercel"
    "nuxt nuxt jetbrains";
    gap: 16px;
  }
}

@include from-xl {
  .license {
    gap: 64px;
    flex-direction: row;
  }

  .support,
  .content {
    max-width: calc(50% - 32px);
  }

  .support {
    position: sticky;
    top: calc(var(--size-header) + 32px);
    height: fit-content;
  }
}
</style>
