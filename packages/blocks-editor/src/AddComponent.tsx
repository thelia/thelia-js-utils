import * as React from "react";

import { usePlugins } from "@thelia/blocks-plugin-manager";
import { atomWithImmer } from "jotai/immer";
import { BlockContext } from "./BlockContext";

import { nanoid } from "nanoid";
import { atom } from "jotai";

export default function AddComponent() {
  const response = usePlugins();

  const { setBlocks } = React.useContext(BlockContext);

  return (
    <ol>
      {response.map((item) => {
        return (
          <button
            onClick={() =>
              setBlocks((blocks) => [
                ...blocks,
                atom({
                  id: nanoid(),
                  data: item.initialData,
                  type: { id: item.type.id },
                }),
              ])
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
