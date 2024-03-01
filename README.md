![Github Banner](https://github.com/developer-log/blog/assets/101672047/3e31b542-9423-4374-b2ab-e3a8c1d86171)

In the bustling realm of technology, where innovation is the heartbeat, "Developer Log" emerges as a guiding light for both seasoned developers and aspiring enthusiasts alike. This unique blog serves as a sanctuary for code aficionados, offering a rich tapestry of insights, experiences, and solutions in the ever-evolving world of software development.

## Stack 🥸
- Nuxt
- Typescript

### ESLint modules 🔥
- [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat) - Plugin for compatibility with old browsers;
- [eslint-plugin-editorconfig](https://www.npmjs.com/package/eslint-plugin-editorconfig) - Plugin for linting files with EditorConfig;
- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort) - Plugin for sorting imports;
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) - Powerful rules for strict code;
- [eslint-plugin-vue](https://eslint.vuejs.org) - Eslint plugin for Vue.js;
- [eslint-plugin-vuejs-accessibility](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/) - Plugin for a11y support;
- [eslint-plugin-yml](https://www.npmjs.com/package/eslint-plugin-yml) - Plugin for YAML files;
- [@typescript-eslint/eslint-plugin](https://typescript-eslint.io) - ESLint plugin for typescript;

### Stylelint modules ☄️
- [stylelint-config-recommended-scss](https://www.npmjs.com/package/stylelint-config-recommended-scss) - Config for scss stylesheets;
- [stylelint-config-recommended-vue](https://www.npmjs.com/package/stylelint-config-recommended-vue) - Config for vue stylesheets;

### Nuxt modules 💫
- [@nuxtjs/i18n](https://nuxt.com/modules/i18n) - Adds ability for translation;
- [@nuxtjs/sitemap](https://nuxt.com/modules/simple-sitemap) - Adds sitemap;
- [@nuxt/devtools](https://nuxt.com/modules/devtools) - Devtools for Nuxt 3;
- [@nuxt/image](https://nuxt.com/modules/image) - Adds a11y image component;
- [nuxt-icon](https://nuxt.com/modules/icon) - Adds component for various icons;

## Setup 👌
If you don't have a `pnpm` - you will need it.

```bash
# Installing of pnpm
npm i -g pnpm
```

After the installation of the pnpm - you can install dependecies of the project:

```bash
pnpm i
```

> Warn:
> You should create an `.env` file. Just copy it from `.env.example` and copy & paste secrets.

After creation of dotenv file you can run project with the following command:

```bash
pnpm app:dev
```
## Commands 🙌
If you can, you can use Webstorm commands via `Ctrl + Ctrl` keybinding

You also can use next terminal commands:

- `app`: Commands for app
    - `app:dev`: Run development server;
    - `app:build`: Build the project;
    - `app:run`: Run production server;
    - `app:analyze`: Analyze server and client bundle;
- `lint`: Commands for linters
  - `lint:eslint`: Run ESLint;
  - `lint:stylelint`: Run Stylelint;
  - `lint:svglint`: Lint svg files with svglint;
  - `lint:staged`: Lint all staged files;
- `deploy`: Commands for deploying
  - `deploy:dev`: Deploy to the development server;
  - `deploy:prod`: Deploy to the production server;

## Internationalization 👅
Languages dictionaries are located in `@/localization`. Following languages are supported now:

- Russian (Main language);
- English;
- Belarusian;
- Korean;
- Kazakhstan;

## Hooks 🤞
This project has husky and [git hooks](https://gist.github.com/tokiory/5b99a68523065d86a218797d349fbbbd).

- **commit** \
  We use commitlint for linting commit messages;
- **pre-commit** \
  On pre-commit hook husky runs eslint and stylelint on every committed file;
- **push** \
  We have hook on push. It runs unit and end to end tests;


## Conventions 🤝

1. We're building mobile-first layout
2. We're using `from-{breakpoint}` mixin, it's located in [`styles/prebuild/breakpoint.scss`](styles/prebuild/breakpoint.scss)

### Adaptive 🤳
- **Minimal Value**: 400px;
- **Maximum value**: 2048px;

For adaptive layout we use sass mixins, they are defined in `styles/prebuild/breakpoint.scss`.

Blog also have a dark theme. Mixin for dark theme is defined in `styles/prebuild/theme.scss`.
