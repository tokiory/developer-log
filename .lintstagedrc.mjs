export default {
  "*.vue": "pnpm lint:stylelint",
  "*.{ts,js,vue,yaml,yml}": "pnpm lint:eslint",
  "*.svg": "pnpm lint:svglint",
}
