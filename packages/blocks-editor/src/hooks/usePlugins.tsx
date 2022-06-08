import {
  Accordion,
  Button,
  Columns,
  List,
  Product,
  Raw,
  Separator,
  Text,
  Title,
  Video,
} from "../blocks";
import { useEffect, useState } from "react";

import { Plugin } from "../types/types";
import { nanoid } from "nanoid";

export const TB_DEFAULT_PLUGINS: Plugin[] = [
  { id: nanoid(), ...Text },
  { id: nanoid(), ...Title },
  { id: nanoid(), ...Button },
  { id: nanoid(), ...List },
  { id: nanoid(), ...Video },
  { id: nanoid(), ...Raw },
  { id: nanoid(), ...Accordion },
  { id: nanoid(), ...Separator },
  { id: nanoid(), ...Product },
  ...Object.values(Columns).map((colType) => ({ id: nanoid(), ...colType })),
];

declare const window: { eventTBPlugins: any; TB__PLUGINS: any[] };
window.eventTBPlugins = new CustomEvent("update-tb-plugins");

export function registerPlugin(plugin: any) {
  if (!window.TB__PLUGINS) window.TB__PLUGINS = [];

  window.TB__PLUGINS.push({ ...plugin, id: nanoid() } as Plugin);

  document.dispatchEvent(window.eventTBPlugins);
}

export function usePlugins() {
  const [plugins, setPlugins] = useState<Plugin[]>([
    ...TB_DEFAULT_PLUGINS,
    ...(window.TB__PLUGINS || []),
  ]);

  useEffect(() => {
    const fn = () => {
      setPlugins([...TB_DEFAULT_PLUGINS, ...window.TB__PLUGINS]);
    };

    document.addEventListener("update-tb-plugins", fn);

    () => {
      document.removeEventListener("update-tb-plugins", fn);
    };
  }, []);

  return plugins;
}
