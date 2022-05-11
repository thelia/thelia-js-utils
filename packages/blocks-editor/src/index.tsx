import "./index.css";

import AddBlocks from "./components/AddBlocks";
import { BlockContextProvider } from "./providers/BlockContext";
import BlocksContent from "./components/BlocksContent/BlocksContent";
import { BlocksEditorProvider } from "./utils/queries";
import "tippy.js/dist/tippy.css";
import Sidebar from "./components/Sidebar";

export function BlocksEditor({ apiUrl }: { apiUrl: string }) {
  if (!apiUrl) return null;

  return (
    <BlocksEditorProvider api={apiUrl}>
      {/* <ListBlockGroups />
      <hr /> */}
      <div className="BlocksEditor">
        {/* <div className="BlocksEditor-header">
          <div className="BlocksEditor-title">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="BlocksEditor-langSelector">
            <div>
              <input type="radio" name="locale" id="locale-fr" />
              <label htmlFor="locale-fr">fr</label>
            </div>
            <div>
              <input type="radio" name="locale" id="locale-en" />
              <label htmlFor="locale-en">en</label>
            </div>
          </div>
        </div> */}
        <BlockContextProvider>
          <>
            {/* <Sidebar /> */}

            <div className="BlocksContent">
              <div className="px-4 md:px-12 xl:px-44 2xl:px-60">
                <AddBlocks />

                <BlocksContent />
              </div>
            </div>
          </>
        </BlockContextProvider>
      </div>
    </BlocksEditorProvider>
  );
}
