import type { VNode } from "vue";

export interface TabOption {
  key: string;
  value: VNode | string;
}

export const useTabSelect = <K extends string>(options: Record<K, TabOption["value"]>) => {
  const tabOptions = computed(() => Object.entries(options).map(([ key, value ]) => {
    return { key: key as K, value: value as TabOption["value"] };
  }));
  const currentTab = ref<K>(tabOptions.value[0].key);

  return {
    currentTab,
    options: tabOptions,
  };
};
