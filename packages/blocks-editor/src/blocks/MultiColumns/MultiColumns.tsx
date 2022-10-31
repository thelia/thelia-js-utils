import { useEffect, useState } from "react";
import AddBlocks from "../../components/AddBlocks";
import Block from "../../components/Block";
import { BlockContextProvider } from "../../providers/BlockContext";
import { ReactComponent as Icon } from "./assets/column.svg";
import produce from "immer";
import { useBlocksContext } from "../../hooks/useBlockContext";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import useWindowSize from "../../hooks/useWindowSize";
import LayoutHeader from "../../components/LayoutHeader";
import { BlockModuleComponentProps, IBlock } from "../../types/types";
import { DropResult } from "react-beautiful-dnd";

import "./MultiColumns.css";
import { useIntl } from "react-intl";

type ColumnData = IBlock[];

type MultiColumnsData = ColumnData[];

export type MultiColumnsComponentProps = {
  data: MultiColumnsData;
};

const NestedColumn = ({ onUpdate }: { onUpdate: Function }) => {
  const { blockList, moveBlockTo } = useBlocksContext();
  const { DndWrapper, DndWrapElement } = useDragAndDrop();

  useEffect(() => {
    onUpdate(blockList);
  }, [blockList]);

  const onDragEnd = (e: DropResult) => {
    if (e.destination) {
      moveBlockTo(e.source.index, e.destination.index);
    }
  };

  return blockList.length > 0 ? (
    <div className="flex flex-col gap-6 px-6 pt-4 xl:pt-8 xl:px-10">
      <DndWrapper id="main" onDragEnd={onDragEnd}>
        {blockList.map((block, index) => (
          <DndWrapElement key={block.id} id={block.id} index={index}>
            {({ DndDragHandle }: { DndDragHandle: () => JSX.Element }) => (
              <Block DndDragHandle={DndDragHandle} inLayout key={index} block={block} />
            )}
          </DndWrapElement>
        ))}
      </DndWrapper>
    </div>
  ) : null;
};

export const ColumnIcon = ({
  cols,
  currentCol,
  asIcon,
}: {
  cols: number;
  currentCol?: number;
  asIcon?: boolean;
}) => {
  const { width } = useWindowSize();

  return (
    <div
      className={`${
        asIcon
          ? "ColumnIcon ColumnIcon--asCompactIcon"
          : "ColumnIcon ColumnIcon--asLayoutIcon"
      }`}
      style={{ minWidth: width > 1024 ? "60px" : "40px" }}
    >
      {[...Array(cols)].map((_, index) => (
        <div
          key={index}
          style={{ width: 100 / cols + "%" }}
          className={`${index !== cols - 1 ? "ColumnIcon__Chip" : ""} ${
            currentCol === index
              ? "ColumnIcon__Chip--current"
              : asIcon
              ? "ColumnIcon__Chip--asCompactIcon"
              : "ColumnIcon__Chip--asLayoutIcon"
          }`}
        ></div>
      ))}
    </div>
  );
};

const ColumnComponent = ({
  column,
  index,
  data,
  onUpdate,
}: BlockModuleComponentProps<MultiColumnsData>) => {
  const [open, setOpen] = useState(true);
  const { width } = useWindowSize();
  const intl = useIntl();

  return (
    <div key={index} className="BlockColumn">
      <LayoutHeader
        title={`${intl.formatMessage({ id: "COLUMN" })} #${index + 1}`}
        open={open}
        setOpen={setOpen}
        icon={width > 400 && <ColumnIcon cols={data.length} currentCol={index} />}
      />
      <div className={`${!open ? "BlockColumn--closed" : "BlockColumn__Content"}`}>
        <BlockContextProvider defaultBlocks={column}>
          <>
            <NestedColumn
              onUpdate={(columnNewData: IBlock[]) => {
                const nextState = produce(data, (draft) => {
                  draft[index] = columnNewData;
                });
                onUpdate(nextState);
              }}
            />

            <AddBlocks excludeLayout inLayout />
          </>
        </BlockContextProvider>
      </div>
    </div>
  );
};

const MultiColumnsComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<MultiColumnsData>) => {
  return (
    <div className="BlockMultiColumns__Wrapper">
      {data.map((column, index) => (
        <ColumnComponent
          key={index}
          data={data}
          onUpdate={onUpdate}
          column={column}
          index={index}
        />
      ))}
    </div>
  );
};

const moduleLayout = {
  default: "Columns",
  fr: "Colonnes",
  en: "Columns",
  es: "Columnas",
  it: "Colonne",
};

const moduleType = {
  id: "multiColumns",
};

const Column = {
  type: moduleType,
  component: MultiColumnsComponent,
  initialData: [[]],
  layout: moduleLayout,
  icon: Icon,
  title: {
    default: "Columns",
    fr: "Colonnes",
    en: "Columns",
    es: "Columnas",
    it: "Colonne",
  },
  description: {
    default: "Display blocks in multiple columns",
    fr: "Affiche des blocks dans différentes colonnes",
    en: "Display blocks in multiple columns",
    es: "Mostrar bloques en columnas",
    it: "Mostra i blocchi in colonne",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&multiColumns",
  },
};

const TwoColumns = {
  ...Column,
  component: MultiColumnsComponent,
  title: {
    default: "2 Columns",
    fr: "2 Colonnes",
    en: "2 Columns",
    es: "2 Columnas",
    it: "2 Colonne",
  },
  layout: moduleLayout,
  initialData: [[], []],
  customIcon: <ColumnIcon asIcon cols={2} />,
};

const ThreeColumns = {
  ...Column,
  component: MultiColumnsComponent,
  layout: moduleLayout,
  title: {
    default: "3 Columns",
    fr: "3 Colonnes",
    en: "3 Columns",
    es: "3 Columnas",
    it: "3 Colonne",
  },
  initialData: [[], [], []],
  customIcon: <ColumnIcon asIcon cols={3} />,
};

const FourColumns = {
  ...Column,
  component: MultiColumnsComponent,
  layout: moduleLayout,
  title: {
    default: "4 Columns",
    fr: "4 Colonnes",
    en: "4 Columns",
    es: "4 Columnas",
    it: "4 Colonne",
  },
  initialData: [[], [], [], []],
  customIcon: <ColumnIcon asIcon cols={4} />,
};

const FiveColumns = {
  ...Column,
  component: MultiColumnsComponent,
  layout: moduleLayout,
  title: {
    default: "5 Columns",
    fr: "5 Colonnes",
    en: "5 Columns",
    es: "5 Columnas",
    it: "5 Colonne",
  },
  initialData: [[], [], [], [], []],
  customIcon: <ColumnIcon asIcon cols={5} />,
};

const SixColumns = {
  ...Column,
  component: MultiColumnsComponent,
  layout: moduleLayout,
  title: {
    default: "6 Columns",
    fr: "6 Colonnes",
    en: "6 Columns",
    es: "6 Columnas",
    it: "6 Colonne",
  },
  initialData: [[], [], [], [], [], []],
  customIcon: <ColumnIcon asIcon cols={6} />,
};

export { TwoColumns, ThreeColumns, FourColumns, FiveColumns, SixColumns };
