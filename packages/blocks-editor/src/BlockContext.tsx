import React, {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import { IBlock } from "./types";
import { reorder } from "./utils/array";

export const BlockContext = createContext<{
  blocks: IBlock[];
  setBlocks: Dispatch<SetStateAction<IBlock[]>>;
}>({ blocks: [], setBlocks: () => [] });

export const BlockContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [blocks, setBlocks] = useState<IBlock[]>([]);

  const { data = [] } = useSWR("/block_group?id=24");

  useEffect(() => {
    if (data.jsonContent) {
      const blocksFromServer = JSON.parse(data.jsonContent);

      setBlocks(blocksFromServer);
    }
  }, [data]);

  return (
    <BlockContext.Provider value={{ blocks, setBlocks }}>
      {children}
    </BlockContext.Provider>
  );
};

export const useBlocksContext = () => {
  const { blocks, setBlocks } = useContext(BlockContext);

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

  const moveBlockUp = (blockId: string) => {
    const index = blocks.findIndex((block) => block.id === blockId);

    if (index !== -1 && index !== 0) {
      setBlocks((blocks) => [...reorder(blocks, index, index - 1)]);
    }
  };

  const moveBlockDown = (blockId: string) => {
    const index = blocks.findIndex((block) => block.id === blockId);

    if (index !== -1 && index < blocks.length) {
      setBlocks((blocks) => [...reorder(blocks, index, index + 1)]);
    }
  };

  const moveBlockTo = (blockId: string, to: number) => {
    const index = blocks.findIndex((block) => block.id === blockId);

    if (typeof to === "number" && to <= blocks.length) {
      setBlocks((blocks) => [...reorder(blocks, index, to)]);
    }
  };

  return {
    addBlock,
    removeBlock,
    updateBlock,
    moveBlockUp,
    moveBlockDown,
    moveBlockTo,
  };
};
