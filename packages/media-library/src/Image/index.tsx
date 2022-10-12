import { BlockModuleComponentProps, BlockPluginDefinition } from "@thelia/blocks-editor";
import { useEffect, useState } from "react";
import { IntlProvider, useIntl } from "react-intl";
import { ReactComponent as Icon } from "./assets/image.svg";
import { ReactComponent as DownloadIcon } from "./assets/download.svg";
import { ReactComponent as MediathequeIcon } from "./assets/mediatheque.svg";
import { locale, messages } from "../utils/intl";
import { useDropzone } from "react-dropzone";
import Library from "../Library";
import { LibraryImage } from "../types/types";
import { QueryClientProvider } from "react-query";
import { useCreateImage } from "../utils/queries";
import { Toaster, toast } from "react-hot-toast";
import { queryClient } from "@thelia/fetcher";

import "./Image.css";

const FromLocal = ({ onSelect }: { onSelect: (value: LibraryImage) => void }) => {
  const intl = useIntl();
  const createImage = useCreateImage();

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      "image/*": ["*"],
    },
    noClick: true,
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles) {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0]);
        const res = await createImage.mutateAsync(formData);

        onSelect(res);
      }
    },
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.length > 1
        ? toast.error(intl.formatMessage({ id: "BlockImage__TOAST_MAX_FILE" }))
        : toast.error(intl.formatMessage({ id: "BlockImage__TOAST_WRONG_FILE_TYPE" }));
    },
  });

  return (
    <div
      className="BlockImage__FromLocal"
      style={{ border: isDragActive ? "2px dashed #dc3018" : "1px dashed #787878" }}
      {...getRootProps()}
    >
      <div className="BlockImage__FromLocal__Icon">
        <DownloadIcon />
      </div>
      {isDragActive ? (
        intl.formatMessage({ id: "BlockImage__DROP_TO_UPLOAD" })
      ) : !createImage.isLoading ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label className="BlockImage__Button" htmlFor="image">
              {intl.formatMessage({ id: "BlockImage__DOWNLOAD" })}
            </label>
            <input
              className="BlockImage__FromLocal__FileInput"
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onChange={async (e) => {
                if (e.target.files) {
                  const formData = new FormData();
                  formData.append("image", e.target.files[0]);
                  const res = await createImage.mutateAsync(formData);

                  onSelect(res);
                }
              }}
            />
            <span>{intl.formatMessage({ id: "BlockImage__OR_DROP" })}</span>
          </form>
        </>
      ) : (
        <>
          <span>{intl.formatMessage({ id: "DOWNLOADING" })}</span>
          <i className="Loader fa fa-circle-notch fa-spin"></i>
        </>
      )}
    </div>
  );
};

const FromLibrary = ({ onSelect }: { onSelect: (value: LibraryImage) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const intl = useIntl();

  return (
    <div className="BlockImage__FromLibrary">
      <div className="BlockImage__FromLibrary__Icon">
        <MediathequeIcon />
      </div>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span>{intl.formatMessage({ id: "BlockImage__UPLOAD" })}</span>
      </button>

      {isOpen ? (
        <Library
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSelect={(image: LibraryImage) => {
            setIsOpen(false);
            onSelect(image);
          }}
        />
      ) : null}
    </div>
  );
};

const Preview = ({
  id,
  fileName,
  setEditMode,
}: {
  id: LibraryImage["id"] | null;
  fileName: LibraryImage["fileName"];
  setEditMode: Function;
}) => {
  const intl = useIntl();

  if (!id) return null;

  return (
    <div className="BlockImage__Preview">
      <img
        src={`/image-library/${id}/full/^!220,220/0/default.webp`}
        alt=""
        loading="lazy"
        onError={(e) =>
          ((e.target as HTMLImageElement).src = `https://via.placeholder.com/220`)
        }
      />

      <div className="BlockImage__Preview__Infos">
        <span className="BlockImage__Preview__FileName">{fileName}</span>
        <button
          className="BlockImage__Button"
          onClick={() => {
            setEditMode(true);
          }}
        >
          {intl.formatMessage({ id: "REPLACE" })}
        </button>
      </div>
    </div>
  );
};

const ImageInfos = ({
  image,
  onChange,
}: {
  image: LibraryImage;
  onChange: (data: Partial<LibraryImage>) => void;
}) => {
  const [title, setTitle] = useState(image.title);
  const [url, setUrl] = useState(image.link?.url || "");

  const intl = useIntl();

  return (
    <form
      className="BlockImage__Infos__Form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label>{intl.formatMessage({ id: "BlockImage__TITLE" })}</label>
        <input
          className="Input__Text"
          type="text"
          name="title"
          value={title}
          placeholder={intl.formatMessage({ id: "BlockImage__TITLE" })}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => onChange({ title: title })}
        />
      </div>
      <div>
        <label>
          {intl.formatMessage({ id: "BlockImage__LINK" })} (
          {intl.formatMessage({ id: "OPTIONAL" })})
        </label>
        <input
          className="Input__Text"
          type="text"
          name="linkUrl"
          value={url}
          placeholder={intl.formatMessage({ id: "BlockImage__LINK_PLACEHOLDER" })}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={() => onChange({ link: { url: url } })}
        />
      </div>
    </form>
  );
};

const BlockImageComponent = (props: BlockModuleComponentProps<LibraryImage>) => {
  const { data, onUpdate } = props;

  const [image, setImage] = useState<LibraryImage | null>(null);
  const [isEditMode, setEditMode] = useState<boolean>(false);

  const intl = useIntl();

  useEffect(() => {
    if (data.id) {
      setImage(data);
      return;
    }

    setEditMode(true);
  }, [data]);

  const onSelect = (image: LibraryImage) => {
    onUpdate(image);
    setEditMode(false);
  };

  return (
    <div className="BlockImage">
      {image && !isEditMode ? (
        <div className="BlockImage__Infos">
          <Preview id={image.id} fileName={image.fileName} setEditMode={setEditMode} />

          <ImageInfos
            image={image}
            onChange={(values) => {
              onUpdate({ ...data, ...values });
            }}
          />
        </div>
      ) : null}
      {isEditMode ? (
        <>
          {image?.id ? (
            <span
              style={{
                marginBottom: "15px",
                display: "block",
                fontWeight: 800,
                fontSize: "18px",
              }}
            >
              {intl.formatMessage({ id: "REPLACE_IMAGE" })} "{image.title}"
            </span>
          ) : null}
          <div className="BlockImage__Upload__Wrapper">
            <FromLocal onSelect={onSelect} />
            <FromLibrary onSelect={onSelect} />
          </div>
          {image?.id ? (
            <button
              onClick={() => {
                setEditMode(false);
              }}
              style={{ marginTop: "15px" }}
              className="BlockImage__Button"
            >
              {intl.formatMessage({ id: "CANCEL" })}
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

const WrappedComponent = (props: BlockModuleComponentProps<LibraryImage>) => {
  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <QueryClientProvider client={queryClient}>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "#EAFBF5",
                border: "1px solid #005A3A",
              },
            },
            error: {
              style: {
                background: "#FFEDED",
                border: "1px solid #D21919",
              },
            },
          }}
        />
        <BlockImageComponent {...props} />
      </QueryClientProvider>
    </IntlProvider>
  );
};

const initialData: LibraryImage = {
  url: null,
  id: null,
  title: "",
  fileName: "",
  tags: [],
};

const moduleType = {
  id: "blockImage",
};

const blockImage: BlockPluginDefinition<LibraryImage> = {
  type: moduleType,
  component: WrappedComponent,
  initialData,
  title: {
    default: "Image",
    fr: "Image",
    en: "Image",
    es: "Imagen",
    it: "Immagine",
  },
  description: {
    default: "Display an image",
    fr: "Affiche une image",
    en: "Display an image",
    es: "Mostrar una imagen",
    it: "Mostra un immagine",
  },
  icon: Icon,
  image: {
    default: "",
  },
};

export default blockImage;
