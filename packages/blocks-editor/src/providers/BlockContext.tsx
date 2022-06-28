import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { BlocksGroupContext } from "./BlockGroupContext";
import { IBlock } from "../types/types";

export const BlockContext = createContext<{
  blocks: IBlock[];
  setBlocks: Dispatch<SetStateAction<IBlock[]>>;
}>({ blocks: [], setBlocks: () => [] });

export const BlockContextProvider = ({
  children,
  defaultBlocks,
  root = false,
}: {
  children: ReactElement;
  defaultBlocks?: IBlock[];
  root?: boolean;
}) => {
  const [blocks, setBlocks] = useState<IBlock[]>(defaultBlocks || []);
  const { group } = useContext(BlocksGroupContext);

  useEffect(() => {
    if (root && group?.jsonContent) {
      setBlocks(JSON.parse(group?.jsonContent));
    }
  }, [group?.jsonContent, root]);

  return (
    <BlockContext.Provider value={{ blocks, setBlocks }}>
      {children}
    </BlockContext.Provider>
  );
};
