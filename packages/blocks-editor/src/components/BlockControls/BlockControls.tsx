import * as React from "react";
import { useBlocksContext } from "../../hooks/useBlockContext";

const BlockControls = ({
  blockId,
  blockIndex,
}: {
  blockId: string;
  blockIndex: number;
}) => {
  // prettier-ignore
  const { blockList, removeBlock, moveBlockUp, moveBlockDown, moveBlockTo } = useBlocksContext();

  return (
    <div style={{ margin: "0.5rem 0" }}>
      <button onClick={() => removeBlock(blockId)}>Delete</button>
      <button
        style={{ margin: "0 0.5rem" }}
        disabled={blockIndex === 0}
        onClick={() => moveBlockUp(blockIndex)}
      >
        Up
      </button>
      <button
        disabled={blockIndex === blockList.length - 1}
        onClick={() => moveBlockDown(blockIndex)}
      >
        Down
      </button>
      <input
        style={{ margin: "0 0.5rem" }}
        placeholder="Move block to index"
        onBlur={(e) => moveBlockTo(blockIndex, +e.target.value)}
      />
    </div>
  );
};

export default BlockControls;
