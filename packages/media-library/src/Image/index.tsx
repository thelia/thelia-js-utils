import { BlockModuleComponentProps, BlockPluginDefinition } from "@thelia/blocks-editor";

import { ReactComponent as Icon } from "./assets/image.svg";
import { LibraryImage } from "../types";
import { ReactComponent as MediathequeIcon } from "./assets/mediatheque.svg";

const BlockImageComponent = ({}: BlockModuleComponentProps<LibraryImage>) => {
  return (
    <div className="BlockImage flex lg:flex-nowrap flex-wrap justify-center w-full gap-4">
      <div className="border border-dotted border-greyDark rounded-md w-full lg:w-1/2 flex flex-col gap-2 justify-center items-center py-12 px-6 text-center">
        <div className="rounded-full bg-darkCharbon text-white px-2.5 py-1">
          <i className="fa fa-arrow-down"></i>
        </div>
        <label htmlFor="">
          <input
            type="file"
            className="font-semibold w-max border-2 border-vermillon text-vermillon hover:bg-vermillon hover:text-white px-2 md:px-4 md:py-1 rounded-md"
          />
          Télécharger une image
        </label>

        <span>ou déposez une image</span>
      </div>

      <div className="bg-white rounded-md w-full lg:w-1/2 flex flex-col gap-4 justify-center items-center text-center py-12 px-6">
        <div className="rounded-full bg-pearlLight text-white p-3">
          <MediathequeIcon />
        </div>
        <span>Sélectionnez une image depuis votre médiathèque</span>
      </div>
    </div>
  );
};

const initialData: LibraryImage = {
  url: null,
  id: null,
  title: "",
  fileName: "",
};

const moduleType = {
  id: "blockImage",
};

const blockImage: BlockPluginDefinition<LibraryImage> = {
  type: moduleType,
  component: BlockImageComponent,
  initialData,
  title: {
    default: "Image",
    fr_FR: "Image",
  },
  description: {
    default: "Display an image--",
    fr_FR: "Affiche une image",
  },
  icon: Icon,
  image: {
    default: "",
  },
};
export default blockImage;
