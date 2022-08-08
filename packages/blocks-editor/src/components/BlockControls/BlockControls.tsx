import Tippy from "@tippyjs/react";
import useWindowSize from "../../hooks/useWindowSize";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { useIntl } from "react-intl";

import "./BlockControls.css";

const BlockControls = ({
  blockId,
  blockIndex,
  inLayout = false,
  DndDragHandle,
}: {
  blockId: string;
  blockIndex: number;
  inLayout?: boolean;
  DndDragHandle: () => JSX.Element;
}) => {
  const { blockList, removeBlock, moveBlockUp, moveBlockDown } = useBlocksContext();
  const intl = useIntl();
  const { width } = useWindowSize();

  return (
    <div className="BlockControls">
      {DndDragHandle && (
        <div
          className={`${
            !inLayout && width > 1024
              ? "BlockControl BlockControl--drag"
              : "NestedBlockControl"
          }`}
        >
          <DndDragHandle />
        </div>
      )}

      <Tippy
        delay={[700, 0]}
        disabled={!inLayout && width > 1024}
        content={"Monter l'élément"}
      >
        <button
          className={`${
            !inLayout && width > 1024
              ? "BlockControl BlockControl--left"
              : "NestedBlockControl"
          }`}
          disabled={blockIndex === 0}
          onClick={() => moveBlockUp(blockIndex)}
        >
          <i className="fa fa-arrow-up"></i>
          {!inLayout && width > 1024 && (
            <span className="BlockControl__Label">
              {intl.formatMessage({ id: "UP" })}
            </span>
          )}
        </button>
      </Tippy>
      <Tippy
        delay={[700, 0]}
        disabled={!inLayout && width > 1024}
        content={"Descendre l'élément"}
        placement={"bottom"}
      >
        <button
          className={`${
            !inLayout && width > 1024
              ? "BlockControl BlockControl--center"
              : "NestedBlockControl"
          }`}
          disabled={blockIndex === blockList.length - 1}
          onClick={() => moveBlockDown(blockIndex)}
        >
          <i className="fa fa-arrow-down"></i>
          {!inLayout && width > 1024 && (
            <span className="BlockControl__Label">
              {intl.formatMessage({ id: "DOWN" })}
            </span>
          )}
        </button>
      </Tippy>

      <Tippy
        delay={[700, 0]}
        disabled={!inLayout && width > 1024}
        content={"Supprimer l'élément"}
        placement={"bottom"}
      >
        <button
          className={`${
            !inLayout && width > 1024
              ? "BlockControl BlockControl--right BlockControl--danger"
              : "NestedBlockControl NestedBlockControl--danger"
          }`}
          onClick={() => removeBlock(blockId)}
        >
          <i className="fa fa-trash-alt"></i>
          {!inLayout && width > 1024 && (
            <span className="BlockControl__Label">
              {intl.formatMessage({ id: "DELETE" })}
            </span>
          )}
        </button>
      </Tippy>
    </div>
  );
};

export default BlockControls;
