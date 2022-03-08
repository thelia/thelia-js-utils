import "./index.css";

import * as React from "react";

import AddComponent from "./AddComponent";
import { BlocksEditorProvider } from "./queries";
import ListBlockGroups from "./ListBlockGroups";
import BlocksContent from "./BlocksContent";
import { atom, Provider } from "jotai";
import { BlockContext, BlockContextProvider } from "./BlockContext";

export function BlocksEditor({ apiUrl }: { apiUrl: string }) {
  if (!apiUrl) return null;

  const [selectedBlock, setSelectedBlock] = React.useState(0);
  console.log(selectedBlock);

  return (
    <BlocksEditorProvider api={apiUrl}>
      <ListBlockGroups setSelectedBlock={setSelectedBlock} />
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
          <JotaiTree />
        </BlockContextProvider>
      </div>
    </BlocksEditorProvider>
  );
}

function JotaiTree() {
  const { blocksAtom, blocks } = React.useContext(BlockContext);

  console.log("JotaiTree :", blocks);

  return (
    <Provider>
      <div className="BlocksEditor-content">
        <AddComponent />
      </div>

      <BlocksContent />
    </Provider>
  );
}
