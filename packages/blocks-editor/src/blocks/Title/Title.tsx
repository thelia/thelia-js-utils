import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Input, Select } from "../../components/Inputs";
import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
} from "../../types/types";
import { ReactComponent as Icon } from "./assets/title.svg";

import "./Title.css";

export type BlockTitleData = {
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

const BlockTitleComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockTitleData>) => {
  const intl = useIntl();

  const levels = [
    {
      label: `${intl.formatMessage({ id: "NEUTRAL" })}`,
      value: 0,
    },
    {
      label: `${intl.formatMessage({ id: "LEVEL" })} 1`,
      value: 1,
    },
    {
      label: `${intl.formatMessage({ id: "LEVEL" })} 2`,
      value: 2,
    },
    {
      label: `${intl.formatMessage({ id: "LEVEL" })} 3`,
      value: 3,
    },
    {
      label: `${intl.formatMessage({ id: "LEVEL" })} 4`,
      value: 4,
    },
    {
      label: `${intl.formatMessage({ id: "LEVEL" })} 5`,
      value: 5,
    },
    {
      label: `${intl.formatMessage({ id: "LEVEL" })} 6`,
      value: 6,
    },
  ];

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
        label={intl.formatMessage({ id: "BlockTitle__LEVEL" })}
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
        placeholder={intl.formatMessage({ id: "BlockTitle__TEXT_PLACEHOLDER" })}
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
    fr: "Titre",
    en: "Title",
    es: "Titulo",
    it: "Titolo",
  },
  icon: Icon,
  description: {
    default: "Display a title",
    fr: "Affiche un titre",
    en: "Display a title",
    es: "Muestra un titulo",
    it: "Visualizza un titolo",
  },
};

export default BlockTitle;
