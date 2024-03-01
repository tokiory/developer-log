<template>
  <ul
    :class="{grid: layout === 'row'}"
    class="technologies-list"
  >
    <li
      v-for="(technology, idx) in list"
      :key="idx"
      class="technologies-list__item"
    >
      <TechnologiesStackItem
        v-bind="technology"
        class="technologies-list__technology"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { TechnologiesStackContent } from "@/types/content";

interface TechnologiesStackProperties extends TechnologiesStackContent {
  layout?: "row" | "column";
}

withDefaults(defineProps<TechnologiesStackProperties>(), {
  layout: "row",
});
</script>

<style lang="scss" scoped>
.technologies-list {
  display: flex;
  flex-direction: column;
  gap: 12px 20px;
}

@include from-md {
  .technologies-list.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
