import * as React from "react";

import { usePlugins } from "@thelia/blocks-plugin-manager";

export default function AddComponent() {
  const response = usePlugins();
  console.log(response);
  return (
    <ol>
      {response.map((item) => {
        return <button key={item.id}>{item.title.default}</button>;
      })}
    </ol>
  );
}
