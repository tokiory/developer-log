import type { NuxtConfig } from "nuxt/config";
import { defineNuxtConfig } from "nuxt/config";

const locales = [ "en", "ru", "ko", "be", "kk" ];

const alias: NuxtConfig["alias"] = {
  "@t": "./types",
  "@style": "./styles",
  "@l": "./localization",
};

const app: NuxtConfig["app"] = {
  pageTransition: { name: "page", mode: "out-in" },
  head: {
    title: "Лог разработчика",
    // eslint-disable-next-line unicorn/text-encoding-identifier-case
    charset: "utf-8",
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
      },
      {
        rel: "manifest",
        href: "/favicon/site.webmanifest",
      },
      {
        rel: "mask-icon",
        href: "/favicon/safari-pinned-tab.svg",
        color: "#ee5899",
      },
      {
        rel: "shortcut icon",
        href: "/favicon/favicon.ico",
      },
    ],
    meta: [
      {
        name: "msapplication-TileColor",
        content: "#ee5899",
      },
      {
        name: "msapplication-Config",
        content: "/favicon/browserconfig.xml",
      },
      {
        name: "theme-color",
        content: "#fdeef5",
      }
    ]
  }
};

const modules: NuxtConfig["modules"] = [
  "@nuxt/content",
  "@nuxt/devtools",
  "@nuxt/image",
  "@nuxtjs/i18n",
  "@nuxtjs/sitemap",
  "nuxt-icon",
];

const image: NuxtConfig["image"] = {
  presets: {
    stack: {
      modifiers: {
        format: "webp",
        width: 44,
        fit: "outside",
      }
    }
  }
};

const i18n: NuxtConfig["i18n"] = {
  locales: locales.map(item => ({ code: item, iso: item, file: `${item}.ts` })),
  experimental: {
    jsTsFormatResource: true,
  },
  defaultLocale: "ru",
  langDir: "localization",
  lazy: true,
  strategy: "prefix_except_default",
  detectBrowserLanguage: {
    useCookie: true,
  },
};

const vite: NuxtConfig["vite"] = {
  vue: {
    script: {
      defineModel: true,
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          "@/styles/prebuild/index"
        ].map(item => `@import "${item}";`).join(""),
      }
    }
  }
};

const content: NuxtConfig["content"] = {
  locales,
  defaultLocale: "ru",
  experimental: {
    cacheContents: true,
  },
  highlight: {
    langs: [
      "typescript",
      "javascript",
      "go",
      "svelte",
      "bash",
      "html",
      "vue",
      "json",
      "rust",
      "lua",
      "yml",
      "docker",
      "dockerfile"
    ],
    theme: "min-dark"
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  markdown: {
    anchorLinks: {
      depth: 3
    },
  },
};

const feature: NuxtConfig["feature"] = {
  THEME_SWITCH: true,
  IMG_ZOOM: true,
  DIAGRAM_ZOOM: true,
  POST_NAVIGATION: true,
};

const runtimeConfig: NuxtConfig["runtimeConfig"] = {
  public: {
    locales,
    openGraph: {
      title: "Лог разработчика",
      description: "",
      image: {
        title: "",
        description: "",
      },
      author: "Daniil Shilo <tokiory.personal@gmail.com>",
    },
  }
};

export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: {
    enabled: false,
  },
  router: {
    options: {
      sensitive: false,
    },
  },
  css: [
    "normalize.css/normalize.css"
  ],
  devServer: {
    port: Number.parseInt(process.env.PORT ?? "8100"),
  },
  feature,
  app,
  modules,
  vite,
  alias,
  i18n,
  content,
  image,
  runtimeConfig,
});
