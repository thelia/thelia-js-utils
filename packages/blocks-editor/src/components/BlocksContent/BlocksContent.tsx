import * as React from "react";
import { useBlocksContext } from "../../hooks/useBlockContext";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import Block from "../Block";

export default function BlocksContent() {
  const { blockList, moveBlockTo } = useBlocksContext();
  const { DndWrapper, DndWrapElement } = useDragAndDrop();
  console.log("Liste :", blockList);

  if (!blockList || !blockList.length) return null;

  const onDragEnd = (e: any) => {
    if (e.destination) {
      moveBlockTo(e.source.index, e.destination.index);
    }
  };

  return (
    <div className="BlocksContent px-60 py-28">
      {blockList.length > 0 && (
        <DndWrapper id="main" onDragEnd={onDragEnd}>
          {blockList.map((block, index) => (
            <DndWrapElement key={block.id} id={block.id} index={index}>
              {({ DndDragHandle }: { DndDragHandle: () => JSX.Element }) => (
                <Block DndDragHandle={DndDragHandle} key={index} block={block} />
              )}
            </DndWrapElement>
          ))}
        </DndWrapper>
      )}
    </div>
  );
}
