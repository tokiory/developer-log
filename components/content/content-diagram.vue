<template>
  <div
    v-if="error === null"
    class="diagram"
    :class="{pending}"
  >
    <Transition
      mode="out-in"
      name="diagram"
    >
      <div
        v-if="pending"
        class="diagram__stub"
      >
        <ALoader
          size="32"
          class="diagram__loader"
        />
      </div>
      <div
        v-else-if="scheme"
        :style="diagramStyle"
        class="diagram__content"
        role="button"
        tabindex="0"
        @click="showZoomPreview"
        @keydown.enter="showZoomPreview"
        v-html="scheme"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface ContentSchemeProperties {
  src: string;
  maxWidth?: string;
}

const properties = withDefaults(defineProps<ContentSchemeProperties>(), {
  maxWidth: "100%",
});
const requestURL = useRequestURL();
const diagramZoom = useZoom();

// TODO: Make a composable with all features
const hasZoomFeature = useFeature("DIAGRAM_ZOOM");

const { pending, data: scheme, error } = await useLazyAsyncData<string>(`${requestURL.pathname}-${properties.src}`, async () => {
  // eslint-disable-next-line compat/compat
  const absoluteURL = new URL(properties.src, requestURL);
  const response = await $fetch<Blob>(absoluteURL.href);
  return response.text();
}, {
  server: false,
});

const showZoomPreview = (event: PointerEvent) => {
  if (!hasZoomFeature)
    return;

  if (event.pointerType !== "mouse")
    return;

  diagramZoom.show("diagram", scheme.value!);
};

const diagramStyle = computed(() => {
  return {
    maxWidth: properties.maxWidth,
  };
});
</script>

<style scoped lang="scss">
.diagram {
  width: 100%;
  margin: 24px 0;
  padding: 12px;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: border-color 500ms ease-in-out;

  &.pending {
    border-color: var(--color-neutral-5);
  }

  &__stub {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  }

  &__loader {
    height: fit-content;
  }

  &__content {
    margin: 0 auto;

    &:deep(svg) {
      width: 100%;
      height: fit-content;
      font-family: "Virgil", 'Montserrat Variable', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    }
  }
}

.diagram-enter-active,
.diagram-leave-active {
  transition: opacity 0.5s ease-in-out, height 500ms ease-in-out;
}

.diagram-enter-from,
.diagram-leave-to {
  opacity: 0;
}

@include theme-dark {
  .diagram {

    &.pending {
      border-color: var(--color-neutral-8);
    }

    &__content {
      filter: invert(1);
    }
  }
}
</style>
