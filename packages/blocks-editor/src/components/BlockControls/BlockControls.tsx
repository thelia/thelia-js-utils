import * as React from "react";

import Tippy from "@tippyjs/react";
import useWindowSize from "../../hooks/useWindowSize";
import { useBlocksContext } from "../../hooks/useBlockContext";

const BlockControls = ({
  blockId,
  blockIndex,
  inLayout = false,
  DndDragHandle,
}: {
  blockId: string;
  blockIndex: number;
  inLayout?: boolean;
  DndDragHandle: () => JSX.Element;
}) => {
  const { blockList, removeBlock, moveBlockUp, moveBlockDown } = useBlocksContext();

  const { width } = useWindowSize();

  return (
    <div className="flex">
      {DndDragHandle && (
        <div
          className={`${
            !inLayout && width > 1024
              ? "border-y border-l border-mediumGrey px-1 md:px-3 flex items-center"
              : "px-2 sm:px-3"
          } text-darkCharbon`}
        >
          <DndDragHandle />
        </div>
      )}

      <Tippy
        delay={[700, 0]}
        disabled={!inLayout && width > 1024}
        content={"Monter l'élément"}
      >
        <button
          className={`${
            !inLayout && width > 1024
              ? "border-y border-l border-mediumGrey flex gap-2 tracking-wider items-center px-2 md:px-6"
              : "px-2 sm:px-3"
          } ${blockIndex === 0 ? "text-gray-400" : "text-darkCharbon"}`}
          disabled={blockIndex === 0}
          onClick={() => moveBlockUp(blockIndex)}
        >
          <i className="fa fa-arrow-up"></i>
          {!inLayout && width > 1024 && (
            <span className="uppercase text-xs font-semibold">Monter</span>
          )}
        </button>
      </Tippy>
      <Tippy
        delay={[700, 0]}
        disabled={!inLayout && width > 1024}
        content={"Descendre l'élément"}
        placement={"bottom"}
      >
        <button
          className={`${
            !inLayout && width > 1024
              ? "border border-mediumGrey flex items-center gap-2 tracking-wider px-2 md:px-6"
              : "px-2 sm:px-3"
          } ${
            blockIndex === blockList.length - 1 ? "text-gray-400" : "text-darkCharbon"
          }`}
          disabled={blockIndex === blockList.length - 1}
          onClick={() => moveBlockDown(blockIndex)}
        >
          <i className="fa fa-arrow-down"></i>
          {!inLayout && width > 1024 && (
            <span className="uppercase text-xs font-semibold">Descendre</span>
          )}
        </button>
      </Tippy>

      <Tippy
        delay={[700, 0]}
        disabled={!inLayout && width > 1024}
        content={"Supprimer l'élément"}
        placement={"bottom"}
      >
        <button
          className={`${
            !inLayout && width > 1024
              ? "border-y border-r border-mediumGrey flex items-center gap-2 tracking-wider px-2 md:px-6"
              : "px-2 sm:px-3"
          } text-error`}
          onClick={() => removeBlock(blockId)}
        >
          <i className="fa fa-trash-alt"></i>
          {!inLayout && width > 1024 && (
            <span className="uppercase text-xs font-semibold">Supprimer</span>
          )}
        </button>
      </Tippy>
    </div>
  );
};

export default BlockControls;
