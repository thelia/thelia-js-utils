import { Suspense, useLayoutEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BlocksProvider } from "./utils/queries";
import BlocksTable from "./components/BlocksTable";
import { IntlProvider, useIntl } from "react-intl";
import { messages, locale } from "./utils/intl";
import ReactModal from "react-modal";

const BlocksListHeader = () => {
  const intl = useIntl();

  return (
    <div className="BlocksList__Header">
      <div className="BlocksList__Header__Title">Thelia Blocks</div>
      <div className="BlocksList__Header__Infos">
        <span className="BlocksList__Header__Description">
          Ici, un texte expliquant rapidement le fonctionnement des Thelia Blocks. Cela
          permettera aux utilisateurs de comprendre plus facilement l'outil
        </span>
        <a href="/admin/TheliaBlocks/new" className="BlocksList__Header__Create">
          {intl.formatMessage({ id: "CREATE" })}
        </a>
      </div>
    </div>
  );
};

const BlocksListContent = () => {
  const intl = useIntl();

  return (
    <div className="BlocksList">
      <Toaster />

      <BlocksListHeader />
      <div className="BlocksList__Wrapper">
        <div className="BlocksList__Title">
          {intl.formatMessage({ id: "BlocksList__EXISTING_THELIA_BLOCKS" })}
        </div>
        <div className="BlocksList__List__Wrapper">
          <Suspense fallback={<i className="Loader fa fa-circle-notch fa-spin"></i>}>
            <BlocksTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const BlocksList = ({ apiUrl, containerId }: { apiUrl: string; containerId: string }) => {
  useLayoutEffect(() => {
    if (containerId) {
      ReactModal.setAppElement("#" + containerId);
    }
  }, [containerId]);

  if (!apiUrl) return null;

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BlocksProvider api={apiUrl}>
        <BlocksListContent />
      </BlocksProvider>
    </IntlProvider>
  );
};

export default BlocksList;
