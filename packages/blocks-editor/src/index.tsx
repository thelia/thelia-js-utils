import "./index.css";
import "tippy.js/dist/tippy.css";

import BlocksEditor from "./BlocksEditor";
import BlocksList from "./BlocksList";
import LinkBlockToItem from "./components/LinkBlockToItem/LinkBlockToItem";
import { registerPlugin } from "./hooks/usePlugins";
import { nanoid } from "nanoid";
import { LocaleContext, LocaleProvider } from "./providers/LocaleContext";

export type {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  IBlock,
} from "./utils/types";

import * as blocks from "./blocks";
import * as components from "./components";

export {
  BlocksEditor,
  BlocksList,
  registerPlugin,
  LinkBlockToItem,
  LocaleContext,
  LocaleProvider,
  blocks,
  components,
  nanoid as generateId,
};
