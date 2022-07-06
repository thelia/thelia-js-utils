import { Suspense, useContext, useState } from "react";

import { BlocksGroupContext } from "../../providers/BlockGroupContext";
import ErrorBoundary from "../../components/ErrorBoundary";
import Preview from "../../components/Preview";
import toast from "react-hot-toast";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { useCreateOrUpdateGroup } from "../../utils/queries";

import "./ToolBar.module.css";

const ToolBar = () => {
  const { group } = useContext(BlocksGroupContext);
  const [showPreview, setShowPreview] = useState<boolean | number>(false);

  const { blockList } = useBlocksContext();
  const mutation = useCreateOrUpdateGroup();

  return (
    <>
      {blockList.length > 0 && (
        <>
          <div className="Toolbar">
            <button
              className="Toolbar__View"
              onClick={() => {
                if (!blockList.length) {
                  toast.error("Aucun block à afficher");
                  return;
                }
                setShowPreview(Date.now());
              }}
            >
              <i className="fas fa-eye Toolbar__View__Icon"></i>
              Prévisualiser
            </button>
            <button
              className="Toolbar__Save"
              onClick={() => {
                if (!group?.title) {
                  console.log("hey");
                  toast.error("Titre manquant");
                  return;
                }
                mutation.mutate({ blocks: blockList });
              }}
            >
              Enregistrer
            </button>
          </div>
          {typeof showPreview === "number" ? (
            <ErrorBoundary>
              <Suspense fallback="loading">
                <Preview timestamp={showPreview} />
              </Suspense>
            </ErrorBoundary>
          ) : null}
        </>
      )}
    </>
  );
};

export default ToolBar;
