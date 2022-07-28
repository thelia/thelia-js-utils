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
import { DropResult } from "react-beautiful-dnd";

import "./Accordion.css";
import { useIntl } from "react-intl";

type AccordionContentData = IBlock[];

type AccordionData = AccordionContentData[];

const NestedBlocks = ({ onUpdate }: { onUpdate: Function }) => {
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

  return (
    <div>
      {blockList.length > 0 && (
        <DndWrapper id="main" onDragEnd={onDragEnd}>
          {blockList.map((block, index) => (
            <DndWrapElement key={block.id} id={block.id} index={index}>
              {({ DndDragHandle }: { DndDragHandle: () => JSX.Element }) => (
                <Block DndDragHandle={DndDragHandle} inLayout key={index} block={block} />
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
  const intl = useIntl();

  return (
    <div key={index} className="BlockAccordion">
      <LayoutHeader
        title={intl.formatMessage({ id: "ACCORDION" })}
        open={open}
        setOpen={setOpen}
      />
      <div className={`${!open ? "BlockAccordion--closed" : "BlockAccordion__Content"}`}>
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
    <>
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
    </>
  );
};

const moduleLayout = {
  default: "Accordion",
  fr: "Accordéon",
  en: "Accordion",
  es: "Accordión",
  it: "Accordion",
};

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
    fr: "Accordéon",
    en: "Accordion",
    es: "Accordión",
    it: "Accordion",
  },
  icon: Icon,
  description: {
    default: "Display blocks in accordion",
    fr: "Affiche des blocs en accordéon",
    en: "Display blocks in accordion",
    es: "Affiche des blocks en accordéon",
    it: "Display blocks in accordion",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&multiColumns",
  },
};

export default Accordion;
