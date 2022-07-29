import { useDeleteImage, useGetTags, useLibraryImage } from "../utils/queries";
import { ReactComponent as XMarkIcon } from "./assets/xmark.svg";
import { ReactComponent as TrashIcon } from "./assets/trash.svg";
import ReactModal from "react-modal";
import { LibraryImage as LibraryImageType } from "../types/types";
import { Suspense, useState } from "react";
import { useIntl } from "react-intl";

import "./Library.css";

const TagFilterOptions = () => {
  const intl = useIntl();

  const { data: tags } = useGetTags();

  return (
    <>
      <option value="">{intl.formatMessage({ id: "ALL_TAGS" })}</option>
      {tags?.map((tag) => (
        <option key={tag.id} value={tag.id}>
          {tag.title}
        </option>
      ))}
    </>
  );
};

const TagFilter = ({ setTagId }: { setTagId: Function }) => {
  const intl = useIntl();

  return (
    <div>
      <label htmlFor="tag-filter">
        {intl.formatMessage({ id: "BlockImage__LIBRARY_MODAL_TAG_FILTER" })}
      </label>
      <select
        className="Input__Select"
        name="tag-filter"
        id="tag-filter"
        onChange={(e) => setTagId(e.target.value)}
      >
        <Suspense fallback={<option>{intl.formatMessage({ id: "LOADING" })}</option>}>
          <TagFilterOptions />
        </Suspense>
      </select>
    </div>
  );
};

const LibraryImage = ({
  image,
  onSelect,
}: {
  image: LibraryImageType;
  onSelect: (value: LibraryImageType) => void;
}) => {
  const intl = useIntl();

  const deleteMutation = useDeleteImage();

  return (
    <div className="Library__Image">
      <div className="Library__Image__Tags">
        {image.tags?.map((tag) => (
          <span
            key={tag.id}
            style={{
              border: `1px solid ${tag.colorCode}`,
              color: tag.colorCode,
              /* backgroundColor: hexToRGBA(tag.colorCode, 0.5), */
            }}
            className="Library__Image__Tag"
          >
            {tag.title}
          </span>
        ))}
      </div>
      <img
        width="150"
        height="150"
        loading="lazy"
        src={`/image-library/${image.id}/full/^!150,150/0/default.webp`}
      />
      <span className="Library__Image__Title">{image.title}</span>

      <div className="Library__Image__Actions">
        <span className="Library__Image__Action__Title">{image.title}</span>
        <button
          className="Library__Image__Select__Action"
          style={{ marginTop: "12px", marginBottom: "6px" }}
          onClick={() => onSelect(image)}
        >
          {intl.formatMessage({ id: "CHOOSE" })}
        </button>
        <button
          className="Library__Image__Delete__Action"
          onClick={() => deleteMutation.mutate(image.id)}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

const LibraryContent = ({
  limit = 20,
  onSelect,
}: {
  limit?: number;
  onSelect: (image: LibraryImageType) => void;
}) => {
  const [offset, setOffset] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [tagId, setTagId] = useState<number | null>(null);

  const intl = useIntl();

  const { data: images, isFetching } = useLibraryImage({ offset, limit, title, tagId });

  return (
    <div className="Library">
      <div className="Library__Filters">
        <div>
          <label htmlFor="library-search">
            {intl.formatMessage({ id: "BlockImage__LIBRARY_MODAL_SEARCH" })}
          </label>
          <input
            className="Input__Text"
            placeholder={intl.formatMessage({ id: "SEARCH_BY" })}
            type="text"
            name="library-search"
            id="library-search"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <TagFilter setTagId={setTagId} />
      </div>
      <div className="Library__Content">
        {isFetching ? (
          <i className="Loader fa fa-circle-notch fa-spin"></i>
        ) : (
          <>
            {images?.map((image) => {
              return <LibraryImage key={image.id} image={image} onSelect={onSelect} />;
            })}
          </>
        )}
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
  onSelect: (image: LibraryImageType) => void;
}) {
  const intl = useIntl();

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

          <div className="Modal__Header__Title">
            {intl.formatMessage({ id: "BlockImage__LIBRARY_MODAL_TITLE" })}
          </div>
        </div>

        <div className="Modal__Content">
          <Suspense
            fallback={
              <div className="Modal__Content__Loader">
                <span>{intl.formatMessage({ id: "BlockImage__LIBRARY_LOADING" })}</span>
                <i className="Loader fa fa-circle-notch fa-spin"></i>
              </div>
            }
          >
            <LibraryContent onSelect={onSelect} limit={limit} />
          </Suspense>
        </div>
      </div>
    </ReactModal>
  );
}
