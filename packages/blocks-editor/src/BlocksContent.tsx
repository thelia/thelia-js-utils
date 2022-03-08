import { usePlugins } from "@thelia/blocks-plugin-manager";
import { useAtom } from "jotai";
import { useImmerAtom } from "jotai/immer";
import { useContext } from "react";
import { BlockContext } from "./BlockContext";
import { BlockAtomType } from "./types";

const Block = ({ blockAtom }: { blockAtom: BlockAtomType }) => {
  const [block, setBlock] = useImmerAtom(blockAtom);

  const plugins = usePlugins();

  const currentPlugin = plugins.find(
    (plugin) => plugin.type.id === block.type.id
  );

  if (!currentPlugin) return null;

  const Component = currentPlugin.component;

  return (
    <div style={{ padding: "2rem" }}>
      <div>{currentPlugin.title.default}</div>
      <div>{currentPlugin.description.default}</div>

      <Component
        data={block.data}
        onUpdate={(data) => {
          setBlock((block) => ({
            ...block,
            data,
          }));
        }}
      />
    </div>
  );
};

export default function BlocksContent() {
  const { blocks, setBlocks } = useContext(BlockContext);

  console.log("Liste :", blocks);

  const removeBlock = (blockAtom: BlockAtomType) => {
    setBlocks((prev) => prev.filter((item) => item !== blockAtom));
  };

  if (!blocks || !blocks.length) return null;

  return (
    <div className="BlocksContent">
      {blocks.map((block, index) => (
        <>
          <Block key={index} blockAtom={block} />
          <button
            onClick={() =>
              setBlocks((prev) => prev.filter((item) => item !== block))
            }
          >
            Supprimer
          </button>
        </>
      ))}
    </div>
  );
}
