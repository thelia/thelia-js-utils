import type { PropsWithChildren } from "react";

export type Locale = {
  id: number;
  title: string;
  code: string;
  locale: string;
  active: boolean;
};

export type LocaleProviderProps = PropsWithChildren<{
  locales: Locale[];
}>;
