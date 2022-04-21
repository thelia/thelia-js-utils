import * as React from "react";

import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
} from "../../types/types";

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

function BlockTitleComponent({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockTitleData>) {
  const [level, setLevel] = React.useState<Number>(initialData.level);
  const [text, setText] = React.useState<string>(initialData.text);

  React.useEffect(() => {
    if (data.level) {
      setLevel(data.level);
    }
    if (data.text) {
      setText(data.text);
    }
  }, [data]);

  const onChangeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(parseInt(e.target.value, 10));
    onUpdate({ ...data, level: parseInt(e.target.value, 10) });
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onBlurText = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onUpdate({ ...data, text: e.target.value });
    }
  };

  return (
    <div className="BlockTitle">
      <div className="BlockTitle-field">
        <div className="flex flex-col w-2/5">
          <label htmlFor="title-level">Style</label>
          <select
            name="title-level"
            id="title-level"
            className="rounded-md"
            onChange={onChangeLevel}
            value={level.toString()}
          >
            {levels.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-grow BlockTitle-field">
        <input
          className="w-full mt-4 rounded-md"
          placeholder="Votre titre ici"
          type="text"
          name="title-text"
          id="title-text"
          value={text}
          onChange={onChangeText}
          onBlur={onBlurText}
        />
      </div>
    </div>
  );
}

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
  description: {
    default: "Display a title",
    fr_FR: "Affiche un titre",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&blockTitle",
  },
};

export default BlockTitle;
