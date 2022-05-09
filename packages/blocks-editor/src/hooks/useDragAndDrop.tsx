import * as React from "react";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Tippy from "@tippyjs/react";

const DndDragHandle = ({
  dragHandleProps,
}: {
  dragHandleProps: DraggableProvided["dragHandleProps"];
}) => {
  return (
    <div className="BlockWrapper-dragHandle" {...dragHandleProps}>
      <FontAwesomeIcon icon={faBars} />
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
  children: React.ReactNode;
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
              <div className="absolute inset-0 z-10 bg-white opacity-60"></div>
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
  children: ({ DndDragHandle }: { DndDragHandle: () => JSX.Element }) => React.ReactNode;
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
