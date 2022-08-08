import { useContext } from "react";
import { useIntl } from "react-intl";

import { LocaleContext } from "../../providers/LocaleContext";
import { Select } from "../Inputs";

import "./GroupLocale.css";

export default function GroupLocale() {
  const { locales, currentLocale, setCurrentLocale } = useContext(LocaleContext);

  const intl = useIntl();

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
        label={intl.formatMessage({ id: "GroupLocale__BLOCK_LOCALE" })}
        info={intl.formatMessage({ id: "GroupLocale__BLOCK_LOCALE_INFO" })}
      >
        <option value="" disabled>
          {intl.formatMessage({ id: "SELECT" })}
        </option>
        {locales.map((locale) => (
          <option key={locale.id} value={locale.code}>
            {locale.title}
          </option>
        ))}
      </Select>
    </form>
  );
}
