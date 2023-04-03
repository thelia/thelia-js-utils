import produce from "immer";
import AddBlocks from "../../components/AddBlocks";
import Block from "../../components/Block";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import LayoutHeader from "../../components/LayoutHeader";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { BlockContextProvider } from "../../providers/BlockContext";
import { BlockModuleComponentProps, IBlock } from "../../types/types";
import { ReactComponent as Icon } from "./assets/accordion.svg";
import { Fragment, useEffect, useRef, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useIntl } from "react-intl";
import { Input } from "../../components/Inputs";
import { isEqual } from "lodash";
import "./Accordion.css";
import { generateId } from "../..";
import ErrorBoundary from "../../components/ErrorBoundary";

type AccordionContentData = IBlock[];

type AccordionItem = {
  id: string;
  title: string;
  content: AccordionContentData;
};

type AccordionData = {
  title: string;
  group: AccordionItem[];
};

const NestedBlocks = ({ onUpdate }: { onUpdate: Function }) => {
  const { blockList, moveBlockTo } = useBlocksContext();
  const { DndWrapper, DndWrapElement } = useDragAndDrop();
  const blockListRef = useRef<{ blockList: IBlock[] }>({
    blockList: [],
  });

  useEffect(() => {
    blockListRef.current.blockList = blockList ?? [];
  }, []);

  useEffect(() => {
    if (!isEqual(blockListRef.current.blockList, blockList)) {
      onUpdate(blockList);
      blockListRef.current.blockList = blockList;
    }
  }, [blockList]);

  const onDragEnd = (e: DropResult) => {
    if (e.destination && blockList.length > 1) {
      moveBlockTo(e.source.index, e.destination.index);
    }
  };

  return blockList.length > 0 ? (
    <DndWrapper id="main" onDragEnd={onDragEnd}>
      {blockList.map((block, index) => (
        <DndWrapElement key={block.id} id={block.id} index={index}>
          {({ DndDragHandle }: { DndDragHandle: () => JSX.Element }) => (
            <Block
              DndDragHandle={DndDragHandle}
              inLayout
              key={index}
              block={block}
            />
          )}
        </DndWrapElement>
      ))}
    </DndWrapper>
  ) : null;
};

const AccordionItemComponent = ({
  data,
  item,
  index,
  onUpdate,
  onDelete,
}: {
  data: AccordionData;
  item: AccordionItem;
  index: number;
  onUpdate: ({
    title,
    content,
  }: {
    title: AccordionItem["title"];
    content: AccordionItem["content"];
  }) => void;
  onDelete: () => void;
}) => {
  const [open, setIsOpen] = useState(true);
  const [itemTitle, setItemTitle] = useState(item.title);

  const intl = useIntl();

  return (
    <div className="BlockAccordion">
      <LayoutHeader
        title={`${intl.formatMessage({ id: "ACCORDION" })} #${index + 1}`}
        open={open}
        setOpen={setIsOpen}
        onDelete={onDelete}
      />
      <div
        className={`${
          !open ? "BlockAccordion--closed" : "BlockAccordion__Content"
        }`}
      >
        <BlockContextProvider defaultBlocks={item.content}>
          <>
            <div className="flex flex-col gap-6 px-6 pt-4 xl:pt-8 xl:px-10">
              <Input
                id={`BlockAccordion-field-title-${index}`}
                label={intl.formatMessage({ id: "BlockAccordion__TITLE" })}
                placeholder={intl.formatMessage({
                  id: "BlockAccordion__TITLE_PLACEHOLDER",
                })}
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                onBlur={() => onUpdate({ ...item, title: itemTitle })}
              />
              <ErrorBoundary>
                <NestedBlocks
                  onUpdate={(columnNewData: IBlock[]) => {
                    const nextState = produce(data, (draft) => {
                      draft.group[index].content = columnNewData;
                    });

                    onUpdate({
                      title: item.title,
                      content: nextState.group[index].content,
                    });
                  }}
                />
              </ErrorBoundary>
            </div>
            <AddBlocks excludeLayout inLayout />
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
  const [title, setTitle] = useState(data.title);

  const intl = useIntl();

  return (
    <div>
      <Input
        id="title-field"
        label="Titre principal"
        placeholder="Indiquez le titre principal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => onUpdate({ ...data, title: title })}
      />
      <div className="flex flex-col gap-3 my-4">
        {data.group.map((item, index) => (
          <Fragment key={item.id}>
            <AccordionItemComponent
              data={data}
              index={index}
              item={item}
              onDelete={() => {
                if (data.group.length > 1) {
                  onUpdate({
                    ...data,
                    group: data.group.filter(
                      (element) => element.id !== item.id
                    ),
                  });
                }
              }}
              onUpdate={({ title, content }) =>
                onUpdate({
                  ...data,
                  group: data.group.map((element) => {
                    if (element.id === item.id) {
                      return {
                        ...element,
                        title,
                        content,
                      };
                    }

                    return element;
                  }),
                })
              }
            />
          </Fragment>
        ))}
      </div>
      <button
        className="BlockAccordion__Add"
        onClick={() =>
          onUpdate({
            ...data,
            group: [
              ...data.group,
              { id: generateId(), title: "", content: [] },
            ],
          })
        }
      >
        {intl.formatMessage({ id: "BlockAccordion__ADD" })}
      </button>
    </div>
  );
};

const initialData: AccordionData = {
  title: "",
  group: [{ id: generateId(), title: "", content: [] }],
};

const moduleType = {
  id: "blockAccordion",
};

const Accordion = {
  type: moduleType,
  component: AccordionComponent,
  initialData: initialData,
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
};

export default Accordion;
