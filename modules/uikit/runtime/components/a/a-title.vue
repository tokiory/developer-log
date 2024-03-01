<template>
  <div
    :style="styles"
    class="title"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Properties as CSS } from "csstype";

interface TitleProperties {
  level?: "1" | "2" | "3";
  fz?: string;
  wght?: string;
}

const properties = defineProps<TitleProperties>();

const preset: Record<NonNullable<TitleProperties["level"]>, CSS> = {
  1: {
    fontSize: "var(--fz-title-h1)",
    fontWeight: "800",
  },
  2: {
    fontSize: "var(--fz-title-h2)",
    fontWeight: "700",
  },
  3: {
    fontSize: "var(--fz-title-h3)",
    fontWeight: "600",
  }
};

const styles = computed(() => {
  if (properties.level) {
    return preset[properties.level];
  } else if (properties.fz) {
    return {
      fontSize: properties.fz,
      fontWeight: properties.wght,
    };
  } else {
    return preset["1"];
  }
});
</script>

<style lang="scss" scoped>
.title {
  line-height: 130%;
  scroll-margin: 96px;
}
</style>
