import type { LicenseContent } from "@/types/content";

const packages: LicenseContent = [
  {
    title: "Nuxt",
    source: "https://github.com/nuxt/nuxt",
    license: "https://github.com/nuxt/nuxt/blob/main/LICENSE",
  },
  {
    title: "Vue 3",
    source: "https://github.com/vuejs/core",
    license: "https://github.com/vuejs/core/blob/main/LICENSE",
  },
  {
    title: "Typescript",
    source: "https://github.com/microsoft/TypeScript/#readme",
    license: "https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt",
  },
  {
    title: "Vitest",
    source: "https://github.com/vitest-dev/vitest",
    license: "https://github.com/vitest-dev/vitest/blob/main/LICENSE",
  },
  {
    title: "Playwright",
    source: "https://github.com/microsoft/playwright",
    license: "https://github.com/microsoft/playwright/blob/main/LICENSE",
  },
  {
    title: "ESLint",
    source: "https://github.com/eslint/eslint",
    license: "https://github.com/eslint/eslint/blob/main/LICENSE",
  },
  {
    title: "Stylelint",
    source: "https://github.com/stylelint/stylelint",
    license: "https://github.com/stylelint/stylelint/blob/main/LICENSE",
  },
  {
    title: "Vercel",
    source: "https://vercel.com/",
    license: "https://vercel.com/legal/terms",
  },
];

const fonts: LicenseContent = [
  {
    title: "Jetbrains Mono",
    source: "https://www.jetbrains.com/lp/mono/",
    license: "https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt"
  },
  {
    title: "Montserrat",
    source: "https://github.com/JulietaUla/Montserrat",
    license: "https://github.com/JulietaUla/Montserrat/blob/master/OFL.txt",
  },
];

const icons: LicenseContent = [
  {
    title: "Devicon",
    source: "https://github.com/devicons/devicon",
    license: "https://github.com/devicons/devicon/blob/master/LICENSE",
  },
  {
    title: "VSCode Icons",
    source: "https://github.com/vscode-icons/vscode-icons",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    title: "Iconify",
    source: "https://github.com/iconify/iconify",
    license: "https://github.com/iconify/iconify/blob/main/license.txt",
  },
  {
    title: "Feather Icons",
    source: "https://github.com/feathericons/feather",
    license: "https://github.com/feathericons/feather/blob/main/LICENSE",
  },
  {
    title: "Unicons",
    source: "https://github.com/Iconscout/unicons",
    license: "https://iconscout.com/licenses#simple_license",
  },
];

const license: LicenseContent = [
  ...packages,
  ...fonts,
  ...icons,
];
export default license;
