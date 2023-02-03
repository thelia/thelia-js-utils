import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { BlocksGroupContext } from "./BlockGroupContext";
import { IBlock } from "../types/types";
import { isEqual } from "lodash";
import { useGlobalHasChanged } from "../utils/globalState";

export const BlockContext = createContext<{
  blocks: IBlock[];
  setBlocks: Dispatch<SetStateAction<IBlock[]>>;
}>({
  blocks: [],
  setBlocks: () => [],
});

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
  const [, setHasChanged] = useGlobalHasChanged();

  useEffect(() => {
    if (blocks.length > 0 || group?.jsonContent !== undefined) {
      setHasChanged(!isEqual(group?.jsonContent, blocks));
    }
  }, [group?.jsonContent, blocks]);

  useEffect(() => {
    if (root && group) {
      setBlocks(group?.jsonContent || []);
    }
  }, [group?.jsonContent, root]);

  useEffect(() => {
    if (defaultBlocks) {
      setBlocks(defaultBlocks);
    }
  }, [defaultBlocks]);

  return (
    <BlockContext.Provider value={{ blocks: blocks || [], setBlocks }}>
      {children}
    </BlockContext.Provider>
  );
};
