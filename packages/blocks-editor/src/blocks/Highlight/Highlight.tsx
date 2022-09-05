import { nanoid } from "nanoid";
import { BlockModuleComponentProps, IBlock } from "../../types/types";
import Blocktext from "../Text";

export type BlockHighlightData = {
  value: string;
};

function BlockHighlightComponent({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockHighlightData>) {
  const handleUpdate = (newData: IBlock["data"]) => {
    onUpdate(newData);
  };

  return (
    <div className="BlockHighlight">
      <Blocktext.component data={data} onUpdate={handleUpdate} id={nanoid()} />
    </div>
  );
}

const initialData = {
  value: "",
};

const moduleType = {
  id: "blockHighlight",
};

const BlockHighlight = {
  type: moduleType,
  component: BlockHighlightComponent,
  initialData,
  title: {
    default: "Highlight",
    fr: "Mise en avant",
    en: "Highlight",
    es: "Destacado",
    it: "Evidenziare",
  },
  description: {
    default: "Display a highlighted text",
    fr: "Affiche un bloc de texte mis en avant",
    en: "Display a highlighted text",
    es: "Muestra un texto resaltado",
    it: "Mostra un testo evidenziato",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&blockHighlight",
  },
};

export default BlockHighlight;
