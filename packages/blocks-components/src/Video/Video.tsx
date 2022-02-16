import * as React from "react";

import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  Video,
} from "../types";

function BlockVideoComponent(props: BlockModuleComponentProps<Video>) {
  return <div className="BlockVideo">TODO</div>;
}

const initialData: Video = {
  url: null,
};

const moduleType = {
  id: "blockVideo",
};

const blockVideo: BlockPluginDefinition<Video> = {
  type: moduleType,
  component: BlockVideoComponent,
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
export default blockVideo;
