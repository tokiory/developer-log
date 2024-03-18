import { createCssVariablesTheme } from "shiki";
import { type BundledLanguage, getHighlighter } from "shiki/bundle/full";
import type { Ref } from "vue";

interface ShikiParameters {
  code: Ref<string>;
  language: Ref<BundledLanguage>;
}

const cssVariablesTheme = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true
});

export const useShiki = async ({ code, language }: ShikiParameters) => {
  const highlighter = await getHighlighter({
    langs: [ language.value ],
    themes: [ cssVariablesTheme ],
  });

  const output = computed(() => {
    return highlighter.codeToHtml(code.value.trim(), {
      theme: cssVariablesTheme,
      lang: language.value,
    });
  });

  return {
    output,
  };
};
