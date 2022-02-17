import "./index.css";

import * as React from "react";

import AddComponent from "./AddComponent";
import { BlocksEditorProvider } from "./queries";
import ListBlockGroups from "./ListBlockGroups";

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
        <div className="BlocksEditor-content">
          <AddComponent />
        </div>
      </div>
    </BlocksEditorProvider>
  );
}
