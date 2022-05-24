import * as React from "react";

import BlockControls from "../BlockControls";
import { IBlock } from "../../types/types";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";
import Tippy from "@tippyjs/react";

const Block = ({
  block,
  inLayout = false,
  className,
  DndDragHandle,
}: {
  block: IBlock;
  inLayout?: boolean;
  className?: string;
  DndDragHandle: () => JSX.Element;
}) => {
  const { findBlockIndex, updateBlock } = useBlocksContext();

  const blockIndex = findBlockIndex(block.id);

  const plugins = usePlugins();

  const currentPlugin = plugins.find((plugin) => plugin.type.id === block.type.id);

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
      className={`Block mb-4 p-4 md:p-8 rounded-md ${className} ${
        inLayout ? "bg-pearlLight shadow-md" : ""
      }`}
    >
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          {DndDragHandle && <DndDragHandle />}
          <div className={`${inLayout ? "font-bold" : "font-extrabold"} md:text-xl mx-4`}>
            {currentPlugin.title.fr_FR}
          </div>
          <Tippy content={<span>{currentPlugin?.description?.fr_FR}</span>}>
            <i className="fa fa-info-circle cursor-help"></i>
          </Tippy>
        </div>
        <BlockControls blockIndex={blockIndex} inLayout={inLayout} blockId={block.id} />
      </div>
      <Component data={block.data} onUpdate={(data: {}) => updateBlock(block.id, data)} />
    </div>
  );
};

export default Block;
