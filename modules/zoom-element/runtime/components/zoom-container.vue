<template>
  <div>
    <slot />
    <ZoomModal />
  </div>
</template>

<script setup lang="ts">
import ZoomModal from "~/modules/zoom-element/runtime/components/zoom-modal";
</script>

