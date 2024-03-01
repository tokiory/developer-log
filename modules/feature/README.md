# Feature Module

This module is needed to manage various features in the application.

## Configuration
By default all features are disabled. To enable it, you can tweak module options inside `nuxt.config.ts`:

```ts
const developmentMode = process.env.NODE_ENV === "development";

const runtimeConfig: NuxtConfig["runtimeConfig"] = {
  public: {
    features: {
      IMG_ZOOM: true,
      DIAGRAM_ZOOM: true,
      COMMENTARIES: developmentMode,
      POST_NAVIGATION: true,
    },
  }
};
```

# Exported items

- `composable`
  - `use-feature`: Needed to dynamically find out which feature is enabled
