import { useContext, useEffect, useState } from "react";

import { BlocksGroupContext } from "../../providers/BlockGroupContext";
import { LocaleContext } from "../../providers/LocaleContext";

export default function GroupLocale() {
  const { locales, currentLocale, setCurrentLocale } =
    useContext(LocaleContext);

  if (!locales || locales.length <= 0) {
    return null;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex gap-8"
    >
      {locales.map((locale) => {
        return (
          <label
            htmlFor={locale.code}
            key={locale.id}
            className={locale.code === currentLocale ? "bg-red" : ""}
          >
            <input
              id={locale.code}
              type="radio"
              name="locale"
              value={locale.code}
              checked={currentLocale === locale.code}
              onChange={() => {
                setCurrentLocale(locale.code);
              }}
              className="sr-only"
            />
            {locale.title}
          </label>
        );
      })}
    </form>
  );
}
