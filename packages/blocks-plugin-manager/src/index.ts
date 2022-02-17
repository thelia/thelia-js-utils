import {
  Image,
  List,
  Raw,
  Text,
  Title,
  Video,
} from "@thelia/blocks-components";
import { useEffect, useState } from "react";

import { nanoid } from "nanoid";

export const TB_DEFAULT_PLUGINS: any[] = [
  { id: nanoid(), ...Text },
  { id: nanoid(), ...Title },
  { id: nanoid(), ...Image },
  { id: nanoid(), ...List },
  { id: nanoid(), ...Video },
  { id: nanoid(), ...Raw },
];

declare const window: { eventTBPlugins: any; TB__PLUGINS: any[] };
window.eventTBPlugins = new CustomEvent("update-tb-plugins");

export function registerPlugin(plugin: any) {
  if (!window.TB__PLUGINS) window.TB__PLUGINS = [];

  window.TB__PLUGINS.push({ ...plugin, id: nanoid() } as any);

  document.dispatchEvent(window.eventTBPlugins);
}

export function usePlugins() {
  const [plugins, setPlugins] = useState([
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
