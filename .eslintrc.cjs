module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },

  extends: [
    "eslint:recommended",
    "plugin:compat/recommended",
    "plugin:editorconfig/all",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:unicorn/recommended",
    "plugin:yml/standard",
    "plugin:vuejs-accessibility/recommended"
  ],

  ignorePatterns: [ "pnpm-lock.yaml", ".artifacts/*" ],
  overrides: [
    {
      files: [ "*.ts", "*.vue" ],
      rules: {
        "no-undef": "off",
      },
    },

    // YAML/JSON files
    {
      files: [ "*.yaml", "*.yml" ],
      parser: "yaml-eslint-parser",
    },

    // ESLint config
    {
      env: {
        node: true
      },
      files: [
        ".eslintrc.{js,cjs}"
      ],
      parserOptions: {
        sourceType: "script"
      },
      rules: {
        "unicorn/prefer-module": "off",
      }
    }
  ],

  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },

  plugins: [
    "@typescript-eslint",
    "vue",
    "unicorn",
    "compat",
    "editorconfig",
    "simple-import-sort",
    "vuejs-accessibility"
  ],

  rules: {
    "sort-imports": "off",
    "quote-props": [ "error", "as-needed" ],
    quotes: [
      "error",
      "double"
    ],
    semi: [
      "error",
      "always"
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          [
            // Internal
            "^\\u0000",
            "#imports",
            "#app",

            // Imports from @
            "^@(/.*|$)",

            // Relative imports
            "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$",
            "^\\.\\.(?!/?$)", "^\\.\\./?$",

            // Types
            "^@(t|/types)(/.*|$)",

            // Styles
            "^@(s|/styles)(/.*|$)",
            "^.+\\.s?css$"
          ]
        ]
      }
    ],
    "simple-import-sort/exports": "error",
    "vue/multi-word-component-names": "off",
    "object-curly-spacing": [ "error", "always" ],
    "array-bracket-spacing": [ "error", "always", { objectsInArrays: false }],
    "vue/component-name-in-template-casing": [ "error", "PascalCase", {
      registeredComponentsOnly: false,
      ignores: []
    }],
    "unicorn/no-null": "off",
    "comma-spacing": [ "error", { before: false, after: true }],
    "vuejs-accessibility/aria-role": [ "error", { ignoreNonDOM: false }],
    "vuejs-accessibility/alt-text": [
      "error",
      {
        elements: [ "img", "object", "area", "input[type=\"image\"]" ],
        components: [ "Image", "NuxtImage", "NuxtImg", "Img" ],
        img: [ "Image" ],
        object: [ "Object" ],
        area: [ "Area" ],
        "input[type=\"image\"]": [ "ImageInput" ]
      }
    ],
  }
};
