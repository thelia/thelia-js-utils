import * as React from "react";

import Tippy from "@tippyjs/react";
import useWindowSize from "../../hooks/useWindowSize";
import { useBlocksContext } from "../../hooks/useBlockContext";

const BlockControls = ({
  blockId,
  blockIndex,
  inLayout = false,
}: {
  blockId: string;
  blockIndex: number;
  inLayout?: boolean;
}) => {
  // prettier-ignore
  const { blockList, removeBlock, moveBlockUp, moveBlockDown } = useBlocksContext();
  const { width } = useWindowSize();

  return (
    <div className="flex">
      <Tippy
        delay={[700, 0]}
        disabled={!inLayout && width > 768}
        content={"Monter l'élément"}
      >
        <button
          className={`${
            !inLayout && width > 768
              ? "border-y-2 border-l-2 px-2 md:px-6"
              : "px-2 sm:px-3"
          } ${blockIndex === 0 && "text-gray-400"}`}
          disabled={blockIndex === 0}
          onClick={() => moveBlockUp(blockIndex)}
        >
          <i className="fa fa-arrow-up"></i>
          {!inLayout && width > 768 ? " Monter" : ""}
        </button>
      </Tippy>

      <Tippy
        delay={[700, 0]}
        disabled={!inLayout && width > 768}
        content={"Descendre l'élément"}
        placement={"bottom"}
      >
        <button
          className={`${
            !inLayout && width > 768 ? "border-2 px-2 md:px-6" : "px-2 sm:px-3"
          } ${blockIndex === blockList.length - 1 && "text-gray-400"}`}
          disabled={blockIndex === blockList.length - 1}
          onClick={() => moveBlockDown(blockIndex)}
        >
          <i className="fa fa-arrow-down"></i>
          {!inLayout && width > 768 ? " Descendre" : ""}
        </button>
      </Tippy>

      <button
        className={`${
          !inLayout && width > 768 ? "border-y-2 border-r-2 px-2 md:px-6" : "px-2 sm:px-3"
        } text-red-500`}
        onClick={() => removeBlock(blockId)}
      >
        <i className="fa fa-trash-alt"></i>
        {!inLayout && width > 768 ? " Supprimer" : ""}
      </button>
    </div>
  );
};

export default BlockControls;
