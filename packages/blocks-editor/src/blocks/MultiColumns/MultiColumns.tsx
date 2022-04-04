import * as React from "react";

import { BlockModuleComponentProps, IBlock } from "../../types/types";

import AddBlocks from "../../components/AddBlocks";
import Block from "../../components/Block";
import { BlockContextProvider } from "../../providers/BlockContext";
import produce from "immer";
import { useBlocksContext } from "../../hooks/useBlockContext";

type MultiColumnsData = ColumnData[];

type ColumnData = IBlock[];

export type MultiColumnsComponentProps = {
  data: MultiColumnsData;
};

function NestedColumn({ onUpdate }: { onUpdate: Function }) {
  const { blockList } = useBlocksContext();

  React.useEffect(() => {
    onUpdate(blockList);
  }, [blockList]);

  return (
    <div>
      <div>
        {blockList.map((component) => {
          return <Block block={component} />;
        })}
      </div>
    </div>
  );
}

const MultiColumnsComponent =
  (cols = 1) =>
  ({ data, onUpdate }: BlockModuleComponentProps<MultiColumnsData>) => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "2rem",
        }}
      >
        {data.map((column, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <BlockContextProvider defaultBlocks={column}>
                <>
                  <AddBlocks excludeLayout={["Column"]} />
                  <NestedColumn
                    onUpdate={(columnNewData: IBlock[]) => {
                      const nextState = produce(data, (draft) => {
                        draft[index] = columnNewData;
                      });
                      onUpdate(nextState);
                    }}
                  />
                </>
              </BlockContextProvider>
            </div>
          );
        })}
      </div>
    );
  };

const moduleLayout = "Column";

const moduleType = {
  id: "multiColumns",
};

const Column = {
  type: moduleType,
  component: MultiColumnsComponent(),
  initialData: [[]],
  layout: moduleLayout,
  title: {
    default: "Columns",
    fr_FR: "Colonnes",
  },
  description: {
    default: "Display blocks in multiple columns",
    fr_FR: "Affiche des blocks dans différentes colonnes",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&multiColumns",
  },
};

const TwoColumns = {
  ...Column,
  component: MultiColumnsComponent(2),
  type: { id: "2cols" },
  title: {
    default: "2 Columns",
    fr_FR: "2 Colonnes",
  },
  layout: "Column",
  initialData: [
    [
      {
        data: {
          level: 2,
          text: "No direct sales, but a carefully selected distributor network",
        },

        id: "ZJLZwmg32okqYC-3KSEYT",
        parent: null,
        type: { id: "blockTitle" },
      },
    ],
    [
      {
        data: {
          level: 3,
          text: "SECOND TEXT",
        },

        id: "g4r06WYkL8fYJ-BrVPC9W",
        parent: null,
        type: { id: "blockTitle" },
      },
    ],
  ],
};

const ThreeColumns = {
  ...Column,
  component: MultiColumnsComponent(3),
  type: { id: "3cols" },
  layout: moduleLayout,
  title: {
    default: "3 Columns",
    fr_FR: "3 Colonnes",
  },
  initialData: [[], [], []],
};

const FourColumns = {
  ...Column,
  component: MultiColumnsComponent(4),
  type: { id: "4cols" },
  layout: moduleLayout,
  title: {
    default: "4 Columns",
    fr_FR: "4 Colonnes",
  },

  initialData: [[], [], [], []],
};

const FiveColumns = {
  ...Column,
  component: MultiColumnsComponent(5),
  type: { id: "5cols" },
  layout: moduleLayout,
  title: {
    default: "5 Columns",
    fr_FR: "5 Colonnes",
  },

  initialData: [[], [], [], [], []],
};

const SixColumns = {
  ...Column,
  component: MultiColumnsComponent(6),
  type: { id: "6cols" },
  layout: moduleLayout,
  title: {
    default: "6 Columns",
    fr_FR: "6 Colonnes",
  },

  initialData: [[], [], [], [], [], []],
};

export {
  Column,
  TwoColumns,
  ThreeColumns,
  FourColumns,
  FiveColumns,
  SixColumns,
};
