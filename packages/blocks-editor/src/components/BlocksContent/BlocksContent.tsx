import * as React from "react";
import { useBlocksContext } from "../../hooks/useBlockContext";
import Block from "../Block";

export default function BlocksContent() {
  const { blockList } = useBlocksContext();
  console.log("Liste :", blockList);

  if (!blockList || !blockList.length) return null;

  return (
    <div className="BlocksContent px-60 py-28">
      {blockList.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}
