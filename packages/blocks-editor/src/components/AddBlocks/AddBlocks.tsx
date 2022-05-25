import * as React from "react";

import { IBlock, Plugin } from "../../types/types";
import { groupBy, partition } from "lodash";

import BlockTooltip from "../BlockTooltip";
import { ReactComponent as DragIcon } from "../../../assets/svg/drag.svg";
import Modal from "react-modal";
import Tippy from "@tippyjs/react";
import { nanoid } from "nanoid";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";

const AddButton = ({
  plugin,
  setIsOpen,
}: {
  plugin: Plugin;
  setIsOpen: Function;
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
        className="flex flex-col items-center justify-center w-24 h-24 gap-2 rounded-md BlocksEditor-btn bg-pearlLight hover:bg-pearlMedium md:h-28 md:w-28"
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
        <Icon />
        {plugin.title.fr_FR}
      </button>
    </Tippy>
  );
};

export default function AddBlock({
  excludeLayout,
}: {
  excludeLayout?: IBlock["layout"][];
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-dotted rounded-md border-greyDark">
      <div className="p-2 rounded-full bg-pearlLight">
        <DragIcon />
      </div>
      <span className="my-4">Glissez-déposez le type de contenu souhaité</span>
      <button
        className="px-2 font-semibold border-2 rounded-md w-max border-vermillon text-vermillon hover:bg-vermillon hover:text-white md:px-4 md:py-1"
        onClick={() => setIsOpen(true)}
      >
        Ajouter du contenu
      </button>
      <AddBlockModal
        title="Choisissez le contenu souhaité"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <ModalContent excludeLayout={excludeLayout} setIsOpen={setIsOpen} />
      </AddBlockModal>
    </div>
  );
}

const AddBlockModal = ({
  children,
  title,
  isOpen,
  setIsOpen,
}: {
  children?: React.ReactNode;
  title: string;
  isOpen: boolean;
  setIsOpen: Function;
}) => {
  Modal.setAppElement("#thelia-blocks-root");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      overlayClassName="Overlay"
      className="Modal-addBlocks"
    >
      <div className="flex flex-col p-4 Modal-content">
        <button onClick={() => setIsOpen(false)} className="self-end">
          <i className="text-xl fa fa-xmark hover:text-vermillon md:text-3xl"></i>
        </button>
        <div className="lg:px-12 lg:pb-12">
          <div className="mt-3 mb-6 font-extrabold text-center md:text-left md:text-xl">
            {title}
          </div>
          <div className="flex flex-wrap BlocksEditor-AddBlocks">
            {children}
          </div>
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
  const [subModalOpen, setSubModalOpen] = React.useState(false);
  const plugins = usePlugins();
  let availablePLugins = plugins;

  if (excludeLayout) {
    availablePLugins = plugins.filter(
      (plugin) => !excludeLayout.includes(plugin.layout)
    );
  }

  const [commonBlocks, layoutPlugins] = partition(
    availablePLugins,
    (i) => !i.layout
  );
  const layoutPluginsByType = groupBy(layoutPlugins, "layout");

  return (
    <ol className="flex flex-wrap justify-center gap-4">
      {commonBlocks.map((plugin, index) => {
        return <AddButton key={index} plugin={plugin} setIsOpen={setIsOpen} />;
      })}

      {Object.entries(layoutPluginsByType).map(
        ([layoutType, layoutPluginsByType], index) => {
          return (
            <li
              key={index}
              className="inline-block BlocksEditor-dropdown group"
            >
              {layoutPluginsByType.length === 1 ? (
                <AddButton
                  plugin={layoutPluginsByType[0]}
                  setIsOpen={setIsOpen}
                />
              ) : (
                <>
                  <button
                    onClick={() => setSubModalOpen(true)}
                    className="flex flex-col items-center justify-center w-24 h-24 gap-2 rounded-md BlocksEditor-btn bg-pearlLight hover:bg-pearlMedium md:h-28 md:w-28"
                  >
                    {layoutType}
                  </button>
                  <AddBlockModal
                    title="Choisissez le nombre de colonnes"
                    isOpen={subModalOpen}
                    setIsOpen={setSubModalOpen}
                  >
                    <ol className="flex flex-wrap gap-2 BlocksEditor-dropdown__content">
                      {layoutPluginsByType.map((plugin, index) => (
                        <AddButton
                          key={index}
                          plugin={plugin}
                          setIsOpen={setIsOpen}
                        />
                      ))}
                    </ol>
                  </AddBlockModal>
                </>
              )}
            </li>
          );
        }
      )}
    </ol>
  );
};
