<template>
  <NuxtImg
    :src="fullpath"
    :alt="alt"
    format="webp"
    lazy
    class="post-content-image"
    @click="showZoomPreview"
  />
</template>

<script setup lang="ts">
interface ProseImgProperties {
  src: string;
  alt: string;
}

const properties = defineProps<ProseImgProperties>();
const requestURL = useRequestURL();
const imageZoom = useZoom();
const { IMG_ZOOM: isZoomFeatureEnabled } = useFeatures();

const fullpath = computed(() => {
  // eslint-disable-next-line compat/compat
  return new URL(properties.src, requestURL).href;
});

const showZoomPreview = () => {
  isZoomFeatureEnabled && imageZoom.show("image", fullpath.value) ;
};
</script>

<style lang="scss" scoped>
.post-content-image {
  display: block;
  margin: 24px auto;
  width: fit-content;
  max-width: 100%;
  object-fit: cover;
  border: 1px solid var(--color-neutral-4);
  border-radius: 6px;
  overflow: hidden;
}

@include theme-dark {
  .post-content-image {
    border-color: var(--color-neutral-9);
  }
}
</style>
