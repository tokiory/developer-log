import { addServerHandler, createResolver, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@developer-log/url-meta",
  },
  async setup() {
    const resolver = createResolver(import.meta.url);

    addServerHandler({
      route: "/api/meta",
      method: "post",
      handler: resolver.resolve("runtime/server/api/meta.post.ts")
    });
  },
});
