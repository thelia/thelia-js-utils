import { useEffect } from "react";

import Iframe from "../Iframe/Iframe";
import ReactModal from "react-modal";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePreviewGroup } from "../../utils/queries";
import { ReactComponent as XMarkIcon } from "../../../assets/svg/xmark.svg";

import "./Preview.css";
import Modal from "../Modal";
import { useIntl } from "react-intl";

export default function Preview({
  isOpen,
  setIsOpen,
  setIsPreviewLoading,
  showError,
  timestamp,
  data,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  setIsPreviewLoading: Function;
  showError: Function;
  timestamp: number;
  data?: string;
}) {
  const { blockList } = useBlocksContext();
  const preview = usePreviewGroup(timestamp, JSON.stringify(data || blockList));
  const intl = useIntl();

  useEffect(() => {
    if (preview.isError) {
      showError();

      return;
    }
  }, [preview]);

  useEffect(() => {
    if (preview.isLoading) {
      setIsPreviewLoading(true);
      return;
    }

    setIsPreviewLoading(false);
  }, [preview]);

  useEffect(() => {
    if (timestamp) {
      setIsOpen(true);
    }

    return () => setIsOpen(false);
  }, [timestamp]);

  return (
    <>
      {!preview.isLoading ? (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={intl.formatMessage({ id: "PreviewModal__TITLE" })}
        >
          {preview.data ? <Iframe content={preview.data} /> : null}
        </Modal>
      ) : null}
    </>
  );
}
