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
        <div>Block non supporté</div>
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
  const { removeBlock, moveBlockUp, moveBlockDown } = useBlocksContext();

  return (
    <>
      <button onClick={() => removeBlock(block)}>Supprimer</button>
      <button
        style={{ margin: "0 0.5rem" }}
        onClick={() => moveBlockUp(block.id)}
      >
        Up
      </button>
      <button onClick={() => moveBlockDown(block.id)}>Down</button>
    </>
  );
};
