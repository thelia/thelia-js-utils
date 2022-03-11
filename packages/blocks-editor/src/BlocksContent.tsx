import { usePlugins } from "@thelia/blocks-plugin-manager";
import { useContext } from "react";
import { BlockContext, useBlocksContext } from "./BlockContext";
import { IBlock } from "./types";

export default function BlocksContent() {
  const { blocks } = useContext(BlockContext);

  console.log("Liste :", blocks);

  if (!blocks || !blocks.length) return null;

  return (
    <div className="BlocksContent">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}

const Block = ({ block }: { block: IBlock }) => {
  const { updateBlock } = useBlocksContext();
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
        <Controls block={block} />
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
      <Controls block={block} />
    </div>
  );
};

const Controls = ({ block }: { block: IBlock }) => {
  // prettier-ignore
  const { removeBlock, moveBlockUp, moveBlockDown, moveBlockTo } = useBlocksContext();
  const { blocks } = useContext(BlockContext);

  return (
    <div style={{ marginTop: "2rem" }}>
      <button onClick={() => removeBlock(block.id)}>Delete</button>
      <button
        disabled={blocks.findIndex((item) => item.id === block.id) === 0}
        onClick={() => moveBlockUp(block.id)}
      >
        Up
      </button>
      <button
        disabled={
          blocks.findIndex((item) => item.id === block.id) === blocks.length - 1
        }
        onClick={() => moveBlockDown(block.id)}
      >
        Down
      </button>
      <input
        style={{ margin: "0 0.5rem" }}
        placeholder="Move block to index"
        onBlur={(e) => moveBlockTo(block.id, +e.target.value)}
      />
    </div>
  );
};
