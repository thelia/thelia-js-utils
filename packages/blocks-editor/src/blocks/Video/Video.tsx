import * as React from "react";

import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  Video,
} from "../../types/types";
import { getYouTubeID } from "../../utils/youtube";

const BlockVideoComponent = ({ data, onUpdate }: BlockModuleComponentProps<Video>) => {
  const [url, setUrl] = React.useState<string>("");
  const [isUrlValid, setIsUrlValid] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (data.url) {
      setUrl(data.url);
    }
  }, [data]);

  React.useEffect(() => {
    if (getYouTubeID(url)?.trim().length === 11) {
      setIsUrlValid(true);
    } else {
      setIsUrlValid(false);
    }
  }, [url]);

  return (
    <div className="BlockVideo">
      <iframe
        style={{
          aspectRatio: "16/9",
        }}
        className="w-1/2"
        src={`https://www.youtube.com/embed/${
          url.match(
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
          )?.[2]
        }`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>

      <div className="BlockVideo-field flex flex-col mt-4">
        <label htmlFor="video-url">URL de la vidéo</label>
        <input
          type="text"
          name="video-url"
          id="video-url"
          className={`rounded-md ${
            url.length === 0
              ? ""
              : isUrlValid
              ? "border-green-700 bg-green-200"
              : "border-red-700 bg-red-200"
          }`}
          placeholder="Indiquez l'URL de la vidéo"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={(e) => onUpdate({ ...data, url: e.target.value })}
        />
      </div>
    </div>
  );
};

const initialData: Video = {
  url: "https://www.youtube.com/watch?v=4JcENw71M6c",
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
    default: "Display a YouTube video",
    fr_FR: "Affiche une vidéo YouTube",
  },
  image: {
    default: "",
  },
};
export default blockVideo;
