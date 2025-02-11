import { useEffect, useRef, useState } from "react";
import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
} from "../../utils/types";
import { ReactComponent as Icon } from "./assets/text.svg";
import "./Text.css";
import Editor from "./Editor";
import SearchModal from "./Modal";
import { useDebounce } from "react-use";
import { isEqual } from "lodash";

export type BlockTextData = {
  value: string;
};

const BlockTextComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockTextData>) => {
  const quillRef = useRef(null);

  const [localData, setData] = useState(data.value);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useDebounce(
    () => {
      onUpdate({ value: localData });
    },
    1000,
    [localData]
  );

  useEffect(() => setData(data.value), [data.value]);

  return (
    <div className="BlockText">
      {data !== undefined ? (
        <div className="BlockText__Editor">
          <Editor
            ref={quillRef}
            setIsModalOpen={setIsModalOpen}
            value={localData}
            setValue={setData}
          />
        </div>
      ) : null}
      <SearchModal
        ref={quillRef}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </div>
  );
};

const initialData: BlockTextData = {
  value: "",
};

const moduleType = {
  id: "blockText",
};

const Blocktext: BlockPluginDefinition<BlockTextData> = {
  type: moduleType,
  component: BlockTextComponent,
  initialData,
  title: {
    default: "Text",
    fr: "Texte",
    en: "Text",
    es: "Texto",
    it: "Testo",
    cz: "Texte",
    pl: "Texte",
    de: "Texte",
  },
  icon: Icon,
  description: {
    default: "Display a formated text",
    fr: "Affiche un texte mis en forme",
    en: "Display a formated text",
    es: "Muestra un texto en formato",
    it: "Visualizza un testo formattato",
    cz: "Affiche un texte mis en forme",
    pl: "Affiche un texte mis en forme",
    de: "Affiche un texte mis en forme",
  },
};

export default Blocktext;
