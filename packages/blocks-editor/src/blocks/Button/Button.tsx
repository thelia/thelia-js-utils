import * as React from "react";
import Input from "../../components/Input";
import { BlockModuleComponentProps, BlockPluginDefinition } from "../../types/types";

export type BlockButtonData = {
  label: string;
  url: string;
};

const BlockButtonComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockButtonData>) => {
  const [label, setLabel] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");

  React.useEffect(() => {
    if (data.url) {
      setUrl(data.url);
    }

    if (data.label) {
      setLabel(data.label);
    }
  }, [data]);

  const onChangeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const onBlurLabel = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onUpdate({ ...data, label: e.target.value });
    }
  };

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const onBlurUrl = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onUpdate({ ...data, url: e.target.value });
    }
  };

  return (
    <div className="BlockButton">
      <div className="BlockButton-field">
        <Input
          type="text"
          name="field-text"
          id="field-text"
          placeholder="Indiquez le texte du bouton"
          value={label}
          onChange={onChangeLabel}
          onBlur={onBlurLabel}
          label="Texte du bouton"
        />
      </div>
      <div className="BlockButton-field mt-4">
        <Input
          type="text"
          name="field-url"
          id="field-url"
          placeholder="Indiquez le lien du bouton"
          value={url}
          icon={<i className="fa fa-link text-darkCharbon"></i>}
          iconAlignment="left"
          onChange={onChangeUrl}
          onBlur={onBlurUrl}
          label="URL du bouton"
        />
      </div>
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
    fr_FR: "Bouton",
  },
  icon: "button.svg",
  description: {
    default: "Link to an URL",
    fr_FR: "Lien vers une URL",
  },
};

export default blockButton;
