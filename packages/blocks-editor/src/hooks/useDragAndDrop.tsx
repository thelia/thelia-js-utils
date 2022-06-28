import Tippy from "@tippyjs/react";
import { ReactNode } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

const DndDragHandle = ({
  dragHandleProps,
  className,
}: {
  dragHandleProps: DraggableProvided["dragHandleProps"];
  className?: string;
}) => {
  return (
    <div className={`BlockWrapper-dragHandle ${className}`} {...dragHandleProps}>
      <Tippy content="Faites glisser l'élément pour le déplacer" delay={[700, 0]}>
        <i className="fa fa-bars"></i>
      </Tippy>
    </div>
  );
};

const DndWrapper = ({
  id,
  children,
  onDragEnd,
  wrapperClass = "",
}: {
  id: string;
  children: ReactNode;
  onDragEnd: (e: DropResult) => void;
  wrapperClass?: string;
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={`${wrapperClass} relative`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {children}
            {provided.placeholder}
            {snapshot.isDraggingOver && (
              <div className="absolute inset-0 opacity-60 bg-pearlMedium"></div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const DndWrapElement = ({
  id,
  children,
  index,
  wrapperClass = "",
}: {
  id: string;
  children: ({ DndDragHandle }: { DndDragHandle: () => JSX.Element }) => ReactNode;
  index: number;
  wrapperClass?: string;
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          key={`${id}-wrapper`}
          ref={provided.innerRef}
          className={wrapperClass}
          {...provided.draggableProps}
        >
          {children({
            DndDragHandle: () => (
              <DndDragHandle dragHandleProps={provided.dragHandleProps} />
            ),
          })}
        </div>
      )}
    </Draggable>
  );
};

const useDragAndDrop = () => ({ DndWrapper, DndWrapElement });

export default useDragAndDrop;
