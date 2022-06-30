import { useEffect, useState } from "react";

import Iframe from "../Iframe/Iframe";
import ReactModal from "react-modal";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePreviewGroup } from "../../utils/queries";

export default function Preview({
  timestamp,
  data,
}: {
  timestamp: number;
  data?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const { blockList } = useBlocksContext();
  const preview = usePreviewGroup(timestamp, JSON.stringify(data || blockList));

  useEffect(() => {
    if (timestamp) {
      setIsOpen(true);
    }

    return () => {
      setIsOpen(false);
    };
  }, [timestamp]);

  if (preview.isLoading) {
    return <div className="text-green text-4xl">Chargement</div>;
  }

  if (preview.isError) {
    // return <div className="text-red text-4xl">Erreu lolr</div>;
  }

  return (
    <ReactModal
      onRequestClose={() => setIsOpen(false)}
      isOpen={isOpen}
      overlayClassName="Overlay"
      className="Modal-TheliaBlocks"
    >
      <button onClick={() => setIsOpen(false)} className="bg-red">
        Close
      </button>
      {preview.data ? <Iframe content={preview.data} /> : null}
    </ReactModal>
  );
}
