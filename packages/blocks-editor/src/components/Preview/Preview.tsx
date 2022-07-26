import { useEffect } from "react";

import Iframe from "../Iframe/Iframe";
import ReactModal from "react-modal";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePreviewGroup } from "../../utils/queries";
import { ReactComponent as XMarkIcon } from "../../../assets/svg/xmark.svg";

import "./Preview.css";
import Modal from "../Modal";

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
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Prévisualisation de votre Thelia Blocks"
        >
          {preview.data ? <Iframe content={preview.data} /> : null}
        </Modal>
      ) : null}
    </>
  );
}
