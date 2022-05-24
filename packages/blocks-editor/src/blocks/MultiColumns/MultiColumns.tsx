import * as React from "react";

import produce from "immer";
import AddBlocks from "../../components/AddBlocks";
import Block from "../../components/Block";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import useWindowSize from "../../hooks/useWindowSize";
import { BlockModuleComponentProps, IBlock } from "../../types/types";
import { BlockContextProvider } from "../../providers/BlockContext";
import { useBlocksContext } from "../../hooks/useBlockContext";
import LayoutHeader from "../../components/LayoutHeader";

type ColumnData = IBlock[];

type MultiColumnsData = ColumnData[];

export type MultiColumnsComponentProps = {
  data: MultiColumnsData;
};

const NestedColumn = ({ onUpdate }: { onUpdate: Function }) => {
  const { blockList, moveBlockTo } = useBlocksContext();
  const { DndWrapper, DndWrapElement } = useDragAndDrop();

  React.useEffect(() => {
    onUpdate(blockList);
  }, [blockList]);

  const onDragEnd = (e: any) => {
    if (e.destination) {
      moveBlockTo(e.source.index, e.destination.index);
    }
  };

  return (
    <>
      {blockList.length > 0 && (
        <DndWrapper id="main" onDragEnd={onDragEnd}>
          {blockList.map((block, index) => (
            <DndWrapElement key={block.id} id={block.id} index={index}>
              {({ DndDragHandle }: { DndDragHandle: () => JSX.Element }) => (
                <Block
                  DndDragHandle={DndDragHandle}
                  inLayout={true}
                  key={index}
                  className="border-l-8 border-l-lighterVermillon"
                  block={block}
                />
              )}
            </DndWrapElement>
          ))}
        </DndWrapper>
      )}
    </>
  );
};

export const ColumnIcon = ({
  cols,
  currentCol,
}: {
  cols: number;
  currentCol: number;
}) => {
  const { width } = useWindowSize();

  return (
    <div
      className="h-3 rounded-full flex overflow-hidden border bg-white border-white mr-3"
      style={{ minWidth: width > 768 ? "80px" : "60px" }}
    >
      {[...Array(cols)].map((_, index) => (
        <div
          key={index}
          style={{ width: 100 / cols + "%" }}
          className={` 
            ${index !== cols - 1 && "mr-px"} 
            ${currentCol === index ? "bg-white" : "bg-mediumCharbon"}`}
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
  const [open, setOpen] = React.useState(true);
  const { width } = useWindowSize();

  return (
    <div
      key={index}
      className="flex flex-col rounded-md shadow-md border-l-8 border-l-vermillon bg-white"
    >
      <div
        className={`py-2 md:py-4 px-4 md:px-8 bg-mediumCharbon text-white rounded-tr-md ${
          !open && "rounded-br-md"
        } flex justify-between items-center`}
      >
        <div className="flex items-center">
          {width > 400 && <ColumnIcon cols={data.length} currentCol={index} />}
          <span className="md:text-xl font-bold">{`Colonne #${index + 1}`}</span>
        </div>
        <button onClick={() => setOpen(!open)} className="flex">
          <div className="bg-lightVermillon px-2 py-1 rounded-l-md">
            {open ? (
              <i className="fa fa-chevron-down"></i>
            ) : (
              <i className="fa fa-chevron-right"></i>
            )}
          </div>
          <div className="bg-vermillon px-2 py-1 rounded-r-md">
            {open ? "Replier" : "Déplier"}
          </div>
        </button>
      </div>
      <div className={`p-4 md:py-8 md:px-11 ${!open ? "hidden" : null}`}>
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

            <AddBlocks excludeLayout={["Column", "Accordion"]} />
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
    <div className="flex flex-col gap-5 justify-between">
      {data.map((column, index) => {
        return (
          <ColumnComponent
            key={index}
            data={data}
            onUpdate={onUpdate}
            column={column}
            index={index}
          />
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
  component: MultiColumnsComponent,
  initialData: [[]],
  layout: moduleLayout,
  title: {
    default: "Columns",
    fr_FR: "Colonnes",
  },
  icon: "column.svg",
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
  component: MultiColumnsComponent,
  type: { id: "2cols" },
  title: {
    default: "2 Columns",
    fr_FR: "2 Colonnes",
  },
  layout: moduleLayout,
  initialData: [[], []],
};

const ThreeColumns = {
  ...Column,
  component: MultiColumnsComponent,
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
  component: MultiColumnsComponent,
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
  component: MultiColumnsComponent,
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
  component: MultiColumnsComponent,
  type: { id: "6cols" },
  layout: moduleLayout,
  title: {
    default: "6 Columns",
    fr_FR: "6 Colonnes",
  },

  initialData: [[], [], [], [], [], []],
};

export { TwoColumns, ThreeColumns, FourColumns, FiveColumns, SixColumns };
