import { addComponentsDir, createResolver, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  defaults: {},
  meta: {
    title: "@developer-log/uikit",
    configKey: "uikit",
  },
  async setup() {
    const resolver = createResolver(import.meta.url);
    await addComponentsDir({
      path: resolver.resolve("runtime/components")
    });
  }
});
