import { createContext, useEffect, useState } from "react";
import type { Locale, LocaleProviderProps } from "../types";

export const LocaleContext = createContext<{
  currentLocale: Locale["locale"];
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
}: LocaleProviderProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale["locale"]>("");

  useEffect(() => {
    if (Array.isArray(locales)) {
      const current = locales.find((locale) => locale.active);
      if (current) {
        setCurrentLocale(current.locale);
      }
    }
  }, [locales]);

  return (
    <LocaleContext.Provider value={{ locales, currentLocale, setCurrentLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
