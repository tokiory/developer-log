<template>
  <div
    class="zoom-element-wrapper"
    role="button"
    aria-description="zoom wrapper"
    tabindex="0"
    @keydown.enter="onZoomWrapperClick"
    @click="onZoomWrapperClick"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useZoom } from "~/modules/zoom-element/runtime/composables/use-zoom";

interface ZoomElementProperties {
  src: string;
}

const properties = defineProps<ZoomElementProperties>();

const onZoomWrapperClick = () => {
  zoomControl.show(properties.src);
};

const zoomControl = useZoom();
</script>
