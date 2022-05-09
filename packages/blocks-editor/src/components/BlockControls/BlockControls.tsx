import { faArrowDown, faArrowUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
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

  return (
    <div>
      <button
        className={`${!inLayout ? "border-y-2 border-l-2 px-6 py-1" : "px-3"} ${
          blockIndex === 0 && "text-gray-400"
        }`}
        disabled={blockIndex === 0}
        onClick={() => moveBlockUp(blockIndex)}
      >
        <FontAwesomeIcon icon={faArrowUp} />
        {!inLayout ? " Monter" : ""}
      </button>

      <button
        className={`${!inLayout ? "border-2 px-6 py-1" : "px-3"} ${
          blockIndex === blockList.length - 1 && "text-gray-400"
        }`}
        disabled={blockIndex === blockList.length - 1}
        onClick={() => moveBlockDown(blockIndex)}
      >
        <FontAwesomeIcon icon={faArrowDown} />
        {!inLayout ? " Descendre" : ""}
      </button>

      <button
        className={`${
          !inLayout ? "border-y-2 border-r-2 px-6 py-1" : "px-3"
        } text-red-500`}
        onClick={() => removeBlock(blockId)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
        {!inLayout ? " Supprimer" : ""}
      </button>
    </div>
  );
};

export default BlockControls;
