import * as React from "react";

import { usePlugins } from "../../hooks/usePlugins";

import { nanoid } from "nanoid";
import { useBlocksContext } from "../../hooks/useBlockContext";

export default function AddBlock() {
  const plugins = usePlugins();

  const { addBlock } = useBlocksContext();

  return (
    <ol>
      {plugins.map((plugin) => {
        return (
          <button
            onClick={() =>
              addBlock({
                id: nanoid(),
                data: plugin.initialData,
                parent: null,
                type: { id: plugin.type.id },
              })
            }
            key={plugin.id}
          >
            {plugin.title.default}
          </button>
        );
      })}
    </ol>
  );
}
