import type { SupportItemContent } from "@/types/content";

const support = {
  jetbrains: {
    text: "Thanks to",
    icon: "/stack/jetbrains.svg",
  },
  ava: {
    text: "Tested on",
    icon: "/stack/ava.svg",
  },
  playwright: {
    text: "Tested on",
    icon: "/stack/playwright.svg",
  },
  github: {
    text: "Stored on",
    icon: "/stack/github.svg",
  },
  vercel: {
    text: "Powered by",
    icon: "/stack/vercel.svg",
  },
  typescript: {
    text: "Built on",
    icon: "/stack/typescript.svg",
  },
  nuxt: {
    text: "Made with",
    icon: "/stack/nuxt.svg",
  }
} satisfies Record<string, SupportItemContent>;

export default support;
