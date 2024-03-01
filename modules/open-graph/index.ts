import type { Configuration } from "@/modules/open-graph/types/configuration.types";

import { addImportsDir, addServerHandler, createResolver, defineNuxtModule } from "@nuxt/kit";
import defu from "defu";

const configKey = "openGraph";

// eslint-disable-next-line compat/compat
const url = new URL(`http://localhost:${process.env.PORT ?? "8100"}`);

export default defineNuxtModule<Configuration>({
  meta: {
    title: "@developer-log/open-graph",
    configKey,
  },
  defaults: {
    title: "",
    description: "",
    url,
    author: "",
    image: {
      title: "",
      description: "",
    },
  },
  setup(config, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Add module options to the runtimeConfig
    nuxt.options.runtimeConfig.public[configKey] = defu(nuxt.options.runtimeConfig.public[configKey] as Configuration, {
      ...config,
    });

    // Add composable
    addImportsDir(resolver.resolve("runtime/composable"));

    // Add server route
    addServerHandler({
      route: "/api/og",
      handler: resolver.resolve("runtime/server/api/og.get.ts")
    });
  }
});
