<template>
  <div class="page-wrapper">
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.page-wrapper {
  padding: 32px;
  min-height: calc(100vh - var(--size-header));
}
</style>
