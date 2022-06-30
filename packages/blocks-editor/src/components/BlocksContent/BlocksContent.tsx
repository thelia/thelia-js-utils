import Block from "../Block";
import { useBlocksContext } from "../../hooks/useBlockContext";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { ReactComponent as EmptyTBIcon } from "../../../assets/svg/empty-tb.svg";

const EmptyState = () => {
  return (
    <div className="bg-white rounded-lg shadow-xl pt-10 pb-14 px-20 flex flex-col justify-center items-center text-center w-2/3 xl:w-1/3 mx-auto my-16">
      <EmptyTBIcon />
      <p className="mt-4 text-sm lg:text-base">
        Vous n'avez pas encore de contenu dans votre Thelia Blocks. Pour commencer,
        sélectionnez un type de contenu depuis le menu latéral droit.
      </p>
    </div>
  );
};

export default function BlocksContent() {
  const { blockList, moveBlockTo } = useBlocksContext();
  const { DndWrapper, DndWrapElement } = useDragAndDrop();

  const onDragEnd = (e: any) => {
    if (e.destination) {
      moveBlockTo(e.source.index, e.destination.index);
    }
  };

  return (
    <div className="BlocksContent">
      {blockList.length > 0 ? (
        <DndWrapper id="main" onDragEnd={onDragEnd}>
          {blockList.map((block, index) => (
            <DndWrapElement key={block.id} id={block.id} index={index}>
              {({ DndDragHandle }: { DndDragHandle: () => JSX.Element }) => (
                <Block DndDragHandle={DndDragHandle} key={index} block={block} />
              )}
            </DndWrapElement>
          ))}
        </DndWrapper>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
