import { Suspense, useContext, useState } from "react";

import { BlocksGroupContext } from "../../providers/BlockGroupContext";
import ErrorBoundary from "../../components/ErrorBoundary";
import Preview from "../../components/Preview";
import toast from "react-hot-toast";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { useCreateOrUpdateGroup } from "../../utils/queries";

import "./ToolBar.css";

const ToolBar = () => {
  const { group } = useContext(BlocksGroupContext);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [timestamp, setTimestamp] = useState<number>(0);
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);

  const { blockList } = useBlocksContext();
  const mutation = useCreateOrUpdateGroup();

  return (
    <>
      <div className="Toolbar">
        <button
          className="Toolbar__View"
          onClick={() => {
            if (!blockList.length) {
              toast.error("Aucun block à afficher");
              return;
            }
            setTimestamp(Date.now());
            setShowPreview(true);
          }}
          disabled={isPreviewLoading}
        >
          {isPreviewLoading ? (
            <>
              <i className="fa fa-circle-notch fa-spin Toolbar__View__Icon"></i>
              Chargement
            </>
          ) : (
            <>
              <i className="fas fa-eye Toolbar__View__Icon"></i>
              Prévisualiser
            </>
          )}
        </button>
        <button
          className="Toolbar__Save"
          onClick={() => {
            if (!group?.title) {
              toast.error("Titre manquant");
              return;
            }
            mutation.mutate({ blocks: blockList });
          }}
        >
          Enregistrer
        </button>
      </div>
      <ErrorBoundary>
        <Preview
          isOpen={showPreview}
          setIsOpen={setShowPreview}
          setIsPreviewLoading={setIsPreviewLoading}
          timestamp={timestamp}
        />
      </ErrorBoundary>
    </>
  );
};

export default ToolBar;
