import * as React from "react";
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
        <div className="flex flex-col">
          <label htmlFor="button-text">Texte du bouton</label>
          <input
            type="text"
            name="button-text"
            id="button-text"
            className="rounded-md"
            placeholder="Indiquez le texte du bouton"
            value={label}
            onChange={onChangeLabel}
            onBlur={onBlurLabel}
          />
        </div>
      </div>
      <div className="BlockButton-field mt-4">
        <div className="flex flex-col">
          <label htmlFor="button-url">URL du bouton</label>
          <input
            className="rounded-md"
            placeholder="Indiquez l'URL du bouton"
            type="text"
            name="button-url"
            id="button-url"
            value={url}
            onChange={onChangeUrl}
            onBlur={onBlurUrl}
          />
        </div>
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
  description: {
    default: "Link to an URL",
    fr_FR: "Lien vers une URL",
  },
};

export default blockButton;
