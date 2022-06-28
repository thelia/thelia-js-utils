import { Suspense, useContext, useState } from "react";

import { BlocksGroupContext } from "../../providers/BlockGroupContext";
import ErrorBoundary from "../../components/ErrorBoundary";
import Preview from "../../components/Preview";
import toast from "react-hot-toast";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { useCreateOrUpdateGroup } from "../../utils/queries";

const ToolBar = () => {
  const { group } = useContext(BlocksGroupContext);
  const [showPreview, setShowPreview] = useState<boolean | number>(false);

  const { blockList } = useBlocksContext();
  const mutation = useCreateOrUpdateGroup();

  return (
    <>
      {blockList.length !== 0 && (
        <>
          <div className="w-full bg-lightCharbon h-20 sticky bottom-0 px-4 py-5 md:px-12 xl:px-44 2xl:px-60 flex gap-2 items-center justify-end text-white">
            <button
              className="Toolbar-view border border-white rounded-md px-3 py-1 hover:text-black hover:bg-white h-full"
              onClick={() => {
                setShowPreview(Date.now());
              }}
            >
              <i className="fas fa-eye mr-3"></i>
              Prévisualiser
            </button>
            <button
              type="button"
              className="Toolbar-save text-white bg-vermillon hover:bg-lightVermillon px-2 md:px-4 md:py-1 rounded-md h-full"
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
