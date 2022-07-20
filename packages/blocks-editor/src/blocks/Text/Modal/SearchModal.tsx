import { forwardRef, MouseEventHandler, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { SearchProps } from "../../../utils/queries";
import Search from "./Search";

import "./SearchModal.css";

const Mode = ({
  mode,
  onClick,
}: {
  mode: SearchProps["searchIn"];
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className="bg-pearlMedium hover:bg-pearlLight text-mediumCharbon p-12 rounded-md flex flex-col gap-4 items-center justify-center w-1/5"
      onClick={onClick}
    >
      <i className="fas fa-link text-2xl"></i>
      <span className="text-center">{mode}</span>
    </button>
  );
};

const SearchModal = forwardRef(
  ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Function }, ref: any) => {
    const modes: SearchProps["searchIn"][] = ["product", "content", "folder", "category"];

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
        className="Modal-TheliaBlocks"
        overlayClassName="Overlay"
      >
        <div className="px-4 pb-4 pt-2 flex flex-col">
          <div className="flex mb-8">
            {isSearching ? (
              <button
                className="bg-pearlMedium hover:bg-pearlLight text-mediumCharbon px-2 py-1 rounded-md flex gap-2 items-center"
                onClick={() => setIsSearching(false)}
              >
                <i className="fa fa-chevron-left"></i>
                <span className="font-bold">Retour</span>
              </button>
            ) : (
              <div className="text-2xl font-bold">Insérer un lien</div>
            )}

            <button onClick={() => setIsOpen(false)} className="ml-auto">
              <i className="text-2xl text-darkCharbon hover:text-vermillon fa fa-xmark"></i>
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
            <div className="flex flex-col md:flex-row gap-4">
              <button
                className="bg-pearlMedium hover:bg-pearlLight text-mediumCharbon p-12 rounded-md flex flex-col gap-4 items-center justify-center w-1/5"
                onClick={() => {
                  setIsSearching(true);
                  setSearchIn("product");
                }}
              >
                <i className="fas fa-link text-2xl"></i>
                <span className="text-center">Lien</span>
              </button>
              {modes.map((mode) => (
                <Mode
                  key={mode}
                  mode={mode}
                  onClick={() => {
                    setSearchIn(mode);
                    setIsSearching(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </ReactModal>
    );
  }
);

export default SearchModal;
