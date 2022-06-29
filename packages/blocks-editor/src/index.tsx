import "./index.css";
import "tippy.js/dist/tippy.css";

import BlocksEditor from "./BlocksEditor";
import BlocksList from "./BlocksList";
import { registerPlugin } from "./hooks/usePlugins";

export type { BlockModuleComponentProps, BlockPluginDefinition } from "./types/types";

export { BlocksEditor, BlocksList, registerPlugin };
