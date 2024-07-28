<template>
  <div
    v-if="diagram"
    class="image-zoom"
    role="button"
    tabindex="0"
    @click="hide"
    @keydown.esc="hide"
  >
    <div
      v-if="diagram.type === 'diagram'"
      ref="objectReference"
      class="image-zoom__object"
      :class="{active: scaleModifier === MAX_ZOOM}"
      role="button"
      tabindex="0"
      aria-label="Zoom of the diagram"
      @keydown.enter="zoomToggle"
      @keydown.esc="hide"
      @click.stop="zoomToggle"
      @click.right.prevent="hide"
      v-html="diagram.value"
    />

    <img
      v-else
      ref="objectReference"
      :class="{active: scaleModifier === MAX_ZOOM}"
      class="image-zoom__img"
      role="button"
      tabindex="0"
      aria-label="Zoom of the image"
      :src="diagram.value"
      alt="Zoom of the image"
      loading="lazy"
      @keydown.enter="zoomToggle"
      @keydown.esc="hide"
      @click.stop="zoomToggle"
      @click.right.prevent="hide"
    >

    <div
      class="image-zoom__control"
    >
      <AText
        secondary
        bold
        class="image-zoom__text"
      >
        LMB: Zoom;
        RMB: Close
      </AText>
      <AText
        secondary
        bold
        class="image-zoom__text"
      >
        Zoom: x{{ scaleModifier }}
      </AText>
    </div>
  </div>
</template>

<script lang="ts" setup>
const objectReference = ref<HTMLObjectElement>();
const zoom = useZoom();
const scrollLock = useScrollLock();
const mousemoveNavigation = useMousemoveNavigation(objectReference);
const diagram = zoom.content;
const scaleModifier = ref(1);

const MAX_ZOOM = 3;

const zoomToggle = () => {
  mousemoveNavigation.toggle(true);

  if (scaleModifier.value < MAX_ZOOM) {
    scaleModifier.value++;
  } else {
    mousemoveNavigation.resetPosition();
    scaleModifier.value = 1;
  }
};

const hide = () => {
  zoom.hide();
  scaleModifier.value = 1;
  mousemoveNavigation.toggle(false);
};

watch(diagram, diagram => {
  if (diagram !== null) {
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  overflow: hidden;
  inset: 0;
  padding: 18px;
  @include zi(zoom-image);

  &__object, &__img {
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


  &__object {
    &:deep(svg) {
      width: 100%;
      max-height: calc(100vh - 32px);
      font-family: "Virgil", 'Montserrat Variable', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    }
  }

  &__control {
    z-index: 2000;
    position: absolute;
    bottom: 32px;
    right: 32px;
    margin-top: 24px;
  }

  &__text {
    color: black;
    mix-blend-mode: color-burn;
  }

}

@include theme-dark {
  .image-zoom {
    background: rgba(0, 0, 0, 0.5);

    &__text {
        color: white;
    }

    &__object {
      filter: invert(1);
    }
  }
}
</style>
