import * as React from "react";

import BlockControls from "../BlockControls";
import { IBlock } from "../../types/types";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";

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
        <BlockControls blockIndex={blockIndex} blockId={block.id} />
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
      <div style={{ fontWeight: "bolder" }}>{currentPlugin.title.default}</div>
      <div>{currentPlugin?.description?.default}</div>

      <Component
        data={block.data}
        onUpdate={(data: {}) => updateBlock(block.id, data)}
      />
      <BlockControls blockIndex={blockIndex} blockId={block.id} />
    </div>
  );
};

export default Block;
