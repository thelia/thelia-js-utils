import { useBlocksContext } from "../../hooks/useBlockContext";
import { useCreateOrUpdateGroup } from "../../utils/queries";

const ToolBar = () => {
  const { blockList } = useBlocksContext();
  const mutation = useCreateOrUpdateGroup();

  return (
    <>
      {blockList.length !== 0 && (
        <div className="w-full bg-lightCharbon h-20 sticky bottom-0 px-4 py-5 md:px-12 xl:px-44 2xl:px-60 flex gap-2 items-center justify-end text-white">
          <button className="Toolbar-view border border-white rounded-md px-3 py-1 hover:text-black hover:bg-white h-full">
            <i className="fas fa-eye mr-3"></i>
            Prévisualiser
          </button>
          <button
            type="button"
            className="Toolbar-save text-white bg-vermillon hover:bg-lightVermillon px-2 md:px-4 md:py-1 rounded-md h-full"
            onClick={() => {
              mutation.mutate({ blocks: blockList });
            }}
          >
            Enregistrer
          </button>
        </div>
      )}
    </>
  );
};

export default ToolBar;
