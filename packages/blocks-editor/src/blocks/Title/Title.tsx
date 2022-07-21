import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { Input, Select } from "../../components/Inputs";
import { BlockModuleComponentProps, BlockPluginDefinition } from "../../types/types";
import { ReactComponent as Icon } from "./assets/title.svg";

import "./Title.css";

export type BlockTitleData = {
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

const levels = [
  {
    label: "Neutre",
    value: 0,
  },
  {
    label: "Niveau 1",
    value: 1,
  },
  {
    label: "Niveau 2",
    value: 2,
  },
  {
    label: "Niveau 3",
    value: 3,
  },
  {
    label: "Niveau 4",
    value: 4,
  },
  {
    label: "Niveau 5",
    value: 5,
  },
  {
    label: "Niveau 6",
    value: 6,
  },
];

const BlockTitleComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockTitleData>) => {
  const [level, setLevel] = useState<Number>(initialData.level);
  const [text, setText] = useState<string>(initialData.text);

  useEffect(() => {
    if (data.level) {
      setLevel(data.level);
    }
    if (data.text) {
      setText(data.text);
    }
  }, [data]);

  const onChangeLevel = (e: ChangeEvent<HTMLSelectElement>) => {
    setLevel(parseInt(e.target.value, 10));
    onUpdate({ ...data, level: parseInt(e.target.value, 10) });
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onBlurText = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onUpdate({ ...data, text: e.target.value });
    }
  };

  return (
    <div className="BlockTitle">
      <Select
        id="BlockTitle-field-level"
        onChange={onChangeLevel}
        value={level.toString()}
        label="Niveau du titre"
      >
        {levels.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>

      <Input
        type="text"
        id="BlockTitle-field-text"
        value={text}
        onChange={onChangeText}
        onBlur={onBlurText}
        placeholder="Votre titre ici"
      />
    </div>
  );
};

const initialData: BlockTitleData = {
  level: 0,
  text: "",
};

const moduleType = {
  id: "blockTitle",
};

const BlockTitle: BlockPluginDefinition<BlockTitleData> = {
  type: moduleType,
  component: BlockTitleComponent,
  initialData,
  title: {
    default: "Title",
    fr_FR: "Titre",
  },
  icon: Icon,
  description: {
    default: "Display a title",
    fr_FR: "Affiche un titre",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&blockTitle",
  },
};

export default BlockTitle;
