<template>
  <div
    v-if="modelValue"
    class="menu"
  >
    <ul class="menu__list">
      <li
        v-for="item in nav"
        :key="item"
        class="menu__item item"
      >
        <NuxtLink
          :to="item.url"
          class="item__link"
          @click="$emit('update:modelValue', false)"
        >
          <ATitle
            class="item__title"
            level="3"
          >
            {{ $t(item.name) }}
          </ATitle>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import nav from "@/data/navigation";
import type { Navigation } from "@/types/navigation";


interface HeaderMenuProperties {
  navigation: Navigation;
  modelValue: boolean;
}

const properties = defineProps<HeaderMenuProperties>();
defineEmits<{"update:modelValue": [value: boolean]}>();
const scrollLock = useScrollLock();

watch(() => properties.modelValue, () => {
  if (properties.modelValue) {
    scrollLock.lock();
  } else {
    scrollLock.unlock();
  }
});

onUnmounted(scrollLock.unlock);
</script>

<style lang="scss" scoped>
.menu {
  @include zi(header-menu);
  padding: 32px 24px;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
