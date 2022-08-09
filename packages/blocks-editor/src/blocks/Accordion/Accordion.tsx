import produce from "immer";
import AddBlocks from "../../components/AddBlocks";
import Block from "../../components/Block";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import LayoutHeader from "../../components/LayoutHeader";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { BlockContextProvider } from "../../providers/BlockContext";
import { BlockModuleComponentProps, IBlock } from "../../types/types";
import { ReactComponent as Icon } from "./assets/accordion.svg";
import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useIntl } from "react-intl";
import { Input } from "../../components/Inputs";

import "./Accordion.css";

type AccordionContentData = IBlock[];

type AccordionData = { title: string; content: AccordionContentData[] };

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
  const [title, setTitle] = useState<string>("");
  const [open, setOpen] = useState(true);
  const intl = useIntl();

  useEffect(() => {
    if (data.title) {
      setTitle(data.title);
    }
  }, [data]);

  return (
    <div key={index} className="BlockAccordion">
      <LayoutHeader
        title={intl.formatMessage({ id: "ACCORDION" })}
        open={open}
        setOpen={setOpen}
      />
      <div className={`${!open ? "BlockAccordion--closed" : "BlockAccordion__Content"}`}>
        <Input
          id="BlockAccordion-field-title"
          label={intl.formatMessage({ id: "BlockAccordion__TITLE" })}
          placeholder={intl.formatMessage({ id: "BlockAccordion__TITLE_PLACEHOLDER" })}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => onUpdate({ ...data, title: title })}
        />
        <BlockContextProvider defaultBlocks={blocks}>
          <div>
            <NestedBlocks
              onUpdate={(columnNewData: IBlock[]) => {
                const nextState = produce(data, (draft) => {
                  draft.content[index] = columnNewData;
                });
                onUpdate(nextState);
              }}
            />

            <AddBlocks excludeLayout />
          </div>
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
      {data.content.map((blocks, index) => {
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

const initialData: AccordionData = {
  title: "",
  content: [[]],
};

const moduleLayout = {
  default: "Accordion",
  fr: "Accordéon",
  en: "Accordion",
  es: "Accordión",
  it: "Accordion",
};

const moduleType = {
  id: "blockAccordion",
};

const Accordion = {
  type: moduleType,
  component: AccordionComponent,
  initialData: initialData,
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
