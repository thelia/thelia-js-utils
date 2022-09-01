import { forwardRef, ReactNode, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { SearchProps } from "../../../utils/queries";
import Search from "./Search";

import { ReactComponent as XMarkIcon } from "../../../../assets/svg/xmark.svg";

import "./SearchModal.css";
import { useIntl } from "react-intl";

type Mode = "link" | "product" | "category" | "folder" | "content";

const SearchModal = forwardRef(
  ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Function }, ref: any) => {
    const intl = useIntl();

    const modes: Record<Mode, { mode: Mode; icon: ReactNode; title: string }> = {
      link: {
        mode: "link",
        icon: <i className="text-2xl fas fa-link"></i>,
        title: intl.formatMessage({ id: "URL" }),
      },
      product: {
        mode: "product",
        icon: <i className="text-2xl fas fa-box"></i>,
        title: intl.formatMessage({ id: "PRODUCTS" }),
      },
      folder: {
        mode: "folder",
        icon: <i className="text-2xl fas fa-folder-open"></i>,
        title: intl.formatMessage({ id: "FOLDERS" }),
      },
      category: {
        mode: "category",
        icon: <i className="text-2xl fas fa-book"></i>,
        title: intl.formatMessage({ id: "CATEGORIES" }),
      },
      content: {
        mode: "content",
        icon: <i className="text-2xl fas fa-file-alt"></i>,
        title: intl.formatMessage({ id: "CONTENTS" }),
      },
    };

    const [isSearching, setIsSearching] = useState(false);
    const [mode, setMode] = useState<Mode>("product");

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
          setIsSearching(false);
        }}
        className="Modal-InsertLink"
        overlayClassName="Overlay"
      >
        <div className="flex flex-col px-4 pt-2 pb-4">
          <div className="flex mb-8">
            {isSearching ? (
              <div className="Search__Back__Wrapper">
                <button className="Search__Back" onClick={() => setIsSearching(false)}>
                  {intl.formatMessage({ id: "BACK" })}
                </button>
                <i className="fa fa-chevron-left"></i>
              </div>
            ) : (
              <div className="text-2xl font-bold">
                {intl.formatMessage({ id: "INSERT_LINK" })}
              </div>
            )}

            <button onClick={() => setIsOpen(false)} className="ml-auto">
              <XMarkIcon className="text-2xl text-darkCharbon hover:text-vermillon" />
            </button>
          </div>

          {isSearching ? (
            <Search
              mode={mode}
              setIsModalOpen={setIsOpen}
              setIsSearching={setIsSearching}
              cursorIndex={
                ref?.current?.editor?.getText()?.index ||
                ref?.current?.editor?.getLength() - 1 ||
                0
              }
              ref={ref}
            />
          ) : (
            <div className="flex flex-col gap-4 overflow-auto md:flex-row">
              {Object.entries(modes).map(([key, mode]) => (
                <button
                  key={key}
                  className="flex flex-col items-center justify-center w-full gap-4 p-12 rounded-md bg-pearlMedium hover:bg-pearlLight text-mediumCharbon md:w-1/4"
                  onClick={() => {
                    setIsSearching(true);
                    setMode(mode.mode);
                  }}
                >
                  {mode.icon}
                  <span className="text-center">{mode.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </ReactModal>
    );
  }
);

export default SearchModal;
