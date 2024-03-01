<template>
  <ul
    class="stack-list"
    :class="{grid: layout === 'row'}"
  >
    <li
      v-for="(item, idx) in list"
      :key="idx"
      class="stack-list__item"
    >
      <ProfessionalStackItem
        v-bind="item"
        class="stack-list__stack"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { ProfessionalStackContent } from "@/types/content";

interface ProfessionalStackProperties extends ProfessionalStackContent {
  layout?: "row" | "column";
}
withDefaults(defineProps<ProfessionalStackProperties>(), {
  layout: "row",
});
</script>

<style lang="scss" scoped>
.stack-list {
  display: flex;
  flex-direction: column;
  gap: 8px 12px;

  &__item {
    height: 100%;
  }
}

@include from-md {
  .stack-list.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
