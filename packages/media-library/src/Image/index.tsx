import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  queryClient,
} from "@thelia/blocks-editor";
import { Suspense, useEffect, useState } from "react";

import { ReactComponent as Icon } from "./assets/image.svg";
import Library from "../Library";
import { LibraryImage } from "../types";
import { QueryClientProvider } from "react-query";
import { useCreateImage } from "../api";

const FromLocal = ({ onSelect }: { onSelect: (value: LibraryImage) => void }) => {
  const createImage = useCreateImage();
  return (
    <div className="border border-dashed border-greyDark">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="">Télécharger une image</label>
        <input
          type="file"
          name=""
          id=""
          onChange={async (e) => {
            if (e.target.files) {
              const formData = new FormData();
              formData.append("image", e.target.files[0]);
              const res = await createImage.mutateAsync(formData);

              onSelect(res);
            }
          }}
        />
      </form>
    </div>
  );
};

const FromLibrary = ({ onSelect }: { onSelect: (value: LibraryImage) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span>Selectionnez une image depuis votre médiathèque</span>
      </button>
      {isOpen ? (
        <Library
          onSelect={(image) => {
            setIsOpen(false);
            onSelect(image);
          }}
        />
      ) : null}
    </>
  );
};

const Preview = ({ id }: { id: LibraryImage["id"] | null }) => {
  if (!id) return null;

  return (
    <div>
      <img src={`/image-library/${id}/full/^!300,300/0/default.webp`} alt="" />
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
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor="">titre</label>
        <input
          type="text"
          name="title"
          value={image.title}
          onChange={(e) => {
            onChange({
              title: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <label>titre lien</label>
        <input
          type="text"
          name="linkUrl"
          value={image.link?.url || ""}
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
    <div className="">
      {image && !isEditMode ? (
        <>
          <div className="flex">
            <Preview id={image.id} />

            <ImageInfos
              image={image}
              onChange={(values) => {
                onUpdate({ ...data, ...values });
              }}
            />
          </div>
          <button
            onClick={() => {
              setEditMode(true);
            }}
          >
            Changer
          </button>
        </>
      ) : null}
      {isEditMode ? (
        <>
          <div className="flex gap-4">
            <FromLocal onSelect={onSelect} />
            <FromLibrary onSelect={onSelect} />
          </div>
          {image?.id ? (
            <button
              onClick={() => {
                setEditMode(false);
              }}
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
      <Suspense fallback="chargement">
        <BlockImageComponent {...props} />
      </Suspense>
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
