import * as React from "react";

import { useCreateOrUpdateGroup, useGroup } from "../utils/queries";

import { BlockContext } from "../providers/BlockContext";
import { IBlock } from "../types/types";
import { reorder } from "../utils/array";

export const useBlocksContext = () => {
  const { blocks, setBlocks } = React.useContext(BlockContext);

  const findBlockIndex = React.useCallback(
    (blockId: string) => blocks.findIndex((block) => block.id === blockId),
    []
  );

  const addBlock = React.useCallback((newBlock: IBlock) => {
    setBlocks((blocks) => [...blocks, newBlock]);
  }, []);

  const removeBlock = React.useCallback((blockId: string) => {
    setBlocks((blocks) => blocks.filter((block) => block.id !== blockId));
  }, []);

  const updateBlock = React.useCallback((blockId: string, data: {}) => {
    setBlocks((blocks) =>
      blocks.map((block) => (block.id === blockId ? { ...block, data } : block))
    );
  }, []);

  const moveBlockUp = React.useCallback((blockIndex: number) => {
    if (blockIndex !== -1 && blockIndex !== 0) {
      setBlocks((blocks) => [...reorder(blocks, blockIndex, blockIndex - 1)]);
    }
  }, []);

  const moveBlockDown = React.useCallback((blockIndex: number) => {
    if (blockIndex !== -1 && blockIndex < blocks.length) {
      setBlocks((blocks) => [...reorder(blocks, blockIndex, blockIndex + 1)]);
    }
  }, []);

  const moveBlockTo = React.useCallback((blockIndex: number, to: number) => {
    if (typeof to === "number" && to <= blocks.length) {
      setBlocks((blocks) => [...reorder(blocks, blockIndex, to)]);
    }
  }, []);

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
