import "@thelia/blocks-editor/dist/index.css";

import { BlocksEditor } from "@thelia/blocks-editor";

const apiUrl =
  typeof import.meta.env.VITE_THELIA_API_URL === "string"
    ? import.meta.env.VITE_THELIA_API_URL
    : "";

function App() {
  if (!apiUrl) return <div>No API endpoint is defined in .env</div>;

  return (
    <div className="App">
      <BlocksEditor apiUrl={apiUrl} />
    </div>
  );
}

export default App;
