<template>
  <NuxtLink
    class="post-content-link"
    :href="href"
    target="_blank"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
interface ProseAProperties {
  href: string;
}

defineProps<ProseAProperties>();
</script>

<style lang="scss" scoped>
.post-content-link {
  color: var(--color-red-normal);

  &:hover {
    color: var(--color-red-normal-hover);
  }
}

@include theme-dark {
  .post-content-link {
    color: var(--color-green-normal);

    &:hover {
      color: var(--color-green-normal-hover);
    }
  }
}
</style>
