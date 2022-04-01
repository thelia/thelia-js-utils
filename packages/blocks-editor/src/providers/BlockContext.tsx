import * as React from "react";

import { IBlock } from "../types/types";
import useSWR from "swr";

export const BlockContext = React.createContext<{
  blocks: IBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<IBlock[]>>;
}>({ blocks: [], setBlocks: () => [] });

export const BlockContextProvider = ({
  children,
  defaultBlocks,
}: {
  children: React.ReactElement;
  defaultBlocks?: IBlock[];
}) => {
  const [blocks, setBlocks] = React.useState<IBlock[]>(defaultBlocks || []);

  return (
    <BlockContext.Provider value={{ blocks, setBlocks }}>
      {children}
    </BlockContext.Provider>
  );
};
