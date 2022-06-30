import "@thelia/blocks-editor/dist/index.css";

import { BlocksEditor } from "@thelia/blocks-editor";

const apiUrl =
  typeof import.meta.env.VITE_THELIA_API_URL === "string"
    ? import.meta.env.VITE_THELIA_API_URL
    : "";

function App() {
  if (!apiUrl) return <div>No API endpoint is defined in .env</div>;

  return (
    <div
      className="App min-h-screen"
      style={{ background: "linear-gradient(180deg, #EBEBEB 0%, #F5F5F5 100%)" }}
    >
      <BlocksEditor
        apiUrl={apiUrl}
        locales={[]}
        containerId="thelia-blocks-root"
        backlink
        noRedirect={false}
      />
    </div>
  );
}

export default App;
