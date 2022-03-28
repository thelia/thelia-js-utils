import "./index.css";

import React from "react";

import AddBlocks from "./components/AddBlocks";
import { BlocksEditorProvider } from "./utils/queries";
import ListBlockGroups from "./components/ListBlockGroups/ListBlockGroups";
import BlocksContent from "./components/BlocksContent/BlocksContent";
import { BlockContextProvider } from "./providers/BlockContext";

export function BlocksEditor({ apiUrl }: { apiUrl: string }) {
  if (!apiUrl) return null;

  return (
    <BlocksEditorProvider api={apiUrl}>
      <ListBlockGroups />
      <hr />
      <div className="BlocksEditor">
        <div className="BlocksEditor-header">
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
        </div>
        <BlockContextProvider>
          <>
            <div className="BlocksEditor-content">
              <AddBlocks />
            </div>

            <BlocksContent />
          </>
        </BlockContextProvider>
      </div>
    </BlocksEditorProvider>
  );
}
