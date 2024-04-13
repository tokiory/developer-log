<template>
  <div class="post-content-code">
    <div class="post-content-code__nav">
      <AText
        secondary
        class="post-content-code__filename"
      >
        {{ path }}
      </AText>
      <button
        class="post-content-code__copy"
        :class="{active: copied}"
        aria-label="Copy"
        @click="copy"
      >
        <Icon name="uil:copy" />
      </button>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type BundledLanguage } from "shiki";

interface ProseCodeProperties {
  code: string;
  language: BundledLanguage;
  filename?: string;
  highlights?: number[];
  meta?: string;
}

const properties = defineProps<ProseCodeProperties>();
const copied = ref(false);
const path = computed(() => {
  if (properties.language as string === "output") {
    return "Output";
  }

  return properties.filename;
});

const copy = async () => {
  navigator.clipboard.writeText(properties.code.trim())
    .then(() => {
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 3000);
    })
    .catch(console.error);
};
</script>

<style lang="scss" scoped>
.post-content-code {
  position: relative;
  padding: 8px 12px;
  border-radius: 4px;
  background: var(--color-neutral-2);
  border: 1px solid var(--color-neutral-4);
  margin: 24px 0;

  &:deep(pre) {
    margin: 0;
    overflow: auto;
    @include base-scroll(transparent);
    padding-bottom: 8px;
  }

  &:deep(code) {
    font-family: 'JetBrains Mono', Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
    font-size: 14px;
    letter-spacing: 0.7px;
    display: flex;
    flex-direction: column;
    gap: 0.4em;
  }

  // Result styling
  &:has(+ &.language-output) {
    border-bottom: none;
    margin-bottom: 0;
    border-radius: 4px 4px 0 0;
  }

  & + &.language-output {
    margin-top: 0;
    border-radius: 0 0 4px 4px;
  }

  // Inner styling
  &__nav {
    border-bottom: 1px solid var(--color-neutral-4);
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    gap: 12px;
  }

  &__filename {
    opacity: 0.3;
    display: none;
  }

  &__copy {
    color: var(--color-neutral-6);
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 8px;

    &:hover {
      color: var(--color-neutral-8);
    }

    &.active {
      color: var(--color-red-dark);
    }
  }

}

@include from-sm {
  .post-content-code__copy {
    display: block;
  }
}

@include from-md {
  .post-content-code__nav {
    border: none;
    position: absolute;
    top: 0;
    right: 0;
  }
}

@include theme-dark {
  .post-content-code {
    background: var(--color-neutral-10);
    border: 1px solid var(--color-neutral-9);

    &:deep(pre) {
      @include base-scroll(transparent, var(--color-green-normal));
    }

    &__nav {
      border-bottom-color: var(--color-neutral-9);
    }

    &__copy {
      color: var(--color-neutral-9);

      &:hover {
        color: var(--color-neutral-8);
      }

      &.active {
        color: var(--color-green-dark);
      }
    }
  }
}
</style>
