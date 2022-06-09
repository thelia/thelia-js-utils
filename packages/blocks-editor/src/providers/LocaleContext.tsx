import { ReactElement, createContext, useEffect, useState } from "react";

import { Locale } from "../types";

export const LocaleContext = createContext<{
  currentLocale: Locale["code"];
  locales: Locale[];
  setCurrentLocale: Function;
}>({
  currentLocale: "",
  locales: [],
  setCurrentLocale: () => {},
});

export function LocaleProvider({
  locales,
  children,
}: {
  locales: Locale[];
  children: ReactElement;
}) {
  const [currentLocale, setCurrentLocale] = useState<Locale["code"]>("");

  useEffect(() => {
    if (Array.isArray(locales)) {
      const current = locales.find((locale) => locale.active);
      if (current) {
        setCurrentLocale(current.code);
      }
    }
  }, [locales]);

  return (
    <LocaleContext.Provider
      value={{ locales, currentLocale, setCurrentLocale }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
