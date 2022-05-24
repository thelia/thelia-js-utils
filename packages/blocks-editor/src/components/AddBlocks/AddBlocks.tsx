import * as React from "react";

import { IBlock, Plugin } from "../../types/types";
import { groupBy, partition } from "lodash";

import BlockTooltip from "../BlockTooltip";
import { ReactComponent as ButtonIcon } from "../../blocks/Button/assets/button.svg";
import Modal from "react-modal";
import Tippy from "@tippyjs/react";
import { nanoid } from "nanoid";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";

console.log(ButtonIcon);

const AddButton = ({
  plugin,
  setIsOpen,
}: {
  plugin: Plugin;
  setIsOpen: Function;
}) => {
  const { addBlock } = useBlocksContext();

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
        className="BlocksEditor-btn bg-pearlLight hover:bg-pearlMedium h-24 w-24 md:h-28 md:w-28 rounded-md flex flex-col justify-center items-center gap-2"
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
        <ButtonIcon />
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
    <div className="border-dotted rounded-md border border-slate-600 p-4 flex flex-col">
      <span className="text-center mb-4">
        Glissez-déposez le type de contenu souhaité depuis le menu de droite
      </span>
      <button
        className="font-semibold w-max mx-auto border-2 border-vermillon text-vermillon hover:bg-vermillon hover:text-white px-2 md:px-4 md:py-1 rounded-md text-center"
        onClick={() => setIsOpen(true)}
      >
        Ajouter du contenu
      </button>
      <AddBlockModal
        excludeLayout={excludeLayout}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

const AddBlockModal = ({
  excludeLayout,
  isOpen,
  setIsOpen,
}: {
  excludeLayout?: IBlock["layout"][];
  isOpen: boolean;
  setIsOpen: Function;
}) => {
  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      overlayClassName="Overlay"
      className="Modal"
    >
      <div className="Modal-content flex flex-col p-4">
        <button onClick={() => setIsOpen(false)} className="self-end">
          <i className="fa fa-xmark hover:text-vermillon text-xl md:text-3xl"></i>
        </button>
        <div className="lg:px-12 lg:pb-12">
          <div className="font-extrabold text-center md:text-left md:text-xl mb-6">
            Choisissez le contenu souhaité
          </div>
          <div className="BlocksEditor-AddBlocks flex flex-wrap">
            <ModalContent excludeLayout={excludeLayout} setIsOpen={setIsOpen} />
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
    <ol className="flex gap-4 flex-wrap justify-center">
      {commonBlocks.map((plugin, index) => {
        return <AddButton key={index} plugin={plugin} setIsOpen={setIsOpen} />;
      })}

      {Object.entries(layoutPluginsByType).map(
        ([layoutType, layoutPluginsByType], index) => {
          return (
            <li
              key={index}
              className="BlocksEditor-dropdown group inline-block"
            >
              {layoutPluginsByType.length === 1 ? (
                <AddButton
                  plugin={layoutPluginsByType[0]}
                  setIsOpen={setIsOpen}
                />
              ) : (
                <>
                  <button className="BlocksEditor-btn bg-pearlLight hover:bg-pearlMedium h-24 w-24 md:h-28 md:w-28 rounded-md flex flex-col justify-center items-center gap-2">
                    {layoutType}
                  </button>
                  <ol className="BlocksEditor-dropdown__content hidden group-hover:flex absolute gap-2">
                    {layoutPluginsByType.map((plugin, index) => (
                      <AddButton
                        key={index}
                        plugin={plugin}
                        setIsOpen={setIsOpen}
                      />
                    ))}
                  </ol>
                </>
              )}
            </li>
          );
        }
      )}
    </ol>
  );
};
