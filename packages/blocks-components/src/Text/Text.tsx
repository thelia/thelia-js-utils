import * as React from "react";

import { BlockModuleComponentProps, BlockPluginDefinition } from "../types";

export type BlockTextData = {
  value: string;
};

function BlockTextComponent({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockTextData>) {
  const [localData, setData] = React.useState<string>(data.value);

  React.useEffect(() => {
    setData(data.value);
  }, [data]);

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };

  const onBlurText = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      onUpdate({
        value: e.target.value,
      });
    }
  };

  return (
    <div className="BlockText">
      {data !== undefined ? (
        <textarea
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
  description: {
    default: "Display a formated text",
    fr_FR: "Affiche un texte mis en forme",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&blockText",
  },
};

export default Blocktext;
