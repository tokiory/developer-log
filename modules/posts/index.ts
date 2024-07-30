import { addImportsDir, createResolver, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@developer-log/posts"
  },
  async setup() {
    const resolver = createResolver(import.meta.url);

    // Composables
    addImportsDir(resolver.resolve("runtime/composables"));
  }
});
