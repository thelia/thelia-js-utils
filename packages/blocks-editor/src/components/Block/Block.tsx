import * as React from "react";

import BlockControls from "../BlockControls";
import { IBlock } from "../../types/types";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Block = ({
  block,
  inLayout = false,
  className,
}: {
  block: IBlock;
  inLayout?: boolean;
  className?: string;
}) => {
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
      className={`Block mb-3 bg-slate-100 p-8 rounded-md shadow-md ${className}`}
    >
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <div className="font-bold text-xl mr-4">
            {currentPlugin.title.fr_FR}
          </div>

          <FontAwesomeIcon className="cursor-help" icon={faInfoCircle} />
        </div>
        <BlockControls
          blockIndex={blockIndex}
          inLayout={inLayout}
          blockId={block.id}
        />
      </div>
      <Component
        data={block.data}
        onUpdate={(data: {}) => updateBlock(block.id, data)}
      />
    </div>
  );
};

export default Block;
