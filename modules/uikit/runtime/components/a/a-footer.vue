<template>
  <footer class="footer">
    <ALink
      :href="social.boosty"
      target="_blank"
      aria-label="Donate"
      class="footer__donate donate"
    >
      <Icon
        size="32"
        name="fluent-emoji:money-with-wings"
      />
    </ALink>
    <div class="footer__description">
      <AText>
        Collab by
        <ALink
          color
          aria-label="tokiory"
          :href="social.collab.tokiory"
        >
          tokiory
        </ALink>
        x
        <ALink
          color
          aria-label="awamishi"
          :href="social.collab.awamishi"
        >
          awamishi
        </ALink>
      </AText>
      <nav class="footer__social social">
        <ul class="social__list">
          <li class="social__item">
            <ALink
              :to="localePath({path: '/license'})"
              :aria-label="$t('page.license.title')"
              color
              class="social__link"
            >
              {{ $t('page.license.title') }}
            </ALink>
          </li>
          <li class="social__item">
            <ALink
              :to="localePath({path: '/privacy'})"
              :aria-label="$t('page.privacy.title')"
              color
              class="social__link"
            >
              {{ $t('page.privacy.title') }}
            </ALink>
          </li>
          <li class="social__item">
            <ALink
              external
              to="/rss"
              color
              class="social__link"
            >
              RSS
            </ALink>
          </li>
        </ul>
      </nav>
    </div>
    <LanguageSelect
      class="footer__language"
    />
  </footer>
</template>

<script setup lang="ts">
import social from "@/data/content/social";
const localePath = useLocalePath();
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.87);
  border-top: 1px solid var(--color-neutral-4);
  backdrop-filter: blur(10px);
  @include spacing-layout;

  &__description {
    display: flex;
    flex-direction: column;
    place-items: center;
    gap: 12px;
  }
}

.donate {
  cursor: pointer;
}

.social {
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;

  }
}

@include from-sm {
  .social__list {
    gap: 64px;
  }
}

@include from-md {
  .footer {
    flex-direction: row;
  }
}

@include theme-dark {
  .footer {
    background: rgba(51, 51, 51, 0.87);
    border-top: 1px solid var(--color-neutral-9);
  }
}
</style>
