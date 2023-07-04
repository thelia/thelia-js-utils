import { Input } from "../../components/Inputs";
import { ReactComponent as Icon } from "./assets/video.svg";
import { ReactComponent as LinkIcon } from "../../../assets/svg/link.svg";
import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  Video,
} from "../../utils/types";
import { getYouTubeID } from "../../utils/youtube";
import { IframeHTMLAttributes, useEffect, useState } from "react";

import "./Video.css";
import { useIntl } from "react-intl";

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
  const intl = useIntl();

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
        <div className="BlockVideo__Content__Title">
          {intl.formatMessage({ id: "BlockVideo__TITLE" })}
        </div>
        <div className="BlockVideo__Content__Search">
          <Input
            id="BlockVideo-field-url"
            type="text"
            placeholder={intl.formatMessage({ id: "BlockVideo__URL_PLACEHOLDER" })}
            className={`${
              url.length > 2 && isUrlValid && "border-greenDark bg-greenLight"
            }`}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={(e) =>
              onUpdate({
                ...data,
                url: e.target.value,
                videoId: getYouTubeID(url)?.trim(),
              })
            }
            value={url}
            icon={<LinkIcon />}
            iconAlignment="left"
            isValid={isUrlValid}
            label={intl.formatMessage({ id: "BlockVideo__URL" })}
          />
        </div>
      </div>
    </div>
  );
};

const initialData: Video = {
  url: "",
  videoId: "",
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
    fr: "Vidéo",
    en: "Video",
    es: "Video",
    it: "Video",
  },
  icon: Icon,
  description: {
    default: "Display a YouTube video",
    fr: "Affiche une vidéo YouTube",
    en: "Display a YouTube video",
    es: "Muestra un video de YouTube",
    it: "Visualizza un video di YouTube",
  },
  image: {
    default: "",
  },
};
export default blockVideo;
