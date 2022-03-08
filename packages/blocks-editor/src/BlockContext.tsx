import { atom, useAtom } from "jotai";
import { atomWithImmer, useImmerAtom } from "jotai/immer";
import { createContext, ReactElement, useEffect } from "react";
import useSWR from "swr";
import { BlockAtomType } from "./types";

const blocksAtom = atom<BlockAtomType[]>([]);

export const BlockContext = createContext<{
  blocks: BlockAtomType[];
  setBlocks: (blocks: BlockAtomType[]) => void;
  blocksAtom: any;
}>({ blocks: [], setBlocks: ([]) => [], blocksAtom });

export const BlockContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [blocks, setBlocks] = useAtom(blocksAtom);

  const { data = [] } = useSWR("/block_group?id=24");

  useEffect(() => {
    if (data.jsonContent) {
      const atoms = JSON.parse(data.jsonContent);

      setBlocks(atoms.map((item) => atom(item)));
    }
  }, [data]);

  return (
    <BlockContext.Provider value={{ blocks, setBlocks, blocksAtom }}>
      {children}
    </BlockContext.Provider>
  );
};
