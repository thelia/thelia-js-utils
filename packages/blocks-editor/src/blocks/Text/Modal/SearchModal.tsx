import { forwardRef, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { SearchProps } from "../../../utils/queries";
import Search from "./Search";

import { ReactComponent as XMarkIcon } from "../../../../assets/svg/xmark.svg";

import "./SearchModal.css";

const SearchModal = forwardRef(
  ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Function }, ref: any) => {
    const [isSearching, setIsSearching] = useState(false);
    const [searchIn, setSearchIn] = useState<SearchProps["searchIn"]>("product");

    useEffect(() => {
      ref.current.editor.formatText(0, 5, "customLink", {
        href: "www.google.com",
        target: "_self",
      });
    }, []);

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
              <button
                className="flex items-center gap-2 px-2 py-1 rounded-md bg-pearlMedium hover:bg-pearlLight text-mediumCharbon"
                onClick={() => setIsSearching(false)}
              >
                <i className="fa fa-chevron-left"></i>
                <span className="font-bold">Retour</span>
              </button>
            ) : (
              <div className="text-2xl font-bold">Insérer un lien</div>
            )}

            <button onClick={() => setIsOpen(false)} className="ml-auto">
              <XMarkIcon className="text-2xl text-darkCharbon hover:text-vermillon" />
            </button>
          </div>

          {isSearching ? (
            <Search
              searchIn={searchIn}
              setIsModalOpen={setIsOpen}
              cursorIndex={
                ref?.current?.editor?.getText()?.index ||
                ref?.current?.editor?.getLength() - 1 ||
                0
              }
              ref={ref}
            />
          ) : (
            <div className="flex flex-col gap-4 overflow-scroll md:flex-row">
              <button
                className="flex flex-col items-center justify-center w-full gap-4 p-12 rounded-md bg-pearlMedium hover:bg-pearlLight text-mediumCharbon md:w-1/4"
                onClick={() => {
                  setIsSearching(true);
                  setSearchIn("product");
                }}
              >
                <i className="text-2xl fas fa-box"></i>
                <span className="text-center">Produits</span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-full gap-4 p-12 rounded-md bg-pearlMedium hover:bg-pearlLight text-mediumCharbon md:w-1/4"
                onClick={() => {
                  setIsSearching(true);
                  setSearchIn("folder");
                }}
              >
                <i className="text-2xl fas fa-folder-open"></i>
                <span className="text-center">Dossiers</span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-full gap-4 p-12 rounded-md bg-pearlMedium hover:bg-pearlLight text-mediumCharbon md:w-1/4"
                onClick={() => {
                  setIsSearching(true);
                  setSearchIn("category");
                }}
              >
                <i className="text-2xl fas fa-book"></i>
                <span className="text-center">Catégories</span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-full gap-4 p-12 rounded-md bg-pearlMedium hover:bg-pearlLight text-mediumCharbon md:w-1/4"
                onClick={() => {
                  setIsSearching(true);
                  setSearchIn("content");
                }}
              >
                <i className="text-2xl fas fa-file-alt"></i>
                <span className="text-center">Contenus</span>
              </button>
            </div>
          )}
        </div>
      </ReactModal>
    );
  }
);

export default SearchModal;
