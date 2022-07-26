import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  queryClient,
} from "@thelia/blocks-editor";
import { Suspense, useEffect, useState } from "react";

import { ReactComponent as Icon } from "./assets/image.svg";
import { ReactComponent as DownloadIcon } from "./assets/download.svg";
import { ReactComponent as MediathequeIcon } from "./assets/mediatheque.svg";

import Library from "../Library";
import { LibraryImage } from "../types";
import { QueryClientProvider } from "react-query";
import { useCreateImage } from "../api";

import "./Image.css";

const FromLocal = ({ onSelect }: { onSelect: (value: LibraryImage) => void }) => {
  const createImage = useCreateImage();

  return (
    <div className="BlockImage__FromLocal">
      <div className="BlockImage__FromLocal__Icon">
        <DownloadIcon />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="BlockImage__Button" htmlFor="image">
          Télécharger une image
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
        <span>ou déposez une image</span>
      </form>
    </div>
  );
};

const FromLibrary = ({ onSelect }: { onSelect: (value: LibraryImage) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <span>Selectionnez une image depuis votre médiathèque</span>
      </button>

      {isOpen ? (
        <Library
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSelect={(image) => {
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
  if (!id) return null;

  return (
    <div className="BlockImage__Preview">
      <img src={`/image-library/${id}/full/^!220,220/0/default.webp`} alt="" />

      <div className="BlockImage__Preview__Infos">
        <span className="BlockImage__Preview__FileName">{fileName}</span>
        <button
          className="BlockImage__Button"
          onClick={() => {
            setEditMode(true);
          }}
        >
          Remplacer
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
  return (
    <form
      className="BlockImage__Infos__Form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor="">Titre de l'image</label>
        <input
          className="Input__Text"
          type="text"
          name="title"
          value={image.title}
          placeholder="Titre de l'image"
          onChange={(e) => {
            onChange({
              title: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <label>Lien au clic (optionnel)</label>
        <input
          className="Input__Text"
          type="text"
          name="linkUrl"
          value={image.link?.url || ""}
          placeholder="Lien au clic sur l'image"
          onChange={(e) => {
            onChange({
              link: {
                url: e.target.value,
              },
            });
          }}
        />
      </div>
    </form>
  );
};

const BlockImageComponent = (props: BlockModuleComponentProps<LibraryImage>) => {
  const { data, onUpdate } = props;

  const [image, setImage] = useState<LibraryImage | null>(null);
  const [isEditMode, setEditMode] = useState<boolean>(false);

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
              Remplacer l'image "{image.title}"
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
              Annuler
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

const WrappedComponent = (props: BlockModuleComponentProps<LibraryImage>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BlockImageComponent {...props} />
    </QueryClientProvider>
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
  component: WrappedComponent,
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
