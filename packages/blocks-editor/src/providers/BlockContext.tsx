import * as React from "react";
import useSWR from "swr";
import { IBlock } from "../types/types";

export const BlockContext = React.createContext<{
  blocks: IBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<IBlock[]>>;
}>({ blocks: [], setBlocks: () => [] });

export const BlockContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [blocks, setBlocks] = React.useState<IBlock[]>([]);

  /* const { data = [] } = useSWR("/block_group?id=24");

  React.useEffect(() => {
    if (data.jsonContent) {
      setBlocks(JSON.parse(data.jsonContent));
    }
  }, [data]); */

  return (
    <BlockContext.Provider value={{ blocks, setBlocks }}>
      {children}
    </BlockContext.Provider>
  );
};
