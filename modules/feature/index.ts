import { feature } from "./data/feature";
import type { FeatureOptions } from "./types/feature.types";

import { addImports, createResolver, defineNuxtModule } from "@nuxt/kit";
import defu from "defu";

const configKey = "feature";

export default defineNuxtModule<FeatureOptions>({
  meta: {
    name: "@developer-log/feature",
    configKey,
  },
  defaults: feature,
  setup(options, nuxt) {

    // Add module options to the runtimeConfig
    nuxt.options.runtimeConfig.public[configKey] = defu(nuxt.options.runtimeConfig.public[configKey] as FeatureOptions, options);

    // Add useFeature composable
    const resolver = createResolver(import.meta.url);

    addImports({
      name: "useFeature",
      from: resolver.resolve("runtime/composable/use-feature/index")
    });
  },
});
