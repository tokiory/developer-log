<template>
  <div
    v-if="url"
    class="image-zoom"
    role="button"
    tabindex="0"
    @click="hide"
    @keydown.esc="hide"
  >
    <img
      ref="objectReference"
      :class="{active: scaleModifier === 2}"
      class="image-zoom__img"
      role="button"
      tabindex="0"
      aria-label="Zoom of the image"
      :src="url"
      alt="Zoom of the image"
      loading="lazy"
      @keydown.enter="zoomIn"
      @keydown.esc="zoomOut"
      @click.stop="zoomIn"
      @click.right.prevent="zoomOut"
    >
  </div>
</template>

<script lang="ts" setup>
const objectReference = ref<HTMLObjectElement>();
const imageZoom = useImageZoom();
const scrollLock = useScrollLock();
const mousemoveNavigation = useMousemoveNavigation(objectReference);
const url = imageZoom.zoomItem();
const scaleModifier = ref(1);

const MAX_ZOOM = 2;

const zoomIn = () => {
  mousemoveNavigation.toggle(true);

  if (scaleModifier.value < MAX_ZOOM) {
    scaleModifier.value++;
  }
};

const zoomOut = () => {
  if (scaleModifier.value === 1)
    imageZoom.hide();

  if (scaleModifier.value > 1)
    scaleModifier.value--;

  if (scaleModifier.value === 1)
    mousemoveNavigation.toggle(false);
};

const hide = () => {
  imageZoom.hide();
  scaleModifier.value = 1;
};

watch(url, url => {
  if (url !== null) {
    scrollLock.lock();
    return;
  }

  scrollLock.unlock();
});

watch(scaleModifier, modifier => {
  if (objectReference.value) {
    objectReference.value.style.scale = modifier.toString();
  }

  if (modifier > 1) {
    mousemoveNavigation.reload();
  }
});
</script>

<style lang="scss" scoped>
.image-zoom {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  overflow: hidden;
  inset: 0;
  padding: 18px;
  @include zi(zoom-image);


  &__img {
    transition: all 200ms ease-out;
    border-radius: 6px;
    width: 100%;
    user-select: none;
    cursor: zoom-in;
    transform-origin: center;

    &.active {
      cursor: zoom-out;
    }
  }
}

@include theme-dark {
  .image-zoom {
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
