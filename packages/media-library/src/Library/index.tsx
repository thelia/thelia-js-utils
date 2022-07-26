import { useDeleteImage, useLibraryImage } from "../api";
import { ReactComponent as XMarkIcon } from "./assets/xmark.svg";

import ReactModal from "react-modal";

import { LibraryImage } from "../types";
import { Suspense, useState } from "react";

import "./Library.css";

const LibraryContent = ({
  limit = 20,
  onSelect,
}: {
  limit?: number;
  onSelect: (image: LibraryImage) => void;
}) => {
  const [offset, setOffset] = useState<number>(0);
  const [title, setTitle] = useState<string>("");

  const images = useLibraryImage({ offset, limit, title });
  const deleteMutation = useDeleteImage();

  return (
    <div className="Library">
      <div className="Library__Filters">
        <div>
          <label htmlFor="library-search">Rechercher dans le catalogue</label>
          <input
            className="Input__Text"
            placeholder="Entrez un nom, une référence, ..."
            type="text"
            name="library-search"
            id="library-search"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category-filter">Filtrer par catégorie</label>
          <select className="Input__Select" name="category-filter" id="category-filter">
            <option value="">tag 1</option>
            <option value="">tag 2</option>
          </select>
        </div>
      </div>
      <div className="Library__Content">
        {images.data?.map((image) => {
          return (
            <div className="Library__Item">
              <button
                onClick={() => {
                  onSelect(image);
                }}
                className="Library__Image"
                key={image.id}
              >
                <img
                  width="150"
                  height="150"
                  loading="lazy"
                  src={`/image-library/${image.id}/full/^!150,150/0/default.webp`}
                />
                <span className="Library__Image__Title">{image.title}</span>
              </button>
              <button
                type="button"
                className="BlockImage__Button"
                onClick={() => deleteMutation.mutate(image.id)}
                disabled={deleteMutation.isLoading}
              >
                supprimer
              </button>
            </div>
          );
        })}
      </div>
      {/* <div className="Library__Pagination">
        <button
          type="button"
          className="Button"
          onClick={() => setOffset((old) => Math.max(old - limit, 0))}
          disabled={offset === 0}
        >
          page précédente
        </button>
        <div className="px-4 Button">{offset / limit + 1}</div>
        <button
          type="button"
          className="Button"
          onClick={() => {
            if (!images.isPreviousData && (images?.data?.length || 0) >= limit) {
              setOffset((old) => old + limit);
            }
          }}
          disabled={images.isPreviousData || (images?.data?.length || 0) < limit}
        >
          page suivante
        </button>
        </div> */}
    </div>
  );
};

export default function Library({
  isOpen,
  setIsOpen,
  limit = 20,
  onSelect,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  limit?: number;
  onSelect: (image: LibraryImage) => void;
}) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="Modal-Library"
      overlayClassName="Overlay"
    >
      <div className="Modal__Wrapper">
        <div className="Modal__Header">
          <button onClick={() => setIsOpen(false)} className="Modal__Header__Close">
            <XMarkIcon />
          </button>

          <div className="Modal__Header__Title">Rechercher une image</div>
        </div>

        <div className="Modal__Content">
          <Suspense fallback={<i className="Loader fa fa-circle-notch fa-spin"></i>}>
            <LibraryContent onSelect={onSelect} limit={limit} />
          </Suspense>
        </div>
      </div>
    </ReactModal>
  );
}
