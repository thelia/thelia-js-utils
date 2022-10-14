import React, { useContext } from "react";
import { LocaleContext } from "../../providers/LocaleContext";
import "./LocaleSwitch.css";
import type { LocaleSwitchProps } from "./LocaleSwitch.types";

const LocaleSwitch = (props:LocaleSwitchProps) => {
  const { assetsPath } = props;
  const { locales, setCurrentLocale, currentLocale } =
    useContext(LocaleContext);
  if (locales.length < 2) {
    return null;
  } 

  return (
    <div className="LocaleSwitch">
      <ul className="nav nav-pills">
        {locales.map((locale) => {
          return (
            <li
              key={locale.locale}
              className={locale.locale === currentLocale ? "active" : ""}
              onClick={() => {
                if (locale.locale !== currentLocale) {
                  setCurrentLocale(locale.locale);
                } 
              }}
            >
              <a className={"language-change-button"} href={"#"}>
                <img
                  src={`${assetsPath}${locale.code}.png`}
                  alt={locale.title}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default LocaleSwitch;
