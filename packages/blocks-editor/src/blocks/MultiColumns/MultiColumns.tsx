import { BlockModuleComponentProps, IBlock } from "../../types/types";
import { nanoid } from "nanoid";
import { usePlugins } from "../../hooks/usePlugins";
import BlockGroup from "../Group";
import * as React from "react";
import Block from "../../components/Block";
import AddBlocks from "../../components/AddBlocks";

type MultiColumnsData = Array<ColumnData>;

type ColumnData = {
  id: string;
  group: IBlock;
};

export type MultiColumnsComponentProps = {
  data: MultiColumnsData;
};

const MultiColumnsComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<MultiColumnsData>) => {
  return (
    <div style={{ display: "flex" }}>
      {data.map((columns, index) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Column number {index}</div>
            {columns.map((column) => (
              <Block block={column} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

const moduleType = {
  id: "multiColumns",
};

const Column = {
  type: moduleType,
  component: MultiColumnsComponent,
  initialData: [[]],
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
  type: { id: "3cols" },
  title: {
    default: "3 Columns",
    fr_FR: "3 Colonnes",
  },
  layout: "Column",
  initialData: [[], [], []],
};

const FourColumns = {
  ...Column,
  type: { id: "4cols" },
  title: {
    default: "4 Columns",
    fr_FR: "4 Colonnes",
  },
  layout: "Column",
  initialData: [[], [], [], []],
};

const FiveColumns = {
  ...Column,
  type: { id: "5cols" },
  title: {
    default: "5 Columns",
    fr_FR: "5 Colonnes",
  },
  layout: "Column",
  initialData: [[], [], [], [], []],
};

const SixColumns = {
  ...Column,
  type: { id: "6cols" },
  title: {
    default: "6 Columns",
    fr_FR: "6 Colonnes",
  },
  layout: "Column",
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
