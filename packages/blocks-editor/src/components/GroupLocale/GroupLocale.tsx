import { useContext } from "react";

import { LocaleContext } from "../../providers/LocaleContext";
import { Select } from "../Inputs";

import "./GroupLocale.module.css";

export default function GroupLocale() {
  const { locales, currentLocale, setCurrentLocale } = useContext(LocaleContext);

  /* if (!locales || locales.length <= 0) {
    return null;
  } */

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="GroupLocale__Wrapper"
    >
      <Select
        placeholder="Sélectionnez"
        id="GroupLocale-field-locale"
        onChange={(e) => {
          setCurrentLocale(e.target.value);
        }}
        value={currentLocale}
        label="Langue"
        info="Sélectionnez la langue de votre Thelia Blocks"
      >
        <option value="" disabled>
          Sélectionnez
        </option>
        {locales.map((locale) => (
          <option key={locale.id} value={locale.code}>
            {locale.title}
          </option>
        ))}
      </Select>

      {/* {locales.map((locale) => {
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
      })} */}
    </form>
  );
}
