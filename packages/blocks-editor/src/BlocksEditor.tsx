import { Suspense, useContext, useLayoutEffect } from "react";
import AddBlocks from "./components/AddBlocks";
import { BlockContextProvider } from "./providers/BlockContext";
import BlocksContent from "./components/BlocksContent/BlocksContent";
import { BlocksGroupProvider, BlocksGroupContext } from "./providers/BlockGroupContext";
import { BlocksProvider, useUnlinkContentFromGroup } from "./utils/queries";
import GroupLocale from "./components/GroupLocale";
import GroupTitle from "./components/GroupTitle";
import { Locale } from "./utils/types";
import { LocaleContext, LocaleProvider } from "./providers/LocaleContext";
import ReactModal from "react-modal";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import ToolBar from "./components/ToolBar";
import useWindowSize from "./hooks/useWindowSize";
import { IntlProvider, useIntl } from "react-intl";
import { messages, locale } from "./utils/intl";
import LinkBlockToItem from "./components/LinkBlockToItem";
import { toastOptions } from "./utils/toast";
import ErrorBoundary from "./components/ErrorBoundary";

interface IBlocksEditorProps {
  apiUrl: string;
  locales: Locale[];
  containerId: string;
  groupId?: number;
  itemId?: number;
  itemType?: string;
  urlPrefix: string;
  itemConfiguration?: boolean;
  isEditing?: boolean;
  backlink: boolean;
  noRedirect: boolean;
}

const BlocksEditorLoader = () => {
  const intl = useIntl();

  return (
    <div className="BlocksEditor__Loader">
      <span>{intl.formatMessage({ id: "BlocksEditor__LOADING" })}</span>
      <i className="Loader fa fa-circle-notch fa-spin"></i>
    </div>
  );
};

const BlocksEditorHeader = ({
  itemType,
  groupId,
  itemId,
  itemConfiguration,
  backlink,
  isEditing,
}: Partial<IBlocksEditorProps>) => {
  const { group } = useContext(BlocksGroupContext);
  const { getUrlWithPrefix } = useContext(LocaleContext);
  const unlinkContent = useUnlinkContentFromGroup();
  const intl = useIntl();

  const isGroupLinkedToCurrentContent =
    group?.itemBlockGroups?.some(
      (linkedContent) => linkedContent.itemId === (itemId && +itemId)
    ) || false;

  const linkedContentId = group?.itemBlockGroups?.find(
    (linkedContent) => linkedContent.itemId === (itemId && +itemId)
  )?.id;

  return (
    <div className="BlocksEditor__Header">
      {backlink ? (
        <div>
          <a href={getUrlWithPrefix(`/admin/TheliaBlocks`)}>
            {intl.formatMessage({ id: "BlocksEditor__BACK_TO_BLOCKS_LIST" })}
          </a>
        </div>
      ) : null}
      <div className="BlocksEditor__Header__Title">
        {isEditing || (itemConfiguration && isGroupLinkedToCurrentContent)
          ? intl.formatMessage({ id: "BlocksEditor__EDIT_A_THELIA_BLOCKS" })
          : intl.formatMessage({
              id: "BlocksEditor__CREATE_A_NEW_THELIA_BLOCKS",
            })}
      </div>

      <div className="BlocksEditor__Header__Inputs__Wrapper">
        <GroupTitle
          isGroupLinkedToCurrentContent={isGroupLinkedToCurrentContent}
          onLink={() => unlinkContent.mutate({ id: linkedContentId })}
          isLinking={unlinkContent.isLoading}
        />

        {itemConfiguration && !isGroupLinkedToCurrentContent ? (
          <LinkBlockToItem itemId={itemId} groupId={groupId} itemType={itemType} />
        ) : null}

        <GroupLocale />
      </div>
    </div>
  );
};

export default function BlocksEditor({
  apiUrl,
  containerId,
  groupId,
  itemId,
  itemType,
  locales,
  urlPrefix,
  itemConfiguration = false,
  isEditing = false,
  backlink = true,
  noRedirect = false,
}: IBlocksEditorProps) {
  if (!apiUrl) return null;

  useLayoutEffect(() => {
    if (containerId) {
      ReactModal.setAppElement("#" + containerId);
    }
  }, [containerId]);

  const { width } = useWindowSize();

  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <LocaleProvider locales={locales} prefix={urlPrefix}>
        <BlocksProvider api={apiUrl}>
          <Suspense fallback={<BlocksEditorLoader />}>
            <BlocksGroupProvider
              groupId={groupId}
              itemType={itemType}
              itemId={itemId}
              noRedirect={noRedirect}
            >
              <div className="BlocksEditor Thelia-Blocks">
                <Toaster toastOptions={toastOptions} />
                <div className="BlocksEditor__Wrapper">
                  <BlockContextProvider root>
                    <>
                      <div className="BlocksEditor__ContentWrapper">
                        <BlocksEditorHeader
                          itemType={itemType}
                          itemId={itemId}
                          groupId={groupId}
                          backlink={backlink}
                          itemConfiguration={itemConfiguration}
                          isEditing={isEditing}
                        />

                        <div className="BlocksEditor__Content">
                          <BlocksContent />
                          {width < 1080 ? (
                            <div className="BlocksEditor__AddBlocksWrapper">
                              <AddBlocks />
                            </div>
                          ) : null}
                          <ToolBar />
                        </div>
                      </div>
                      {width > 1080 ? (
                        <div className="Sidebar__Wrapper">
                          <ErrorBoundary>
                            <Sidebar />
                          </ErrorBoundary>
                        </div>
                      ) : null}
                    </>
                  </BlockContextProvider>
                </div>
              </div>
            </BlocksGroupProvider>
          </Suspense>
        </BlocksProvider>
      </LocaleProvider>
    </IntlProvider>
  );
}
