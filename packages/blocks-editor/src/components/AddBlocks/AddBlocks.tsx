import { IBlock, Plugin } from "../../types/types";
import { groupBy, partition } from "lodash";

import { nanoid } from "nanoid";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";
import Tippy from "@tippyjs/react";
import BlockTooltip from "../BlockTooltip";

function AddButton({ plugin }: { plugin: Plugin }) {
  const { addBlock } = useBlocksContext();

  return (
    <Tippy
      content={
        <BlockTooltip
          title={plugin.title.fr_FR}
          description={plugin?.description?.fr_FR}
        />
      }
    >
      <button
        className="BlocksEditor-btn bg-white border-slate-500 text-slate-500 px-2 py-1 border hover:bg-slate-900 hover:text-slate-100 hover:border-slate-900"
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
        {plugin.title.fr_FR}
      </button>
    </Tippy>
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
    availablePLugins = plugins.filter((plugin) => !excludeLayout.includes(plugin.layout));
  }

  const [commonBlocks, layoutPlugins] = partition(availablePLugins, (i) => !i.layout);
  const layoutPluginsByType = groupBy(layoutPlugins, "layout");

  return (
    <div className="BlocksEditor-AddBlocks flex justify-center gap-2">
      <ol className="flex gap-2">
        {commonBlocks.map((plugin, index) => {
          return <AddButton key={index} plugin={plugin} />;
        })}
      </ol>
      <ol className="flex gap-2">
        {Object.entries(layoutPluginsByType).map(
          ([layoutType, layoutPluginsByType], index) => {
            return (
              <li key={index} className="BlocksEditor-dropdown group inline-block">
                <button className="BlocksEditor-btn border-slate-500 text-slate-500 px-2 py-1 border hover:bg-slate-900 hover:text-slate-100 hover:border-slate-900">
                  {layoutType}
                </button>
                <ol className="BlocksEditor-dropdown__content hidden group-hover:block absolute">
                  {layoutPluginsByType.map((plugin, index) => (
                    <AddButton key={index} plugin={plugin} />
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
