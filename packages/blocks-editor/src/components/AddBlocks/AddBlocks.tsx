import * as React from "react";

import { groupBy, keys, partition } from "lodash";

import { Plugin } from "../../types/types";
import { nanoid } from "nanoid";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";

function AddButton({ plugin }: { plugin: Plugin }) {
  const { addBlock } = useBlocksContext();
  return (
    <button
      onClick={() =>
        addBlock({
          id: nanoid(),
          data: plugin.initialData,
          parent: null,
          type: { id: plugin.type.id },
        })
      }
      key={plugin.id}
    >
      {plugin.title.default}
    </button>
  );
}

export default function AddBlock() {
  const plugins = usePlugins();

  const [commontBlocks, layoutPlugins] = partition(plugins, (i) => !i.layout);
  const layoutPluginsByType = groupBy(layoutPlugins, "layout");

  return (
    <div>
      <ol>
        {commontBlocks.map((plugin) => {
          return <AddButton plugin={plugin} />;
        })}
      </ol>
      <ol>
        {Object.entries(layoutPluginsByType).map(
          ([layoutType, layoutPluginsByType]) => {
            return (
              <li>
                <div>{layoutType}</div>
                <ol>
                  {layoutPluginsByType.map((plugin) => (
                    <AddButton plugin={plugin} />
                  ))}
                </ol>
              </li>
            );
          }
        )}
      </ol>
    </div>
  );
}
