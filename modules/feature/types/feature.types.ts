import type { feature } from "@/modules/feature/data/feature";

export type Features = keyof typeof feature
export type FeatureOptions = Record<Features, boolean>;
