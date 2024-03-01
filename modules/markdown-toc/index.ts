import { addServerPlugin, createResolver, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@developer-log/markdown-toc",
  },
  async setup() {
    const resolver = createResolver(import.meta.url);
    addServerPlugin(
      resolver.resolve("runtime/server/plugins/markdown-toc.ts"),
    );
  }
});
