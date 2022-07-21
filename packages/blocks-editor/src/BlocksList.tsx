import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BlocksProvider } from "./utils/queries";
import BlocksTable from "./components/BlocksTable";

const BlocksListHeader = ({ backlink }: { backlink: boolean }) => {
  return (
    <div className="BlocksList__Header">
      {backlink ? (
        <div>
          <a href="/admin/TheliaBlocks">Back to BlocksList</a>
        </div>
      ) : null}
      <div className="BlocksList__Header__Title">Thelia Blocks</div>
      <div className="BlocksList__Header__Infos">
        <span className="BlocksList__Header__Description">
          Ici, un texte expliquant rapidement le fonctionnement des Thelia Blocks. Cela
          permettera aux utilisateurs de comprendre plus facilement l'outil
        </span>
        <a href="/admin/TheliaBlocks/new" className="BlocksList__Header__Create">
          Créer
        </a>
      </div>
    </div>
  );
};

const BlocksList = ({ apiUrl }: { apiUrl: string }) => {
  if (!apiUrl) return null;

  return (
    <BlocksProvider api={apiUrl}>
      <div className="BlocksList">
        <Toaster />

        <BlocksListHeader backlink />
        <div className="BlocksList__Wrapper">
          <div className="BlocksList__Title">Thelia Blocks existants</div>
          <div className="BlocksList__List__Wrapper">
            <Suspense fallback="loading">
              <BlocksTable />
            </Suspense>
          </div>
        </div>
      </div>
    </BlocksProvider>
  );
};

export default BlocksList;
