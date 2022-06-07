import { Suspense, useEffect, useLayoutEffect } from "react";

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
import { Toaster } from "react-hot-toast";
import ToolBar from "./components/ToolBar";

export default function BlocksEditor({
  apiUrl,
  containerId,
  groupId,
  locales,
  backlink = true,
}: {
  apiUrl: string;
  locales: Locale[];
  containerId: string;
  groupId?: number;
  backlink: boolean;
}) {
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
          <BlocksGroupProvider groupId={groupId}>
            <div className="BlocksEditor">
              <div>
                <Toaster />
              </div>
              <div className="BlocksEditor__header">
                {backlink ? (
                  <div>
                    <a href="/admin/TheliaBlocks">Back to BlocksList</a>
                  </div>
                ) : null}
                <GroupTitle />
                <GroupLocale />
              </div>

              <BlockContextProvider root>
                <>
                  <div className="BlocksEditor__content">
                    <div className="px-4 py-12 md:px-12 xl:px-44 2xl:px-60">
                      <BlocksContent />
                      <AddBlocks />
                    </div>
                  </div>
                  <ToolBar />
                </>
              </BlockContextProvider>
            </div>
          </BlocksGroupProvider>
        </Suspense>
      </BlocksProvider>
    </LocaleProvider>
  );
}
