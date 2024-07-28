import { addServerHandler, createResolver, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@developer-log/rss",
  },
  setup() {
    const resolver = createResolver(import.meta.url);
    addServerHandler({
      route: "/rss.xml",
      handler: resolver.resolve("runtime/server/routes/rss.get.ts"),
    });
  },
});
