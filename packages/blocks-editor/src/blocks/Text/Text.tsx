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

  const onBlur = () => {
    onUpdate({ value: localData });
  };

  useEffect(() => {
    setData(data.value);
  }, [data]);

  return (
    <div className="BlockText">
      {data !== undefined ? (
        <div className="BlockText__Editor">
          <Editor
            ref={quillRef}
            setIsModalOpen={setIsModalOpen}
            value={localData}
            setValue={setData}
            onBlur={onBlur}
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
    fr_FR: "Texte",
  },
  icon: Icon,
  description: {
    default: "Display a formated text",
    fr_FR: "Affiche un texte mis en forme",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&blockText",
  },
};

export default Blocktext;
