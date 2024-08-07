import { useCallback, useContext } from "react";

import { BlockContext } from "../providers/BlockContext";
import { IBlock } from "../utils/types";
import { reorder } from "../utils/array";

export const useBlocksContext = () => {
  const { blocks, setBlocks } = useContext(BlockContext);

  const findBlockIndex = useCallback(
    (blockId: string) => blocks.findIndex((block) => block.id === blockId),
    []
  );

  const addBlock = useCallback((newBlock: IBlock) => {
    setBlocks((blocks) => [...blocks, newBlock]);
  }, []);

  const removeBlock = useCallback((blockId: string) => {
    setBlocks((blocks) => blocks.filter((block) => block.id !== blockId));
  }, []);

  const updateBlock = useCallback((blockId: string, data: {}) => {
    setBlocks((blocks) =>
      blocks.map((block) => (block.id === blockId ? { ...block, data } : block))
    );
  }, []);

  const moveBlockUp = useCallback((blockIndex: number) => {
    if (blockIndex !== -1 && blockIndex !== 0) {
      setBlocks((blocks) => [...reorder(blocks, blockIndex, blockIndex - 1)]);
    }
  }, []);

  const moveBlockDown = useCallback((blockIndex: number) => {
    if (blockIndex !== -1 && blockIndex < blocks.length) {
      setBlocks((blocks) => [...reorder(blocks, blockIndex, blockIndex + 1)]);
    }
  }, []);

  /* We need to have the ‘blocks’ in the dependencies because if we don't,
     the ‘blocks’ variable in the ‘if’ remains at the initial value of the state. */
  const moveBlockTo = useCallback(
    (blockIndex: number, to: number) => {
      if (typeof to === "number" && to <= blocks.length) {
        setBlocks((blocks) => [...reorder(blocks, blockIndex, to)]);
      }
    },
    [blocks]
  );

  const resetBlocks = useCallback(() => {
    setBlocks([]);
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
    resetBlocks,
  };
};
