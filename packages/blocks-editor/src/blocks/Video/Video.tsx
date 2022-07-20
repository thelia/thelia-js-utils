import { Input } from "../../components/Inputs";
import { ReactComponent as Icon } from "./assets/video.svg";
import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  Video,
} from "../../types/types";
import { getYouTubeID } from "../../utils/youtube";
import { IframeHTMLAttributes, useEffect, useState } from "react";

import "./Video.css";

const YouTubeFrame = ({
  url,
  className,
  ...props
}: {
  url?: string;
  className?: string;
} & IframeHTMLAttributes<HTMLIFrameElement>) => (
  <iframe
    {...props}
    className={`${className}`}
    src={`https://www.youtube.com/embed/${url}`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);

const BlockVideoComponent = ({ data, onUpdate }: BlockModuleComponentProps<Video>) => {
  const [url, setUrl] = useState<string>("");
  const [isUrlValid, setIsUrlValid] = useState<boolean>(false);

  useEffect(() => {
    if (data.url) {
      setUrl(data.url);
    }
  }, [data]);

  useEffect(() => {
    if (getYouTubeID(url)?.trim().length === 11) {
      setIsUrlValid(true);
    } else {
      setIsUrlValid(false);
    }
  }, [url]);

  return (
    <div className="BlockVideo">
      {url.length > 0 && isUrlValid ? (
        <YouTubeFrame
          url={getYouTubeID(url)?.trim()}
          className="BlockVideo__Frame"
          style={{ aspectRatio: "16/9" }}
        />
      ) : null}
      <div className="BlockVideo__Content">
        <div className="BlockVideo__Content__Title">Ajouter une vidéo depuis YouTube</div>
        <div className="BlockVideo__Content__Search">
          <Input
            id="BlockVideo-field-url"
            type="text"
            placeholder="URL de la vidéo"
            className={`${
              url.length > 2 && isUrlValid && "border-greenDark bg-greenLight"
            }`}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={(e) => onUpdate({ ...data, url: e.target.value })}
            value={url}
            icon={<i className="fa fa-link"></i>}
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
  url: "",
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
  icon: Icon,
  description: {
    default: "Display a YouTube video",
    fr_FR: "Affiche une vidéo YouTube",
  },
  image: {
    default: "",
  },
};
export default blockVideo;
