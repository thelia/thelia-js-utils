import { forwardRef, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { SearchProps } from "../../../utils/queries";
import Search from "./Search";

import { ReactComponent as XMarkIcon } from "../../../../assets/svg/xmark.svg";

import "./SearchModal.css";
import { useIntl } from "react-intl";

const SearchModal = forwardRef(
  ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Function }, ref: any) => {
    const [isSearching, setIsSearching] = useState(false);
    const [mode, setMode] = useState<SearchProps["searchIn"] | "link">("product");
    const intl = useIntl();

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
              <button
                className="flex flex-col items-center justify-center w-full gap-4 p-12 rounded-md bg-pearlMedium hover:bg-pearlLight text-mediumCharbon md:w-1/4"
                onClick={() => {
                  setIsSearching(true);
                  setMode("link");
                }}
              >
                <i className="text-2xl fas fa-link"></i>
                <span className="text-center">{intl.formatMessage({ id: "LINK" })}</span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-full gap-4 p-12 rounded-md bg-pearlMedium hover:bg-pearlLight text-mediumCharbon md:w-1/4"
                onClick={() => {
                  setIsSearching(true);
                  setMode("product");
                }}
              >
                <i className="text-2xl fas fa-box"></i>
                <span className="text-center">
                  {intl.formatMessage({ id: "PRODUCTS" })}
                </span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-full gap-4 p-12 rounded-md bg-pearlMedium hover:bg-pearlLight text-mediumCharbon md:w-1/4"
                onClick={() => {
                  setIsSearching(true);
                  setMode("folder");
                }}
              >
                <i className="text-2xl fas fa-folder-open"></i>
                <span className="text-center">
                  {intl.formatMessage({ id: "FOLDERS" })}
                </span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-full gap-4 p-12 rounded-md bg-pearlMedium hover:bg-pearlLight text-mediumCharbon md:w-1/4"
                onClick={() => {
                  setIsSearching(true);
                  setMode("category");
                }}
              >
                <i className="text-2xl fas fa-book"></i>
                <span className="text-center">
                  {intl.formatMessage({ id: "CATEGORIES" })}
                </span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-full gap-4 p-12 rounded-md bg-pearlMedium hover:bg-pearlLight text-mediumCharbon md:w-1/4"
                onClick={() => {
                  setIsSearching(true);
                  setMode("content");
                }}
              >
                <i className="text-2xl fas fa-file-alt"></i>
                <span className="text-center">
                  {intl.formatMessage({ id: "CONTENTS" })}
                </span>
              </button>
            </div>
          )}
        </div>
      </ReactModal>
    );
  }
);

export default SearchModal;
