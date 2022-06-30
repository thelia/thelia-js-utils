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
import useWindowSize from "./hooks/useWindowSize";
import AddBlocks from "./components/AddBlocks";

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
    <div className="BlocksEditor__header bg-pearlLight p-4 sm:p-8 md:px-32 lg:px-24 xl:px-44 2xl:px-72 pb-12 pt-10">
      {backlink ? (
        <div>
          <a href="/admin/TheliaBlocks">Back to BlocksList</a>{" "}
        </div>
      ) : null}
      <div className="font-bold text-3xl text-darkCharbon my-8">
        Création d'un nouveau Thelia Blocks
      </div>

      <div className="flex items-end gap-4">
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
            <div className="BlocksEditor">
              <Toaster />
              <div className="flex justify-between">
                <BlockContextProvider root>
                  <>
                    <div className="flex flex-col w-full min-h-screen">
                      <BlocksEditorHeader backlink={backlink} />

                      <div className="BlocksEditor__content h-full flex flex-col justify-between">
                        <BlocksContent />
                        {width < 1080 ? (
                          <div className="p-4 sm:p-8 md:px-32 lg:px-24 xl:px-44 2xl:px-72">
                            <AddBlocks />
                          </div>
                        ) : null}
                        <ToolBar />
                      </div>
                    </div>
                    {width > 1080 ? (
                      <div className="bg-white">
                        <Sidebar />
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
  );
}
