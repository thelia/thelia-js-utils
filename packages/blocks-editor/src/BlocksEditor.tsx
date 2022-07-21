import { Suspense, useLayoutEffect } from "react";

import AddBlocks from "./components/AddBlocks";
import { BlockContextProvider } from "./providers/BlockContext";
import BlocksContent from "./components/BlocksContent/BlocksContent";
import { BlocksGroupProvider } from "./providers/BlockGroupContext";
import { BlocksProvider } from "./utils/queries";
import GroupLocale from "./components/GroupLocale";
import GroupTitle from "./components/GroupTitle";
import { Locale } from "./types/types";
import { LocaleProvider } from "./providers/LocaleContext";
import ReactModal from "react-modal";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import ToolBar from "./components/ToolBar";
import useWindowSize from "./hooks/useWindowSize";
import BlocksList from "./BlocksList";

interface IBlocksEditorProps {
  apiUrl: string;
  locales: Locale[];
  containerId: string;
  groupId?: number;
  itemId?: number;
  itemType?: string;
  backlink: boolean;
  noRedirect: boolean;
}

const BlocksEditorHeader = ({
  backlink,
}: {
  backlink: IBlocksEditorProps["backlink"];
}) => {
  return (
    <div className="BlocksEditor__Header">
      {backlink ? (
        <div>
          <a href="/admin/TheliaBlocks">Back to BlocksList</a>
        </div>
      ) : null}
      <div className="BlocksEditor__Header__Title">
        Création d'un nouveau Thelia Blocks
      </div>

      <div className="BlocksEditor__Header__Inputs__Wrapper">
        <GroupTitle />
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
    <LocaleProvider locales={locales}>
      <BlocksProvider api={apiUrl}>
        <Suspense fallback="loading">
          <BlocksGroupProvider
            groupId={groupId}
            itemType={itemType}
            itemId={itemId}
            noRedirect={noRedirect}
          >
            <>
              <BlocksList apiUrl={apiUrl} />
              <div className="BlocksEditor">
                <Toaster />
                <div className="BlocksEditor__Wrapper">
                  <BlockContextProvider root>
                    <>
                      <div className="BlocksEditor__ContentWrapper">
                        <BlocksEditorHeader backlink={backlink} />

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
                          <Sidebar />
                        </div>
                      ) : null}
                    </>
                  </BlockContextProvider>
                </div>
              </div>
            </>
          </BlocksGroupProvider>
        </Suspense>
      </BlocksProvider>
    </LocaleProvider>
  );
}
