import {
  useAssociateTag,
  useDeleteImage,
  useDeleteTagAssociation,
  useGetTags,
  useLibraryImage,
} from "../utils/queries";
import { ReactComponent as XMarkIcon } from "./assets/xmark.svg";
import { ReactComponent as TrashIcon } from "./assets/trash.svg";
import { ReactComponent as TagXMarkIcon } from "./assets/tag-xmark.svg";
import ReactModal from "react-modal";
import { ImageTag, LibraryImage as LibraryImageType } from "../types/types";
import { Suspense, useContext, useState } from "react";
import { IntlProvider, useIntl } from "react-intl";
import Input from "../Input";
import ErrorBoundary from "../ErrorBoundary";
import { locale, messages } from "../utils/intl";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@thelia/fetcher";
import "./Library.css";
import { LocaleContext } from "@thelia/blocks-editor";
import { UploadImage } from "../Image";

const TagsList = ({
  currentTags,
  onUpdate,
}: {
  currentTags: ImageTag[];
  onUpdate: Function;
}) => {
  const { data } = useGetTags();

  const tags =
    data?.filter(
      (tagFromServer) =>
        !currentTags.find(
          ({ tag }: { tag: ImageTag["tag"] }) => tag.id === tagFromServer.id
        )
    ) || [];

  return (
    <ul className="TagList">
      {tags?.length > 0 ? (
        tags.map((tag) => (
          <li
            key={tag.id}
            onClick={() => {
              onUpdate(tag);
            }}
            className="TagList__Item"
          >
            <span>{tag.title}</span>
          </li>
        ))
      ) : (
        <li className="TagList__Item">
          <span>No tags available.</span>
        </li>
      )}
    </ul>
  );
};

const TagConfigurationModal = ({
  isOpen,
  setIsOpen,
  image,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  image: LibraryImageType;
}) => {
  const [showTags, setShowTags] = useState(false);

  const intl = useIntl();

  const deleteTagAssociation = useDeleteTagAssociation();
  const associateTag = useAssociateTag();

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      className="Modal-Tags"
      overlayClassName="Overlay"
    >
      <div className="Modal__Wrapper">
        <div className="Modal__Header">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="Modal__Header__Close"
          >
            <XMarkIcon />
          </button>

          <div className="Modal__Header__Title">
            {intl.formatMessage({ id: "BlockImage__LIBRARY_IMAGE_TAG_CONFIG" })}{" "}
            {image.title}
          </div>
        </div>

        <div className="Modal__Content" style={{ overflow: "inherit" }}>
          <div>
            <label>
              {intl.formatMessage({ id: "BlockImage__LIBRARY_IMAGE_ADD_TAG" })}
            </label>
            <div className="BlockImage__TagSelector">
              <div
                className="BlockImage__TagSelector__Tags"
                style={{ paddingLeft: image.tags.length < 1 ? "14px" : "0" }}
              >
                {image.tags.length
                  ? image.tags.map(({ tag, imageTag }: ImageTag) => (
                      <div
                        key={tag.id}
                        className="BlockImage__TagSelector__Tag"
                      >
                        <span>{tag.title}</span>
                        <button
                          className="BlockImage__TagSelector__Tag__Remove"
                          onClick={() =>
                            deleteTagAssociation.mutate(imageTag.id || 57)
                          }
                        >
                          <TagXMarkIcon />
                        </button>
                      </div>
                    ))
                  : !associateTag.isLoading
                  ? intl.formatMessage({
                      id: "BlockImage__LIBRARY_IMAGE_SELECT_TAG",
                    })
                  : null}

                {associateTag.isLoading && (
                  <div className="BlockImage__TagSelector__Tag">
                    <span>
                      <i className="fa fa-circle-notch fa-spin"></i>
                    </span>
                  </div>
                )}
              </div>
              <button
                className="BlockImage__TagSelector__Add"
                onClick={() => setShowTags(!showTags)}
                disabled={
                  associateTag.isLoading || deleteTagAssociation.isLoading
                }
              >
                <i className="block fas fa-plus"></i>
              </button>
              {showTags ? (
                <Suspense
                  fallback={
                    <div className="BlockProduct__Loader">
                      <i className="fa fa-circle-notch fa-spin"></i>
                    </div>
                  }
                >
                  <TagsList
                    currentTags={image.tags}
                    onUpdate={(selectedTag: ImageTag["tag"]) => {
                      associateTag.mutate({
                        imageId: image.id,
                        tagId: selectedTag.id,
                      });
                      setShowTags(false);
                    }}
                  />
                </Suspense>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

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
    <div className="Select__Wrapper">
      <div className="Input__Select__Separator"></div>
      <label htmlFor="tag-filter" style={{ display: "flex" }}>
        {intl.formatMessage({ id: "BlockImage__LIBRARY_MODAL_TAG_FILTER" })}
      </label>
      <select
        className="Input__Select"
        name="tag-filter"
        id="tag-filter"
        onChange={(e) => setTagId(e.target.value)}
      >
        <Suspense
          fallback={<option>{intl.formatMessage({ id: "LOADING" })}</option>}
        >
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
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const intl = useIntl();

  const deleteMutation = useDeleteImage();
  const { getUrlWithPrefix } = useContext(LocaleContext);

  return (
    <>
      <div className="Library__Image">
        <div className="Library__Image__Tags">
          {image.tags?.map(({ tag }: { tag: ImageTag["tag"] }) => (
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
          src={getUrlWithPrefix(
            `/image-library/${image.id}/full/^!150,150/0/default.webp`
          )}
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
          <div className="Library__Image__Actions__Wrapper">
            <button
              className="Library__Image__Tag__Action"
              onClick={() => setIsTagModalOpen(true)}
            >
              <i className="fas fa-tag"></i>
            </button>
            <button
              className="Library__Image__Delete__Action"
              onClick={() => deleteMutation.mutate(image.id)}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
      <TagConfigurationModal
        image={image}
        isOpen={isTagModalOpen}
        setIsOpen={setIsTagModalOpen}
      />
    </>
  );
};

const LibraryContent = ({
  limit = 20,
  onSelect,
  setMode,
}: {
  limit?: number;
  onSelect: (image: LibraryImageType) => void;
  setMode: Function;
}) => {
  const [offset, setOffset] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [tagId, setTagId] = useState<number>();

  const {
    data: images = [],
    isFetching,
    isPreviousData,
  } = useLibraryImage({
    offset,
    limit,
    title,
    tagId,
  });

  const intl = useIntl();

  return (
    <div className="Library">
      <div className="Library__Filters">
        <Input
          placeholder={intl.formatMessage({ id: "SEARCH_BY" })}
          type="text"
          name="library-search"
          id="library-search"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label={intl.formatMessage({ id: "BlockImage__LIBRARY_MODAL_SEARCH" })}
          icon={<i className="fa fa-search emphasize"></i>}
          iconAlignment="right"
        />

        <TagFilter setTagId={setTagId} />

        <button
          className="BlockImage__Button"
          style={{
            marginTop: "auto",
            height: "40px",
          }}
          onClick={() => setMode("upload")}
        >
          {intl.formatMessage({ id: "BlockImage__LIBRARY_MODAL_TITLE_UPLOAD" })}
        </button>
      </div>

      <div className="Library__Content">
        {isFetching ? (
          <div className="Modal__Content__Loader">
            <span>
              {intl.formatMessage({ id: "BlockImage__LIBRARY_SEARCHING" })}
            </span>
            <i className="Loader fa fa-circle-notch fa-spin"></i>
          </div>
        ) : images.length > 0 ? (
          images?.map((image) => {
            return (
              <LibraryImage key={image.id} image={image} onSelect={onSelect} />
            );
          })
        ) : (
          <div className="Library__NoContent">
            <span>
              {intl.formatMessage({ id: "BlockImage__LIBRARY_NO_CONTENT" })}
            </span>
          </div>
        )}
      </div>

      <div className="Pagination">
        <button
          className="Pagination__Button Pagination__Button--previous"
          onClick={() => setOffset((old) => Math.max(old - limit, 0))}
          disabled={offset === 0}
        >
          <i className="fa fa-chevron-left"></i>
        </button>
        <div className="Pagination__Button Pagination__Button--page">
          {offset / limit + 1}
        </div>
        <button
          className="Pagination__Button Pagination__Button--next"
          onClick={() => {
            if (!isPreviousData && (images?.length || 0) >= limit) {
              setOffset((old) => old + limit);
            }
          }}
          disabled={isPreviousData || (images?.length || 0) < limit}
        >
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

function Library({
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

  const [mode, setMode] = useState<"upload" | "library">("library");

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className={mode === "upload" ? "Modal-Upload" : "Modal-Library"}
      ariaHideApp={false}
      overlayClassName="Overlay"
    >
      <div className="Modal__Wrapper">
        <div className="Modal__Header">
          <button
            onClick={() => setIsOpen(false)}
            className="Modal__Header__Close"
          >
            <XMarkIcon />
          </button>

          <div className="Modal__Header__Title">
            {mode === "upload" ? (
              <button className="mr-2" onClick={() => setMode("library")}>
                <i className="fas fa-chevron-left"></i>
              </button>
            ) : null}
            {mode === "library"
              ? intl.formatMessage({ id: "BlockImage__LIBRARY_MODAL_TITLE" })
              : intl.formatMessage({
                  id: "BlockImage__LIBRARY_MODAL_TITLE_UPLOAD",
                })}
          </div>
        </div>

        <div className="Modal__Content">
          {mode === "library" ? (
            <Suspense
              fallback={
                <div className="Modal__Content__Loader">
                  <span>
                    {intl.formatMessage({ id: "BlockImage__LIBRARY_LOADING" })}
                  </span>
                  <i className="Loader fa fa-circle-notch fa-spin"></i>
                </div>
              }
            >
              <ErrorBoundary>
                <LibraryContent
                  onSelect={onSelect}
                  limit={limit}
                  setMode={setMode}
                />
              </ErrorBoundary>
            </Suspense>
          ) : (
            <UploadImage onSelect={onSelect} uploadModes={["local"]} />
          )}
        </div>
      </div>
    </ReactModal>
  );
}

export default function WrappedComponent(props: {
  isOpen: boolean;
  setIsOpen: Function;
  limit?: number;
  onSelect: (image: LibraryImageType) => void;
}) {
  return (
    <IntlProvider
      locale={locale}
      defaultLocale="fr"
      messages={messages[locale] || messages["fr"]}
    >
      <QueryClientProvider client={queryClient}>
        <Library {...props} />
      </QueryClientProvider>
    </IntlProvider>
  );
}
