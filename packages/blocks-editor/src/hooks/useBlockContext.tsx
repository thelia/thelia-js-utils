import * as React from "react";
import { BlockContext } from "../providers/BlockContext";
import { IBlock } from "../types/types";
import { reorder } from "../utils/array";

export const useBlocksContext = () => {
  const { blocks, setBlocks } = React.useContext(BlockContext);

  const findBlockIndex = (blockId: string) =>
    blocks.findIndex((block) => block.id === blockId);

  const addBlock = (newBlock: IBlock) => {
    setBlocks((blocks) => [...blocks, newBlock]);
  };

  const removeBlock = (blockId: string) => {
    setBlocks((blocks) => blocks.filter((block) => block.id !== blockId));
  };

  const updateBlock = (blockId: string, data: {}) => {
    setBlocks((blocks) =>
      blocks.map((block) => (block.id === blockId ? { ...block, data } : block))
    );
  };

  const moveBlockUp = (blockIndex: number) => {
    if (blockIndex !== -1 && blockIndex !== 0) {
      setBlocks((blocks) => [...reorder(blocks, blockIndex, blockIndex - 1)]);
    }
  };

  const moveBlockDown = (blockIndex: number) => {
    if (blockIndex !== -1 && blockIndex < blocks.length) {
      setBlocks((blocks) => [...reorder(blocks, blockIndex, blockIndex + 1)]);
    }
  };

  const moveBlockTo = (blockIndex: number, to: number) => {
    if (typeof to === "number" && to <= blocks.length) {
      setBlocks((blocks) => [...reorder(blocks, blockIndex, to)]);
    }
  };

  return {
    addBlock,
    removeBlock,
    updateBlock,
    moveBlockUp,
    moveBlockDown,
    moveBlockTo,
    findBlockIndex,
    blockList: blocks,
  };
};
