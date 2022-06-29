import { Suspense, useLayoutEffect } from "react";

import { BlockContextProvider } from "./providers/BlockContext";
import BlocksContent from "./components/BlocksContent/BlocksContent";
import { BlocksGroupProvider } from "./providers/BlockGroupContext";
import { BlocksProvider } from "./utils/queries";
import GroupLocale from "./components/GroupLocale";
import GroupTitle from "./components/GroupTitle";
import { Locale } from "./types/types";
import { LocaleProvider } from "./providers/LocaleContext";
import ReactModal from "react-modal";
import { Toaster } from "react-hot-toast";
import ToolBar from "./components/ToolBar";
import Sidebar from "./components/Sidebar";

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
    <div className="BlocksEditor__header bg-pearlLight px-4 md:px-32 lg:px-48 xl:px-72 pb-12 pt-10">
      {backlink ? (
        <div>
          <a href="/admin/TheliaBlocks">Back to BlocksList</a>{" "}
        </div>
      ) : null}
      <div className="font-bold text-3xl text-darkCharbon my-8">
        Création d'un nouveau Thelia Blocks
      </div>

      <GroupTitle />

      <GroupLocale />
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
            <div className="BlocksEditor">
              <Toaster />
              <div className="flex justify-between">
                <BlockContextProvider root>
                  <>
                    <div className="flex flex-col w-full">
                      <BlocksEditorHeader backlink={backlink} />

                      <div className="BlocksEditor__content w-full bg-pearlMedium">
                        <BlocksContent />
                        {/* <div className="p-4 md:px-32 lg:px-48 xl:px-72 mb-12">
                          <AddBlocks />
                        </div> */}
                        <ToolBar />
                      </div>
                    </div>
                    <div>
                      <Sidebar />
                    </div>
                  </>
                </BlockContextProvider>
              </div>
            </div>
          </BlocksGroupProvider>
        </Suspense>
      </BlocksProvider>
    </LocaleProvider>
  );
}
