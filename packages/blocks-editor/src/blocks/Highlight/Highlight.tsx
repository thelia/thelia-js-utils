import { nanoid } from "nanoid";
import { ChangeEvent, FocusEvent, useState } from "react";
import { Input } from "../../components/Inputs";
import { BlockModuleComponentProps, IBlock } from "../../utils/types";
import Blocktext from "../Text";
import "./Highlight.css";
import { ReactComponent as Icon } from "./assets/highlight.svg";

export type BlockHighlightData = {
  value: string;
  style: {
    backgroundColor: string;
  };
};

function BlockHighlightComponent({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockHighlightData>) {
  const handleUpdate = (newData: IBlock["data"]) => {
    onUpdate(newData);
  };
  const [backgroundColor, setBackgroundColor] = useState<string>(
    data?.style?.backgroundColor || initialData.style.backgroundColor || "#ffffff"
  );

  const onChangeBackgroundColor = (e: ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
  };

  const onBlurBackgroundColor = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onUpdate({
        ...data,
        style: {
          backgroundColor: e.target.value,
        },
      });
    }
  };

  return (
    <div className="BlockHighlight">
      <div className="mb-4 max-w-xs">
        <Input
          type="color"
          id="BlockButton-field-text"
          value={backgroundColor}
          onChange={onChangeBackgroundColor}
          onBlur={onBlurBackgroundColor}
          label="Couleur de fond"
        />
      </div>
      <div>
        <Blocktext.component data={data} onUpdate={handleUpdate} id={nanoid()} />
      </div>
    </div>
  );
}

const initialData = {
  value: "",
  style: {
    backgroundColor: "#ffffff",
  },
};

const moduleType = {
  id: "blockHighlight",
};

const BlockHighlight = {
  type: moduleType,
  component: BlockHighlightComponent,
  initialData,
  icon: Icon,
  title: {
    default: "Highlight",
    fr: "Mise en avant",
    en: "Highlight",
    es: "Destacado",
    it: "Evidenziare",
    cz: "Mise en avant",
    pl: "Mise en avant",
    de: "Mise en avant"
  },
  description: {
    default: "Display a highlighted text",
    fr: "Affiche un bloc de texte mis en avant",
    en: "Display a highlighted text",
    es: "Muestra un texto resaltado",
    it: "Mostra un testo evidenziato",
    cz: "Affiche un bloc de texte mis en avant",
    pl: "Affiche un bloc de texte mis en avant",
    de: "Affiche un bloc de texte mis en avant"
  },
};

export default BlockHighlight;
