import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Input, Select } from "../../components/Inputs";
import { BlockModuleComponentProps, BlockPluginDefinition } from "../../utils/types";
import { ReactComponent as Icon } from "./assets/button.svg";
import { ReactComponent as LinkIcon } from "../../../assets/svg/link.svg";

import "./Button.css";

export type BlockButtonData = {
  label: string;
  url: string;
  type: string;
};

const BlockButtonComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockButtonData>) => {
  const intl = useIntl();

  const types = [
    { label: intl.formatMessage({ id: "PRIMARY" }), value: "primary" },
    { label: intl.formatMessage({ id: "SECONDARY" }), value: "secondary" },
    { label: intl.formatMessage({ id: "TERTIARY" }), value: "tertiary" },
    { label: intl.formatMessage({ id: "QUATERNARY" }), value: "quaternary" },
    { label: intl.formatMessage({ id: "QUINARY" }), value: "quinary" },
  ];

  const [label, setLabel] = useState<string>("");
  const [type, setType] = useState<string>(data.type);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (data.url) {
      setUrl(data.url);
    }

    if (data.label) {
      setLabel(data.label);
    }
  }, [data]);

  const onChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const onBlurLabel = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onUpdate({ ...data, label: e.target.value });
    }
  };

  const onChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const onBlurUrl = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onUpdate({ ...data, url: e.target.value });
    }
  };

  const onChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    onUpdate({ ...data, type: e.target.value });
  };

  return (
    <div className="BlockButton">
      <div className="BlockButton__Config">
        <Input
          type="text"
          id="BlockButton-field-text"
          placeholder={intl.formatMessage({
            id: "BlockButton__TEXT_PLACEHOLDER",
          })}
          value={label}
          onChange={onChangeLabel}
          onBlur={onBlurLabel}
          label={intl.formatMessage({ id: "BlockButton__TEXT" })}
        />
        <Select
          id="BlockButton-field-type"
          onChange={onChangeType}
          value={type}
          label={intl.formatMessage({ id: "BlockButton__TYPE" })}
        >
          {types.map((type, index) => (
            <option key={index} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </div>

      <Input
        type="text"
        id="BlockButton-field-url"
        placeholder={intl.formatMessage({ id: "BlockButton__URL_PLACEHOLDER" })}
        value={url}
        icon={<LinkIcon />}
        iconAlignment="left"
        onChange={onChangeUrl}
        onBlur={onBlurUrl}
        label={intl.formatMessage({ id: "BlockButton__URL" })}
      />
    </div>
  );
};

const initialData = {
  label: "",
  url: "",
  type: "primary",
};

const moduleType = {
  id: "blockButton",
};

const blockButton: BlockPluginDefinition<BlockButtonData> = {
  type: moduleType,
  component: BlockButtonComponent,
  initialData,
  title: {
    default: "Button",
    fr: "Bouton",
    en: "Button",
    es: "Botón",
    it: "Bottone",
  },
  icon: Icon,
  description: {
    default: "Link to an URL",
    fr: "Lien vers une URL",
    en: "Link to an URL",
    es: "Enlace a una URL",
    it: "Link a un URL",
  },
};

export default blockButton;
