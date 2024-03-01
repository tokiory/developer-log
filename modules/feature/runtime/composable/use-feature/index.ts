import type { Features } from "~/modules/feature/types/feature.types";

export const useFeature = (feature: Features): boolean => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.public.features[feature];
};
