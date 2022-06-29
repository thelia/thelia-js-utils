import { nanoid } from "nanoid";
import { useState } from "react";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";
import { ReactComponent as Retract } from "../../../assets/svg/retract.svg";
import { ReactComponent as Expand } from "../../../assets/svg/expand.svg";
import { Plugin } from "../../types/types";
import Tippy from "@tippyjs/react";
import BlockTooltip from "../BlockTooltip";

const AddButton = ({ plugin, isOpen }: { plugin: Plugin; isOpen: boolean }) => {
  const { addBlock } = useBlocksContext();

  const Icon = plugin?.icon;

  return (
    <Tippy
      content={
        <BlockTooltip
          title={plugin.title.fr_FR}
          description={plugin?.description?.fr_FR}
        />
      }
      placement="left"
      delay={[500, 0]}
    >
      <button
        className={`BlocksEditor-btn flex items-center bg-pearlMedium hover:bg-pearlLight rounded-md text-mediumCharbon text-sm gap-3 p-2 h-9 ${
          isOpen ? "w-52" : "w-max"
        }`}
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
        <Icon className="w-6" />
        {isOpen ? <>{plugin.title.fr_FR}</> : null}
      </button>
    </Tippy>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const plugins = usePlugins();

  /* const [commonBlocks, layoutPlugins] = partition(plugins, (i) => !i.layout);
  const layoutPluginsByType = groupBy(layoutPlugins, "layout"); */

  return (
    <div className="Sidebar sticky top-0 z-20 flex flex-col w-max">
      <div className="Sidebar-header bg-darkCharbon text-white p-5">
        <button onClick={() => setIsOpen(!isOpen)} className={`${isOpen && "mr-5"}`}>
          {isOpen ? <Retract /> : <Expand />}
        </button>
        {isOpen ? <span className="font-bold">Contenus</span> : null}
      </div>

      <div className="Sidebar-content p-3 bg-white h-full">
        <ol className="flex flex-col gap-2">
          {plugins.map((plugin) => (
            <AddButton plugin={plugin} isOpen={isOpen} key={plugin.id} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Sidebar;
