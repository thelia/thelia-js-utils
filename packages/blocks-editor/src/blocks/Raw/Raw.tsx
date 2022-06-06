import * as React from "react";

import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
} from "../../types/types";

import { BlockContext } from "../../providers/BlockContext";
import { ReactComponent as Icon } from "./assets/html.svg";
import Modal from "react-modal";
import { ReactComponent as WarningPicto } from "../../../assets/svg/html-warning.svg";

export type BlockRawData = {
  value: string;
};

const WarningModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Function;
}) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      overlayClassName="Overlay"
      className="Modal-htmlWarning"
    >
      <div className="Modal-content flex flex-col p-4">
        <button onClick={() => setIsOpen(false)} className="self-end">
          <i className="fa fa-xmark hover:text-vermillon text-xl md:text-3xl"></i>
        </button>
        <WarningPicto className="mx-auto" />
        <div className="lg:px-12 lg:pb-12 text-mediumCharbon">
          <p className="mb-4">
            Ici un petit message pour informer sur l'utilisation de HTML
            directement dans le back-office. Ce message apparait en pop-in à
            chaque fois que l'utilisateur ajoute un bloc de HTML.
          </p>
          <div className="flex gap-2 items-center mb-6">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              name="display-alert"
              id="display-alert"
            />
            <label
              className="mb-0 tracking-normal select-none"
              htmlFor="display-alert"
            >
              Ne plus afficher l'alerte
            </label>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              if (checked) {
                localStorage.setItem("display-html-alert", "false");
              }
            }}
            className="bg-vermillon hover:bg-lightVermillon text-white py-2 px-4 rounded-md"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </Modal>
  );
};

function BlockRawComponent({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockRawData>) {
  const [value, setValue] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(
    localStorage.getItem("display-html-alert") === "false" ? false : true
  );

  React.useEffect(() => {
    if (data.value) {
      setValue(data.value);
    }
  }, [data]);

  const onChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onBlurValue = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      onUpdate({ value: e.target.value });
    }
  };

  return (
    <div className="w-full">
      <textarea
        className="w-full rounded-md"
        placeholder="Value"
        rows={5}
        onChange={onChangeValue}
        onBlur={onBlurValue}
        value={value}
      />
      <WarningModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

const initialData: BlockRawData = {
  value: "",
};

const moduleType = {
  id: "blockRaw",
};

const blockRaw: BlockPluginDefinition<BlockRawData> = {
  type: moduleType,
  component: BlockRawComponent,
  initialData,
  title: {
    default: "HTML",
    fr_FR: "HTML",
  },
  icon: Icon,
  description: {
    default: "Raw HTML content",
    fr_FR: "Contenu libre HTML",
  },
};

export default blockRaw;
