import { ReactElement, createContext, useEffect, useState } from "react";

import { Locale } from "../types/types";
import { useGlobalHasChanged } from "../utils/globalState";
import { useIntl } from "react-intl";

export const LocaleContext = createContext<{
  currentLocale: Locale["code"];
  locales: Locale[];
  prefix: string;
  setCurrentLocale: Function;
}>({
  currentLocale: "",
  locales: [],
  setCurrentLocale: () => {},
  prefix: ''
});

export function LocaleProvider({
  locales,
  prefix,
  children,
}: {
  locales: Locale[];
  prefix: string;
  children: ReactElement;
}) {
  const intl = useIntl();
  const [hasChanged] = useGlobalHasChanged();
  const params = new URLSearchParams(window.location.search);
  const [currentLocale, setCurrentLocaleState] = useState<Locale["code"]>(
    params.get("blocks_locale") || ""
  );

  const setCurrentLocale = (locale: Locale["code"]) => {
    const url = new URL(window.location as any);

    if (hasChanged) {
      if (
        !window.confirm(
          intl.formatMessage({ id: "BlocksEditor__UNSAVED_LEAVE" })
        )
      ) {
        return;
      }
    }
    setCurrentLocaleState(locale);

    if (locale !== currentLocale) {
      url.searchParams.set("blocks_locale", locale);
      window.history.pushState({ locale }, "", url);
    }
  };

  useEffect(() => {
    const popStateListener = (e: PopStateEvent) => {
      const current = locales.find((locale) => locale.active);
      setCurrentLocaleState(e.state?.locale || current?.code || "");
    };

    window.addEventListener("popstate", popStateListener);

    return () => {
      window.removeEventListener("popstate", popStateListener);
    };
  }, [locales]);

  useEffect(() => {
    const current = locales.find((locale) => locale.active);
    setCurrentLocaleState(params.get("blocks_locale") || current?.code || "");
  }, [params]);

  return (
    <LocaleContext.Provider
      value={{ locales, currentLocale, setCurrentLocale, prefix }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
