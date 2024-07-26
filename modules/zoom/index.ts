import { addComponentsDir, addImportsDir, createResolver, defineNuxtModule } from "@nuxt/kit";
export default defineNuxtModule({
  meta: {
    name: "@developer-log/zoom",
  },
  async setup() {
    const resolver = createResolver(import.meta.url);

    // Add components
    await addComponentsDir({
      path: resolver.resolve("./runtime/components"),
    });

    // Add composable
    addImportsDir(resolver.resolve("./runtime/composables"));

  },
});
