import { useContext, useState } from "react";

import { BlocksGroupContext } from "../../providers/BlockGroupContext";
import ErrorBoundary from "../../components/ErrorBoundary";
import Preview from "../../components/Preview";
import toast from "react-hot-toast";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { useCreateOrUpdateGroup } from "../../utils/queries";

import "./ToolBar.css";
import { useIntl } from "react-intl";

const ToolBar = () => {
  const { group } = useContext(BlocksGroupContext);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [timestamp, setTimestamp] = useState<number>(0);
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);
  const intl = useIntl();
  const { blockList } = useBlocksContext();
  const mutation = useCreateOrUpdateGroup();

  return (
    <>
      <div className="Toolbar">
        <button
          className="Toolbar__View"
          onClick={() => {
            if (!blockList.length) {
              toast.error(intl.formatMessage({ id: "Toast__NO_BLOCKS_TO_DISPLAY" }));
              return;
            }
            setTimestamp(Date.now());
            setShowPreview(true);
          }}
          disabled={isPreviewLoading}
        >
          {isPreviewLoading ? (
            <>
              <i className="fa fa-circle-notch fa-spin Toolbar__View__Icon"></i>
              {intl.formatMessage({ id: "LOADING" })}
            </>
          ) : (
            <>
              <i className="fas fa-eye Toolbar__View__Icon"></i>
              {intl.formatMessage({ id: "PREVIEW" })}
            </>
          )}
        </button>
        <button
          className="Toolbar__Save"
          disabled={mutation.isLoading}
          onClick={() => {
            if (!group?.title) {
              toast.error(intl.formatMessage({ id: "Toast__BLOCK_MUST_HAVE_A_NAME" }));
              return;
            }
            mutation.mutate({ blocks: blockList });
          }}
        >
          {mutation.isLoading ? (
            <>
              <i className="fa fa-circle-notch fa-spin Toolbar__Save__Icon"></i>
              {intl.formatMessage({ id: "SAVING" })}
            </>
          ) : (
            <>{intl.formatMessage({ id: "SAVE" })}</>
          )}
        </button>
      </div>
      <ErrorBoundary>
        <Preview
          isOpen={showPreview}
          setIsOpen={setShowPreview}
          setIsPreviewLoading={setIsPreviewLoading}
          timestamp={timestamp}
        />
      </ErrorBoundary>
    </>
  );
};

export default ToolBar;
