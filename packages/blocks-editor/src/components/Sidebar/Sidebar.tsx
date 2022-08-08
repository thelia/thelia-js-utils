import { nanoid } from "nanoid";
import { Fragment, useState } from "react";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";
import { ReactComponent as Retract } from "../../../assets/svg/retract.svg";
import { ReactComponent as Expand } from "../../../assets/svg/expand.svg";
import { Plugin } from "../../types/types";
import Tippy from "@tippyjs/react";
import BlockTooltip from "../BlockTooltip";
import { groupBy, partition } from "lodash";

import "./Sidebar.css";
import { useIntl } from "react-intl";

const AddButton = ({
  plugin,
  isSidebarOpen,
}: {
  plugin: Plugin;
  isSidebarOpen: boolean;
}) => {
  const { addBlock } = useBlocksContext();
  const intl = useIntl();

  const Icon = plugin?.icon;

  return (
    <Tippy
      content={
        <BlockTooltip
          title={plugin.title[intl.locale || "default"]}
          description={plugin?.description?.[intl.locale || "default"]}
        />
      }
      placement="left"
      delay={[500, 0]}
    >
      <button
        className={`Sidebar__Add ${
          isSidebarOpen && plugin?.customIcon ? "Sidebar__Add--withCustomIcon" : ""
        } ${isSidebarOpen ? "Sidebar__Add--expanded" : "Sidebar__Add--collapsed"}`}
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
          <Icon className="Sidebar__Add__Icon" />
        )}

        {isSidebarOpen ? plugin.title[intl.locale || "default"] : null}
      </button>
    </Tippy>
  );
};

const Sidebar = () => {
  const plugins = usePlugins();
  const intl = useIntl();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDisplayingSubMenu, setIsDisplayingSubMenu] = useState(false);

  const [commonBlocks, layoutPlugins] = partition(plugins, (i) => !i.layout);
  const layoutPluginsByType = groupBy(
    layoutPlugins,
    `layout["${intl.locale || "default"}"]`
  );

  const [pluginList, setPluginList] = useState<Plugin[]>(commonBlocks || []);

  return (
    <div className="Sidebar">
      <div className="Sidebar__Header">
        <button
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);

            if (isDisplayingSubMenu) {
              setPluginList(commonBlocks);
              setIsDisplayingSubMenu(false);
            }
          }}
          className={`${
            isSidebarOpen
              ? "Sidebar__Header__Toggle--open"
              : "Sidebar__Header__Toggle--closed"
          }`}
        >
          {isSidebarOpen ? <Retract /> : <Expand />}
        </button>
        {isSidebarOpen ? (
          <span className="Sidebar__Header__Title">
            {intl.formatMessage({ id: "CONTENTS" })}
          </span>
        ) : null}
      </div>

      <div className="Sidebar__Content__Wrapper">
        {isDisplayingSubMenu && (
          <button
            className="Sidebar__Back"
            onClick={() => {
              setPluginList(commonBlocks);
              setIsDisplayingSubMenu(false);
            }}
          >
            <i className="fa fa-chevron-left"></i>
            <span className="Sidebar__Back__Label">
              {intl.formatMessage({ id: "BACK" })}
            </span>
          </button>
        )}

        <ol className="Sidebar__Content">
          {pluginList.map((plugin) => (
            <AddButton plugin={plugin} isSidebarOpen={isSidebarOpen} key={plugin.id} />
          ))}

          {!isDisplayingSubMenu &&
            Object.entries(layoutPluginsByType).map(
              ([layoutType, layoutPluginsByType], index) => {
                const LayoutIcon = layoutPluginsByType[index].icon;

                return (
                  <Fragment key={index}>
                    {layoutPluginsByType.length === 1 ? (
                      <AddButton
                        plugin={layoutPluginsByType[index]}
                        isSidebarOpen={isSidebarOpen}
                      />
                    ) : (
                      <button
                        className={`Sidebar__Add ${
                          isSidebarOpen
                            ? "Sidebar__Add--expanded"
                            : "Sidebar__Add--collapsed"
                        }`}
                        onClick={() => {
                          setPluginList(layoutPluginsByType);
                          setIsDisplayingSubMenu(true);
                          setIsSidebarOpen(true);
                        }}
                      >
                        <LayoutIcon />

                        {isSidebarOpen ? layoutType : null}
                      </button>
                    )}
                  </Fragment>
                );
              }
            )}
        </ol>
      </div>
    </div>
  );
};

export default Sidebar;
