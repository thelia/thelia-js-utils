import BlockControls from "../BlockControls";
import { IBlock } from "../../types/types";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";

import "./Block.css";
import { useIntl } from "react-intl";
import Tippy from "@tippyjs/react";
import ErrorBoundary from "../ErrorBoundary";

const Block = ({
  block,
  inLayout = false,
  className = "",
  DndDragHandle,
}: {
  block: IBlock;
  inLayout?: boolean;
  className?: string;
  DndDragHandle: () => JSX.Element;
}) => {
  const { findBlockIndex, updateBlock } = useBlocksContext();

  const intl = useIntl();

  const blockIndex = findBlockIndex(block.id);

  const plugins = usePlugins();

  const currentPlugin = plugins.find((plugin) => {
    if (plugin.layout) {
      return plugin?.title?.default === block?.title?.default;
    }

    return plugin.type.id === block.type.id;
  });

  if (!currentPlugin) {
    return (
      <div
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "1rem",
          margin: "1rem 0",
        }}
      >
        <div>
          {intl.formatMessage({ id: "UNSUPPORTED_BLOCK" })} : {block.type.id}
        </div>
        <BlockControls
          blockIndex={blockIndex}
          blockId={block.id}
          DndDragHandle={DndDragHandle}
        />
      </div>
    );
  }

  const { component: Component, icon: Icon } = currentPlugin;

  return (
    <ErrorBoundary>
      <div className={`${inLayout ? "NestedBlock" : "Block"}`}>
        <div className={`${inLayout ? "NestedBlock__Header" : "Block__Header"}`}>
          <div className="Block__Header__Infos">
            {!inLayout && typeof Icon === "function" ? (
              <Icon />
            ) : (
              <Tippy content={"Icone introuvable"}>
                <i
                  className="far fa-question-circle"
                  style={{ fontSize: "24px", color: "#333333" }}
                ></i>
              </Tippy>
            )}

            <div
              className={`${
                inLayout
                  ? "NestedBlock__Header__Infos__Title"
                  : "Block__Header__Infos__Title"
              }`}
            >
              {currentPlugin.title[intl.locale || "default"]}
            </div>
          </div>
          <BlockControls
            blockIndex={blockIndex}
            inLayout={inLayout}
            blockId={block.id}
            DndDragHandle={DndDragHandle}
          />
        </div>
        <Component
          data={block.data}
          onUpdate={(data: {}) => updateBlock(block.id, data)}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Block;
