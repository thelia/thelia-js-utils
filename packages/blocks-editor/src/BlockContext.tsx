import {
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

  const addBlock = (block: IBlock) => {
    setBlocks((blocks: IBlock[]) => [...blocks, block]);
  };

  const removeBlock = (block: IBlock) => {
    setBlocks((blocks: any) => blocks.filter((item: any) => item !== block));
  };

  const updateBlock = (blockId: string, data: {}) => {
    setBlocks((blocks: IBlock[]) =>
      blocks.map((block: IBlock) =>
        block.id === blockId ? { ...block, data } : block
      )
    );
  };

  const moveBlockUp = (blockId: string) => {
    const index = blocks.findIndex((block) => block.id === blockId);

    if (index !== -1 && index !== 0) {
      setBlocks((blocks: IBlock[]) => [...reorder(blocks, index, index - 1)]);
    }
  };

  const moveBlockDown = (blockId: string) => {
    const index = blocks.findIndex((block) => block.id === blockId);

    if (index !== -1 && index < blocks.length) {
      setBlocks((blocks: IBlock[]) => [...reorder(blocks, index, index + 1)]);
    }
  };

  return { addBlock, removeBlock, updateBlock, moveBlockUp, moveBlockDown };
};
