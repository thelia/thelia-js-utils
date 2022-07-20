import { useDeleteImage, useLibraryImage } from "../api";

import { LibraryImage } from "../types";
import { useState } from "react";

export default function Library({
  limit = 20,
  onSelect,
}: {
  limit?: number;
  onSelect: (image: LibraryImage) => void;
}) {
  const [offset, setOffset] = useState<number>(0);

  const images = useLibraryImage({ offset, limit });
  const deleteMutation = useDeleteImage();

  return (
    <div>
      <div>Rechercher une image</div>
      <div className="flex flex-wrap gap-4">
        <div>
          <label htmlFor="">Rechercher dans le catalogue</label>
          <input type="text" name="" id="" />
        </div>
        <div>
          <label htmlFor="">Filtrer par catégories</label>
          <select name="" id="">
            <option value="">tag 1</option>
            <option value="">tag 2</option>
          </select>
        </div>
      </div>
      <div className="flex">
        {images.data?.map((image) => {
          return (
            <div key={image.id}>
              <img
                width="300"
                height="300"
                loading="lazy"
                src={`/image-library/${image.id}/full/^!300,300/0/default.webp`}
              />
              <button
                onClick={() => {
                  onSelect(image);
                }}
              >
                Selectionner
              </button>
              <button
                type="button"
                className=""
                onClick={() => deleteMutation.mutate(image.id)}
                disabled={deleteMutation.isLoading}
              >
                supprimer
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-8 mt-4">
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
            if (
              !images.isPreviousData &&
              (images?.data?.length || 0) >= limit
            ) {
              setOffset((old) => old + limit);
            }
          }}
          disabled={
            images.isPreviousData || (images?.data?.length || 0) < limit
          }
        >
          page suivante
        </button>
      </div>
    </div>
  );
}
