import * as React from "react";
import Input from "../../components/Input";

import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  Video,
} from "../../types/types";
import { getYouTubeID } from "../../utils/youtube";

const YouTube = ({
  url,
  className,
  ...props
}: {
  url?: string;
  className?: string;
} & React.IframeHTMLAttributes<HTMLIFrameElement>) => (
  <iframe
    {...props}
    className={`${className}`}
    src={`https://www.youtube.com/embed/${url}`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);

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
      <YouTube
        url={getYouTubeID(url)?.trim()}
        className="w-full lg:w-1/3"
        style={{ aspectRatio: "16/9" }}
      />

      <div className="bg-white border-l-8 border-red-600 rounded-md shadow-md p-4 md:px-14 md:py-8 mt-8">
        <div className="font-bold md:text-xl">Ajouter une vidéo depuis YouTube</div>
        <div className="BlockVideo-field flex flex-col xl:w-2/3 mt-4">
          <Input
            name="video-url"
            id="video-url"
            type="text"
            placeholder="URL de la vidéo"
            className={` ${
              url.length === 0
                ? ""
                : isUrlValid
                ? "border-green-700 bg-green-200"
                : "border-red-700 bg-red-200"
            }`}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={(e) => onUpdate({ ...data, url: e.target.value })}
            value={url}
            icon={<i className="fa fa-link text-gray-700"></i>}
            iconAlignment="left"
            isValid={isUrlValid}
            label="URL de la vidéo"
          />
        </div>
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
