import { MouseEvent, SetStateAction, Suspense, useContext, useLayoutEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BlocksProvider } from "./utils/queries";
import BlocksTable from "./components/BlocksTable";
import { IntlProvider, useIntl } from "react-intl";
import { messages, locale } from "./utils/intl";
import ReactModal from "react-modal";
import ErrorBoundary from "./components/ErrorBoundary";
import { LocaleContext, LocaleProvider } from "./providers/LocaleContext";
import { Locale } from "./utils/types";
import { toastOptions } from "./utils/toast";
import { Input } from "./components/Inputs";
import { ReactComponent as XMarkIcon } from "../assets/svg/xmark.svg";
import { ReactComponent as SearchIcon } from "../assets/svg/search.svg";

const BlocksListHeader = () => {
  const intl = useIntl();
  const { getUrlWithPrefix } = useContext(LocaleContext);
  return (
    <div className="BlocksList__Header">
      <div className="BlocksList__Header__Title">Thelia Blocks</div>
      <div className="BlocksList__Header__Infos">
        <span className="BlocksList__Header__Description">
          Ici, un texte expliquant rapidement le fonctionnement des Thelia Blocks. Cela
          permettera aux utilisateurs de comprendre plus facilement l'outil
        </span>
        <a
          href={getUrlWithPrefix("/admin/TheliaBlocks/new")}
          className="BlocksList__Header__Create"
        >
          {intl.formatMessage({ id: "CREATE" })}
        </a>
      </div>
    </div>
  );
};

const BlocksListContent = () => {
  const intl = useIntl();
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const resetQuery = () => {
    if(query !== "" && searchRef.current) {
      setQuery('');
      searchRef.current.value = '';
      searchRef.current.focus();
    }
  }
  return (
    <div className="BlocksList Thelia-Blocks">
      <Toaster toastOptions={toastOptions} />
      <BlocksListHeader />
      <div className="BlocksList__Wrapper">
        <div className="BlocksList__SearchWrapper">
          <div className="BlocksList__Title">
            {intl.formatMessage({ id: "BlocksList__EXISTING_THELIA_BLOCKS" })}
          </div>

            <div className="relative w-full lg:max-w-sm">
              <Input
              onChange={(e) => setQuery(e.target.value)}
              placeholder={intl.formatMessage({ id: "SEARCH_BY_NAME" })}
              id="BlockProduct-field-product"
              type="text"
              ref={searchRef}
              classNameWrapper='BlocksList__Search'
            />
            <button type="button" className="BlocksList__SearchIcon" onClick={() => resetQuery()}>{query !== '' ? <XMarkIcon />:<SearchIcon />}</button>
            </div>
        </div>
        <div className="BlocksList__List__Wrapper">
          <Suspense fallback={<i className="Loader fa fa-circle-notch fa-spin"></i>}>
            <BlocksTable searchQuery={query}/>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const BlocksList = ({
  apiUrl,
  containerId,
  locales,
  urlPrefix,
}: {
  apiUrl: string;
  containerId: string;
  locales: Locale[];
  urlPrefix: string;
}) => {
  useLayoutEffect(() => {
    if (containerId) {
      ReactModal.setAppElement("#" + containerId);
    }
  }, [containerId]);

  if (!apiUrl) return null;

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <LocaleProvider locales={locales} prefix={urlPrefix}>
        <BlocksProvider api={apiUrl}>
          <ErrorBoundary>
            <BlocksListContent />
          </ErrorBoundary>
        </BlocksProvider>
      </LocaleProvider>
    </IntlProvider>
  );
};

export default BlocksList;
