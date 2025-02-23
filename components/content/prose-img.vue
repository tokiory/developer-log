<template>
  <NuxtImg
    :src="fullpath"
    :alt="alt"
    format="webp"
    lazy
    tabindex="0"
    class="post-content-image"
    @click="showZoomPreview"
    @focus="isFocused = true"
    @blur="isFocused = false"
    @keyup.space="handleSpaceKeyDown"
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
  if (isZoomFeatureEnabled) {
    imageZoom.show("image", fullpath.value);
    isZoomed.value = true;
  }
};

const hideZoomPreview = () => {
  if (isZoomFeatureEnabled) {
    imageZoom.hide();
    isZoomed.value = false;
  }
};

// opening img by space key
const isFocused = ref(false);
const isZoomed = ref(false);

const disableSpaceScroll = (event: KeyboardEvent) => {
  if (event.code === "Space") {
    event.preventDefault();
  }
};

watch(isFocused, () => {
  if (isFocused.value) {
    document.addEventListener("keydown", disableSpaceScroll);
    return;
  }
  document.removeEventListener("keydown", disableSpaceScroll);
});

const handleSpaceKeyDown = () => {
  if (isZoomed.value) {
    hideZoomPreview();
    return;
  }
  showZoomPreview();
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
