import "./index.css";
import "tippy.js/dist/tippy.css";

import BlocksEditor from "./BlocksEditor";
import BlocksList from "./BlocksList";
import LinkBlockToItem from "./components/LinkBlockToItem/LinkBlockToItem";
import { registerPlugin } from "./hooks/usePlugins";
import { nanoid } from "nanoid";

export type {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  IBlock,
} from "./types/types";

import * as blocks from "./blocks";

export {
  BlocksEditor,
  BlocksList,
  registerPlugin,
  LinkBlockToItem,
  blocks,
  nanoid as generateId,
};
