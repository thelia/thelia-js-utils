import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Input } from "../../components/Inputs";
import { BlockModuleComponentProps, BlockPluginDefinition } from "../../types/types";
import { ReactComponent as Icon } from "./assets/button.svg";
import { ReactComponent as LinkIcon } from "../../../assets/svg/link.svg";

import "./Button.css";

export type BlockButtonData = {
  label: string;
  url: string;
};

const BlockButtonComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockButtonData>) => {
  const [label, setLabel] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const intl = useIntl();

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

  return (
    <div className="BlockButton">
      <Input
        type="text"
        id="BlockButton-field-text"
        placeholder={intl.formatMessage({ id: "BlockButton__TEXT_PLACEHOLDER" })}
        value={label}
        onChange={onChangeLabel}
        onBlur={onBlurLabel}
        label={intl.formatMessage({ id: "BlockButton__TEXT" })}
      />

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
