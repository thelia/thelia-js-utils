import * as React from "react";

import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  Video,
} from "../../types/types";

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
    default: "Video",
    fr_FR: "Vidéo",
  },
  description: {
    default: "Display a video",
    fr_FR: "Affiche une vidéo",
  },
  image: {
    default: "",
  },
};
export default blockVideo;
