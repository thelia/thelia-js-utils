import { IBlock, Plugin } from "../../types/types";

import BlockTooltip from "../BlockTooltip";
import { ReactComponent as DragIcon } from "../../../assets/svg/drag.svg";
import Modal from "react-modal";
import Tippy from "@tippyjs/react";
import groupBy from "lodash/groupBy";
import { nanoid } from "nanoid";
import partition from "lodash/partition";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";
import useWindowSize from "../../hooks/useWindowSize";
import { CSSProperties, ReactNode, useState } from "react";

import "./AddBlocks.css";

const AddButton = ({
  plugin,
  setIsOpen,
  style,
}: {
  plugin: Plugin;
  setIsOpen: Function;
  style?: CSSProperties;
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
      delay={[500, 0]}
    >
      <button
        style={style}
        className="AddBlocks__Modal__Add"
        onClick={() => {
          addBlock({
            id: nanoid(),
            data: plugin.initialData,
            parent: null,
            type: { id: plugin.type.id },
          });
          setIsOpen(false);
        }}
        key={plugin.id}
      >
        {plugin?.customIcon ? plugin?.customIcon : <Icon />}
        {plugin.title.fr_FR}
      </button>
    </Tippy>
  );
};

const AddBlockModal = ({
  children,
  title,
  isOpen,
  setIsOpen,
}: {
  children?: ReactNode;
  title: string;
  isOpen: boolean;
  setIsOpen: Function;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      overlayClassName="Overlay"
      className="Modal-TheliaBlocks"
    >
      <div className="AddBlocks__Modal">
        <button onClick={() => setIsOpen(false)} className="AddBlocks__Modal__Close">
          <i className="AddBlocks__Modal__Close__Icon fa fa-xmark"></i>
        </button>
        <div className="AddBlocks__Modal__Content">
          <div className="AddBlocks__Modal__Title">{title}</div>
          <div className="AddBlocks__Modal__BlocksList__Wrapper">{children}</div>
        </div>
      </div>
    </Modal>
  );
};

const ModalContent = ({
  excludeLayout,
  setIsOpen,
}: {
  excludeLayout?: IBlock["layout"][];
  setIsOpen: Function;
}) => {
  const [subModalOpen, setSubModalOpen] = useState(false);
  const { width } = useWindowSize();
  const plugins = usePlugins();
  let availablePLugins = plugins;

  if (excludeLayout) {
    availablePLugins = plugins.filter((plugin) => !excludeLayout.includes(plugin.layout));
  }

  const [commonBlocks, layoutPlugins] = partition(availablePLugins, (i) => !i.layout);
  const layoutPluginsByType = groupBy(layoutPlugins, "layout");

  return (
    <ol className="AddBlocks__Modal__BlocksList">
      {commonBlocks.map((plugin, index) => {
        return <AddButton key={index} plugin={plugin} setIsOpen={setIsOpen} />;
      })}

      {Object.entries(layoutPluginsByType).map(
        ([layoutType, layoutPluginsByType], index) => {
          const LayoutIcon = layoutPluginsByType[index].icon;

          return (
            <>
              {layoutPluginsByType.length === 1 ? (
                <AddButton plugin={layoutPluginsByType[index]} setIsOpen={setIsOpen} />
              ) : (
                <>
                  <button
                    onClick={() => setSubModalOpen(true)}
                    className="AddBlocks__Modal__Add"
                  >
                    <LayoutIcon />
                    {layoutType}
                  </button>
                  <AddBlockModal
                    title="Choisissez le nombre de colonnes"
                    isOpen={subModalOpen}
                    setIsOpen={setSubModalOpen}
                  >
                    <ol className="AddBlocks__Modal__LayoutBlocksList">
                      {layoutPluginsByType.map((plugin, index) => (
                        <AddButton
                          style={{ flex: width > 768 ? "0 0 32%" : "0 0 100%" }}
                          key={index}
                          plugin={plugin}
                          setIsOpen={setIsOpen}
                        />
                      ))}
                    </ol>
                  </AddBlockModal>
                </>
              )}
            </>
          );
        }
      )}
    </ol>
  );
};

const AddBlocks = ({ excludeLayout }: { excludeLayout?: IBlock["layout"][] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="AddBlocks">
        <div className="AddBlocks__Icon">
          <DragIcon />
        </div>
        <span className="AddBlocks__Info">
          Glissez-déposez le type de contenu souhaité depuis le menu de droite
        </span>
        <button className="AddBlocks__Button" onClick={() => setIsOpen(true)}>
          Ajouter du contenu
        </button>
      </div>
      <AddBlockModal
        title="Choisissez le contenu souhaité"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <ModalContent excludeLayout={excludeLayout} setIsOpen={setIsOpen} />
      </AddBlockModal>
    </>
  );
};

export default AddBlocks;
