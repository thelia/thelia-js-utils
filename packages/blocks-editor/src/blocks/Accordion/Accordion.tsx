import produce from "immer";
import AddBlocks from "../../components/AddBlocks";
import Block from "../../components/Block";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { BlockContextProvider } from "../../providers/BlockContext";
import { BlockModuleComponentProps, IBlock } from "../../types/types";
import LayoutHeader from "../../components/LayoutHeader";
import { ReactComponent as Icon } from "./assets/accordion.svg";
import { useEffect, useState } from "react";

type AccordionContentData = IBlock[];

type AccordionData = AccordionContentData[];

const NestedBlocks = ({ onUpdate }: { onUpdate: Function }) => {
  const { blockList, moveBlockTo } = useBlocksContext();
  const { DndWrapper, DndWrapElement } = useDragAndDrop();

  useEffect(() => {
    onUpdate(blockList);
  }, [blockList]);

  const onDragEnd = (e: any) => {
    if (e.destination) {
      moveBlockTo(e.source.index, e.destination.index);
    }
  };

  return (
    <div>
      {blockList.length > 0 && (
        <DndWrapper id="main" onDragEnd={onDragEnd}>
          {blockList.map((block, index) => (
            <DndWrapElement key={block.id} id={block.id} index={index}>
              {({ DndDragHandle }: { DndDragHandle: () => JSX.Element }) => (
                <Block
                  DndDragHandle={DndDragHandle}
                  inLayout
                  key={index}
                  className="border-l-8 border-l-lighterVermillon"
                  block={block}
                />
              )}
            </DndWrapElement>
          ))}
        </DndWrapper>
      )}
    </div>
  );
};

const AccordionContentComponent = ({
  blocks,
  index,
  data,
  onUpdate,
}: BlockModuleComponentProps<AccordionData>) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      key={index}
      className="flex flex-col rounded-md shadow-md border-l-8 border-l-vermillon bg-white"
    >
      <LayoutHeader title="Accordéon" open={open} setOpen={setOpen} />
      <div className={`xl:py-8 xl:px-10 px-6 py-4 ${!open ? "hidden" : null}`}>
        <BlockContextProvider defaultBlocks={blocks}>
          <>
            <NestedBlocks
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

const AccordionComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<AccordionData>) => {
  return (
    <div className="flex flex-col gap-5 justify-between">
      {data.map((blocks, index) => {
        return (
          <AccordionContentComponent
            key={index}
            data={data}
            onUpdate={onUpdate}
            blocks={blocks}
            index={index}
          />
        );
      })}
    </div>
  );
};

const moduleLayout = "Accordion";

const moduleType = {
  id: "Accordion",
};

const Accordion = {
  type: moduleType,
  component: AccordionComponent,
  initialData: [[]],
  layout: moduleLayout,
  title: {
    default: "Accordion",
    fr_FR: "Accordéon",
  },
  icon: Icon,
  description: {
    default: "Display blocks in accordion",
    fr_FR: "Affiche des blocs en accordéon",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&multiColumns",
  },
};

export default Accordion;
