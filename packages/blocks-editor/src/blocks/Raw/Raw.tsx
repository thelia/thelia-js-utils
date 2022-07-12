import { BlockModuleComponentProps, BlockPluginDefinition } from "../../types/types";
import { ReactComponent as Icon } from "./assets/html.svg";
import Modal from "react-modal";
import { ReactComponent as WarningPicto } from "../../../assets/svg/html-warning.svg";
import { useEffect, useLayoutEffect, useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
import "./Raw.css";

export type BlockRawData = {
  value: string;
};

const WarningModal = ({
  isOpen,
  setSaveLocation,
}: {
  isOpen: boolean;
  setSaveLocation: (storage: Window["localStorage"] | Window["sessionStorage"]) => void;
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={() => setSaveLocation(sessionStorage)}
      overlayClassName="Overlay"
      className="Modal-htmlWarning"
    >
      <div className="BlockRaw__Modal__Content">
        <button
          onClick={() => setSaveLocation(sessionStorage)}
          className="BlockRaw__Modal__Content__Close"
        >
          <i className="BlockRaw__Modal__Content__Close__Icon fa fa-xmark"></i>
        </button>
        <WarningPicto className="BlockRaw__Modal__Content__Image" />
        <div className="BlockRaw__Modal__Content__Infos">
          <p className="BlockRaw__Modal__Content__Description">
            Ici un petit message pour informer sur l'utilisation de HTML directement dans
            le back-office. Ce message apparait en pop-in à chaque fois que l'utilisateur
            ajoute un bloc de HTML.
          </p>
          <div className="BlockRaw__Modal__Content__Actions">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              name="display-alert"
              id="display-alert"
            />
            <label className="BlockRaw__Modal__Content__CBLabel" htmlFor="display-alert">
              Ne plus afficher l'alerte
            </label>
          </div>
          <button
            onClick={() => {
              if (checked) {
                setSaveLocation(localStorage);
              } else {
                setSaveLocation(sessionStorage);
              }
            }}
            className="BlockRaw__Modal__Content__Accept"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </Modal>
  );
};

function BlockRawComponent({ data, onUpdate }: BlockModuleComponentProps<BlockRawData>) {
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (sessionStorage.getItem("html-alert-status") === "shown") {
      return;
    }

    if (localStorage.getItem("html-alert-status") === "shown") {
      return;
    }

    setIsOpen(true);
  });

  useEffect(() => {
    if (data.value) {
      setValue(data.value);
    }
  }, [data]);

  return (
    <>
      <AceEditor
        className="BlockRaw__Editor"
        placeholder="Value"
        mode="html"
        value={value}
        onChange={(value) => setValue(value)}
        height="200px"
        width="100%"
        fontSize={14}
        enableBasicAutocompletion={true}
        tabSize={2}
        showPrintMargin={false}
        highlightActiveLine={false}
        setOptions={{
          useWorker: false,
        }}
      />
      <WarningModal
        isOpen={isOpen}
        setSaveLocation={(storage) => {
          storage.setItem("html-alert-status", "shown");
          setIsOpen(false);
        }}
      />
    </>
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
