import * as React from "react";

import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  LibraryImage,
} from "../../types/types";

function BlockImageComponent(props: BlockModuleComponentProps<LibraryImage>) {
  return <div className="BlockImage">TODO</div>;
}

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
    default: "Display an image",
    fr_FR: "Affiche une image",
  },
  image: {
    default: "",
  },
};
export default blockImage;
