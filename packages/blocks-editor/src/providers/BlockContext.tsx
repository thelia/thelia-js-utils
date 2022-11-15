import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { isEqual, isEqualWith } from "lodash";

import { BlocksGroupContext } from "./BlockGroupContext";
import { IBlock } from "../types/types";
import { usePrevious } from "react-use";

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
  const prevBlocks = usePrevious(blocks);
  const { group } = useContext(BlocksGroupContext);
  const hasChanged = prevBlocks && blocks && !isEqual(prevBlocks, blocks);
  console.log(group?.jsonContent);

  useEffect(() => {
    if (root && group) {
      setBlocks(group?.jsonContent);
    }
  }, [group?.jsonContent, root]);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    if (root && hasChanged) {
      window.addEventListener("beforeunload", handler);
      return () => {
        window.removeEventListener("beforeunload", handler);
      };
    }

    return () => {};
  }, [root, hasChanged]);

  return (
    <BlockContext.Provider value={{ blocks, setBlocks }}>
      {children}
    </BlockContext.Provider>
  );
};
