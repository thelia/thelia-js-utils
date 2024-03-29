import { useEffect, useState } from "react";
import { Plugin } from "../utils/types";
import { nanoid } from "nanoid";
import {
  Accordion,
  Button,
  Columns,
  Product,
  Category,
  Table,
  Raw,
  Separator,
  List,
  Group,
  Text,
  Title,
  Highlight,
  Video,
} from "../blocks";

export const TB_DEFAULT_PLUGINS: any = [
  ...Object.values(Columns).map((colType) => ({ id: nanoid(), ...colType })),
  { id: nanoid(), ...Title },
  { id: nanoid(), ...Text },
  { id: nanoid(), ...Highlight },
  { id: nanoid(), ...List },
  { id: nanoid(), ...Button },
  { id: nanoid(), ...Separator },
  { id: nanoid(), ...Accordion },
  { id: nanoid(), ...Product },
  { id: nanoid(), ...Category },
  { id: nanoid(), ...Group },
  { id: nanoid(), ...Table },
  { id: nanoid(), ...Raw },
  { id: nanoid(), ...Video },
];

declare const window: { eventTBPlugins: any; TB__PLUGINS: any[] };
window.eventTBPlugins = new CustomEvent("update-tb-plugins");

export function registerPlugin(plugin: any) {
  if (!window.TB__PLUGINS) window.TB__PLUGINS = [];

  const alreadyExist = window.TB__PLUGINS.find((p) => p.type.id === plugin.type.id);

  if (alreadyExist) return;

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
