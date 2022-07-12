import Block from "../Block";
import { useBlocksContext } from "../../hooks/useBlockContext";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { ReactComponent as EmptyTBIcon } from "../../../assets/svg/empty-tb.svg";

import "./BlocksContent.css";

const EmptyList = () => {
  return (
    <div className="EmptyList">
      <EmptyTBIcon />
      <p className="EmptyList__Text">
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
        <EmptyList />
      )}
    </div>
  );
}
