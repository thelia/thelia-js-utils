import { useEffect, useRef, useState } from "react";
import { BlockModuleComponentProps, BlockPluginDefinition } from "../../types/types";
import { ReactComponent as Icon } from "./assets/text.svg";

import "./Text.css";
import Editor from "./Editor";
import SearchModal from "./Modal";

export type BlockTextData = {
  value: string;
};

const BlockTextComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockTextData>) => {
  const quillRef = useRef<any>(null);

  const [localData, setData] = useState<string>(data.value);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => setData(data.value), [data]);
  useEffect(() => onUpdate({ value: localData }), [localData]);

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
      <SearchModal ref={quillRef} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
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
  },
  icon: Icon,
  description: {
    default: "Display a formated text",
    fr: "Affiche un texte mis en forme",
    en: "Display a formated text",
    es: "Muestra un texto en formato",
    it: "Visualizza un testo formattato",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&blockText",
  },
};

export default Blocktext;
