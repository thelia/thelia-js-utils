import { usePlugins } from "@thelia/blocks-plugin-manager";
import * as React from "react";
import { BlockContext } from "./BlockContext";
import { useBlocksContext } from "./hooks/useBlockContext";
import { IBlock } from "./types";

export default function BlocksContent() {
  const { blockList } = useBlocksContext();
  console.log("Liste :", blockList);

  if (!blockList || !blockList.length) return null;

  return (
    <div className="BlocksContent">
      {blockList.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}

const Block = ({ block }: { block: IBlock }) => {
  const { findBlockIndex, updateBlock } = useBlocksContext();

  const blockIndex = findBlockIndex(block.id);

  const plugins = usePlugins();
  const currentPlugin = plugins.find(
    (plugin) => plugin.type.id === block.type.id
  );

  if (!currentPlugin) {
    return (
      <div
        style={{
          backgroundColor: "red",
          padding: "1rem",
          margin: "1rem 0",
        }}
      >
        <div>Unsupported Block</div>
        <Controls blockIndex={blockIndex} blockId={block.id} />
      </div>
    );
  }

  const Component = currentPlugin.component;

  return (
    <div
      style={{
        backgroundColor: "lightBlue",
        padding: "1rem",
        margin: "1rem 0",
      }}
    >
      <div>{currentPlugin.title.default}</div>
      <div>{currentPlugin.description.default}</div>

      <Component
        data={block.data}
        onUpdate={(data: {}) => updateBlock(block.id, data)}
      />
      <Controls blockIndex={blockIndex} blockId={block.id} />
    </div>
  );
};

const Controls = ({
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
