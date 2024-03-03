import { useFeature, useLocalStorageState } from "#imports";
import cookieKey from "@/data/cookie-key";
import localStorageKey from "@/data/local-storage-key";
import type { Theme } from "@t/theme";

export default function () {
  const cookieTheme = useCookie<Theme>(cookieKey.theme);
  const hasThemeFeature = useFeature("THEME_SWITCH");
  const localStorageTheme = useLocalStorageState<Theme>(localStorageKey.theme);

  const theme = computed<Theme | null>({
    set: (v: Theme | null) => {
      if (!hasThemeFeature) return;
      localStorageTheme.value = v;
      cookieTheme.value = v ?? "" as Theme;
    },
    get() {
      let fallback: Theme = "light";

      if (process.client) {
        fallback = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }

      return cookieTheme.value ?? localStorageTheme.value ?? fallback ?? null;
    }
  });

  const accentColor = computed<`#${string}`>(() => {
    return theme.value === "dark" ? "#0CC0A5" : "#EE5899";
  });

  return {
    accentColor,
    theme,
  };
}
