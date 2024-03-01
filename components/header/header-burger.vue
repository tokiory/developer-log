<template>
  <button
    class="burger"
    aria-label="Burger button"
    @click="emit('update:modelValue', !modelValue)"
  >
    <Transition mode="out-in">
      <Icon
        v-if="modelValue"
        size="24"
        name="uil:align-center"
      />
      <Icon
        v-else
        size="24"
        name="uil:align-justify"
      />
    </Transition>
  </button>
</template>

<script lang="ts" setup>
interface HeaderBurgerProperties {
  modelValue: boolean;
}

defineProps<HeaderBurgerProperties>();
const emit = defineEmits<{"update:modelValue": [value: boolean]}>();
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: all ease-in 100ms;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
