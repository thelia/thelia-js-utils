import { useEffect, useState } from "react";

import Iframe from "../Iframe/Iframe";
import ReactModal from "react-modal";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePreviewGroup } from "../../utils/queries";

import "./Preview.css";

export default function Preview({
  isOpen,
  setIsOpen,
  setIsPreviewLoading,
  timestamp,
  data,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  setIsPreviewLoading: Function;
  timestamp: number;
  data?: string;
}) {
  const { blockList } = useBlocksContext();
  const preview = usePreviewGroup(timestamp, JSON.stringify(data || blockList));

  useEffect(() => {
    if (preview.isLoading) {
      return setIsPreviewLoading(true);
    }

    setIsPreviewLoading(false);
  }, [preview]);

  useEffect(() => {
    if (timestamp) {
      setIsOpen(true);
    }

    return () => {
      setIsOpen(false);
    };
  }, [timestamp]);

  return (
    <>
      {!preview.isLoading ? (
        <ReactModal
          onRequestClose={() => setIsOpen(false)}
          isOpen={isOpen}
          overlayClassName="Overlay"
          className="Modal-TheliaBlocks"
        >
          <div className="Preview__Modal">
            <button onClick={() => setIsOpen(false)} className="Preview__Modal__Close">
              <i className="Preview__Modal__Close__Icon fa fa-xmark"></i>
            </button>
            <div className="Preview__Modal__Content">
              <div className="Preview__Modal__Title">
                Prévisualisation de votre Thelia Blocks
              </div>
              <div className="Preview__Modal__BlocksList__Wrapper">
                {preview.data ? <Iframe content={preview.data} /> : null}
              </div>
            </div>
          </div>
        </ReactModal>
      ) : null}
    </>
  );
}
