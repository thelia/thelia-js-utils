import Modal from "react-modal";
import { BlockModuleComponentProps, BlockPluginDefinition } from "../../utils/types";
import { ReactComponent as Icon } from "./assets/html.svg";
import { ReactComponent as WarningPicto } from "../../../assets/svg/html-warning.svg";
import { ReactComponent as XMarkIcon } from "../../../assets/svg/xmark.svg";
import { useEffect, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";

import "./Raw.css";
import { TextArea } from "../../components/Inputs";

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
  const intl = useIntl();

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
          <XMarkIcon className="BlockRaw__Modal__Content__Close__Icon" />
        </button>
        <WarningPicto className="BlockRaw__Modal__Content__Image" />
        <div className="BlockRaw__Modal__Content__Infos">
          <p className="BlockRaw__Modal__Content__Description">
            {intl.formatMessage({ id: "HTMLWarningModal__DESCRIPTION" })}
          </p>
          <div className="BlockRaw__Modal__Content__Actions">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              name="display-alert"
              id="display-alert"
              style={{ margin: "0px" }}
            />
            <label className="BlockRaw__Modal__Content__CBLabel" htmlFor="display-alert">
              {intl.formatMessage({ id: "DO_NOT_SHOW_AGAIN" })}
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
            {intl.formatMessage({ id: "I_UNDERSTOOD" })}
          </button>
        </div>
      </div>
    </Modal>
  );
};

function BlockRawComponent({ data, onUpdate }: BlockModuleComponentProps<BlockRawData>) {
  const [value, setValue] = useState<string>(data.value);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const intl = useIntl();

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
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => onUpdate({ value: e.target.value })}
        placeholder={intl.formatMessage({ id: "BlockHTML__HTML_PLACEHOLDER" })}
        id="BlockHTML-HTML-field"
      />
      {/* <AceEditor
        className="BlockRaw__Editor"
        placeholder="Value"
        mode="html"
        value={value}
        onChange={(value) => setValue(value)}
        onBlur={(e) => onUpdate({ value: e.target.value })}
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
      /> */}
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
    fr: "HTML",
    en: "HTML",
    es: "HTML",
    it: "HTML",
  },
  icon: Icon,
  description: {
    default: "Raw HTML content",
    fr: "Contenu libre HTML",
    en: "Raw HTML content",
    es: "Contenido HTML libre",
    it: "Contenuto HTML libero",
  },
};

export default blockRaw;
