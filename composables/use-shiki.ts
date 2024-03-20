import { createCssVariablesTheme } from "shiki";
import type { BundledLanguage } from "shiki/bundle/full";
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
  const { data } = useAsyncData(async () => {
    const { getHighlighter } = await import("shiki/bundle/full");
    const highlighter = await getHighlighter({
      langs: [ language.value ],
      themes: [ cssVariablesTheme ],
    });
    return highlighter.codeToHtml(code.value.trim(), {
      theme: cssVariablesTheme,
      lang: language.value,
    });
  });

  return {
    data,
  };
};
