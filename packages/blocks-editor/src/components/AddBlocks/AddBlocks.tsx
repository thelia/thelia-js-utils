import { IBlock, Plugin } from "../../types/types";
import { groupBy, partition } from "lodash";

import { nanoid } from "nanoid";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";

function AddButton({ plugin }: { plugin: Plugin }) {
  const { addBlock } = useBlocksContext();
  return (
    <button
      className="BlocksEditor-btn border-slate-500 text-slate-500 px-2 py-1 border hover:bg-slate-900 hover:text-slate-100 hover:border-slate-900"
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

export default function AddBlock({
  excludeLayout,
}: {
  excludeLayout?: IBlock["layout"][];
}) {
  const plugins = usePlugins();
  let availablePLugins = plugins;

  if (excludeLayout) {
    availablePLugins = plugins.filter(
      (plugin) => !excludeLayout.includes(plugin.layout)
    );
  }

  const [commontBlocks, layoutPlugins] = partition(
    availablePLugins,
    (i) => !i.layout
  );
  const layoutPluginsByType = groupBy(layoutPlugins, "layout");

  return (
    <div className="BlocksEditor-AddBlocks flex gap-4">
      <ol className="flex gap-2">
        {commontBlocks.map((plugin) => {
          return <AddButton plugin={plugin} />;
        })}
      </ol>
      <ol>
        {Object.entries(layoutPluginsByType).map(
          ([layoutType, layoutPluginsByType]) => {
            return (
              <li className="BlocksEditor-dropdown group inline-block relative">
                <button className="BlocksEditor-btn border-slate-500 text-slate-500 px-2 py-1 border hover:bg-slate-900 hover:text-slate-100 hover:border-slate-900">
                  {layoutType}
                </button>
                <ol className="BlocksEditor-dropdown__content hidden group-hover:block absolute">
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
