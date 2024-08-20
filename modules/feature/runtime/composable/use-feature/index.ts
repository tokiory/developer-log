import { feature } from "~/modules/feature/data/feature";
import type { Features } from "~/modules/feature/types/feature.types";

export const useFeature = (feature: Features): boolean => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.public.feature[feature];
};

export const useFeatures = (): typeof feature => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.public.feature;
};
