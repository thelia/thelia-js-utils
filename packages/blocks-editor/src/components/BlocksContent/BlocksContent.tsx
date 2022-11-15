import Block from "../Block";
import { useBlocksContext } from "../../hooks/useBlockContext";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { ReactComponent as EmptyTBIcon } from "../../../assets/svg/empty-tb.svg";
import { DropResult } from "react-beautiful-dnd";

import "./BlocksContent.css";
import { useIntl } from "react-intl";

const EmptyList = () => {
  const intl = useIntl();

  return (
    <div className="EmptyList">
      <EmptyTBIcon />
      <p className="EmptyList__Text">
        {intl.formatMessage({ id: "BlocksContent__EMPTY_BLOCK" })}
      </p>
    </div>
  );
};

export default function BlocksContent() {
  const { blockList, moveBlockTo } = useBlocksContext();
  const { DndWrapper, DndWrapElement } = useDragAndDrop();

  const onDragEnd = (e: DropResult) => {
    if (e.destination) {
      moveBlockTo(e.source.index, e.destination.index);
    }
  };

  return (
    <div className="BlocksContent">
      {blockList && blockList.length > 0 ? (
        <DndWrapper id="main" onDragEnd={onDragEnd}>
          {blockList.map((block, index) => (
            <DndWrapElement key={block.id} id={block.id} index={index}>
              {({ DndDragHandle }: { DndDragHandle: () => JSX.Element }) => (
                <Block
                  DndDragHandle={DndDragHandle}
                  key={index}
                  block={block}
                />
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
