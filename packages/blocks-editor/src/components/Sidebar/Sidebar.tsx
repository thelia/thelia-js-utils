import { nanoid } from "nanoid";
import { useState } from "react";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";
import { ReactComponent as Retract } from "../../../assets/svg/retract.svg";
import { ReactComponent as Expand } from "../../../assets/svg/expand.svg";
import { Plugin } from "../../types/types";
import Tippy from "@tippyjs/react";
import BlockTooltip from "../BlockTooltip";
import { groupBy, partition } from "lodash";

const AddButton = ({
  plugin,
  isSidebarOpen,
}: {
  plugin: Plugin;
  isSidebarOpen: boolean;
}) => {
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
        className={`BlocksEditor-btn flex ${
          isSidebarOpen && plugin?.customIcon ? "flex-col h-max py-6" : "h-9"
        } items-center bg-pearlMedium hover:bg-pearlLight rounded-md text-mediumCharbon text-sm gap-3 p-2 ${
          isSidebarOpen ? "w-52" : "w-9"
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
        {isSidebarOpen && plugin?.customIcon ? (
          plugin?.customIcon
        ) : (
          <Icon className="w-6" />
        )}

        {isSidebarOpen ? <>{plugin.title.fr_FR}</> : null}
      </button>
    </Tippy>
  );
};

const Sidebar = () => {
  const plugins = usePlugins();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDisplayingSubMenu, setIsDisplayingSubMenu] = useState(false);

  const [commonBlocks, layoutPlugins] = partition(plugins, (i) => !i.layout);
  const layoutPluginsByType = groupBy(layoutPlugins, "layout");

  const [pluginList, setPluginList] = useState<Plugin[]>(commonBlocks || []);

  return (
    <div className="Sidebar sticky top-0 z-20 flex flex-col w-max">
      <div className="Sidebar-header bg-darkCharbon text-white p-5">
        <button
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);

            if (isDisplayingSubMenu) {
              setPluginList(commonBlocks);
              setIsDisplayingSubMenu(false);
            }
          }}
          className={`${isSidebarOpen && "mr-5"}`}
        >
          {isSidebarOpen ? <Retract /> : <Expand />}
        </button>
        {isSidebarOpen ? <span className="font-bold">Contenus</span> : null}
      </div>

      <div className="Sidebar-content p-3 h-full">
        {isDisplayingSubMenu && (
          <button
            className="bg-pearlMedium hover:bg-pearlLight text-mediumCharbon text-sm p-2 px-3 rounded-md mb-2 flex gap-3 w-full items-center"
            onClick={() => {
              setPluginList(commonBlocks);
              setIsDisplayingSubMenu(false);
            }}
          >
            <i className="fa fa-chevron-left"></i>
            <span className="font-bold">Retour</span>
          </button>
        )}

        <ol className="flex flex-col gap-2">
          {pluginList.map((plugin) => (
            <AddButton plugin={plugin} isSidebarOpen={isSidebarOpen} key={plugin.id} />
          ))}

          {!isDisplayingSubMenu &&
            Object.entries(layoutPluginsByType).map(
              ([layoutType, layoutPluginsByType], index) => {
                const LayoutIcon = layoutPluginsByType[index].icon;

                return (
                  <li key={index} className="inline-block BlocksEditor-dropdown group">
                    {layoutPluginsByType.length === 1 ? (
                      <AddButton
                        plugin={layoutPluginsByType[index]}
                        isSidebarOpen={isSidebarOpen}
                      />
                    ) : (
                      <button
                        className={`BlocksEditor-btn flex items-center bg-pearlMedium hover:bg-pearlLight rounded-md text-mediumCharbon text-sm gap-3 p-2 h-9 ${
                          isSidebarOpen ? "w-52" : "w-9"
                        }`}
                        onClick={() => {
                          setPluginList(layoutPluginsByType);
                          setIsDisplayingSubMenu(true);
                          setIsSidebarOpen(true);
                        }}
                        key={index}
                      >
                        <LayoutIcon />

                        {isSidebarOpen ? layoutType : null}
                      </button>
                    )}
                  </li>
                );
              }
            )}
        </ol>
      </div>
    </div>
  );
};

export default Sidebar;
