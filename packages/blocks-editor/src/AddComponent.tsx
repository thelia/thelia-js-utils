import * as React from "react";

import { usePlugins } from "@thelia/blocks-plugin-manager";

import { nanoid } from "nanoid";
import { useBlocksContext } from "./hooks/useBlockContext";

export default function AddComponent() {
  const response = usePlugins();

  const { addBlock } = useBlocksContext();

  return (
    <ol>
      {response.map((item) => {
        return (
          <button
            onClick={() =>
              addBlock({
                id: nanoid(),
                data: item.initialData,
                parent: null,
                type: { id: item.type.id },
              })
            }
            key={item.id}
          >
            {item.title.default}
          </button>
        );
      })}
    </ol>
  );
}
