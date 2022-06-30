import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { TextArea } from "../../components/Inputs";
import { BlockModuleComponentProps, BlockPluginDefinition } from "../../types/types";
import { ReactComponent as Icon } from "./assets/text.svg";

export type BlockTextData = {
  value: string;
};

function BlockTextComponent({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockTextData>) {
  const [localData, setData] = useState<string>(data.value);

  useEffect(() => {
    setData(data.value);
  }, [data]);

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };

  const onBlurText = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      onUpdate({
        value: e.target.value,
      });
    }
  };

  return (
    <div className="BlockText">
      {/* {data !== undefined ? <Editor /> : null} */}
      {data !== undefined ? (
        <TextArea
          className="w-full rounded-md"
          placeholder="Votre texte ici"
          onChange={onChangeText}
          onBlur={onBlurText}
          defaultValue={localData}
        />
      ) : null}
    </div>
  );
}

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
