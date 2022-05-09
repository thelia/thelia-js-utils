import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import * as React from "react";
import AddBlocks from "../../components/AddBlocks";
import Block from "../../components/Block";

import { useBlocksContext } from "../../hooks/useBlockContext";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { BlockContextProvider } from "../../providers/BlockContext";
import { BlockModuleComponentProps, IBlock } from "../../types/types";

type AccordionContentData = IBlock[];

type AccordionData = AccordionContentData[];

const NestedBlocks = ({ onUpdate }: { onUpdate: Function }) => {
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
    <div>
      {blockList.length > 0 && (
        <DndWrapper id="main" onDragEnd={onDragEnd}>
          {blockList.map((block, index) => (
            <DndWrapElement key={block.id} id={block.id} index={index}>
              {({ DndDragHandle }: { DndDragHandle: () => JSX.Element }) => (
                <Block
                  DndDragHandle={DndDragHandle}
                  inLayout={true}
                  key={index}
                  className="border-l-8 border-l-red-400"
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
  const [open, setOpen] = React.useState(true);

  return (
    <div
      key={index}
      className="flex flex-col rounded-md shadow-md border-l-8 border-l-red-600 bg-white"
    >
      <div className="py-4 px-8 bg-slate-900 text-white rounded-tr-md flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold">Accordion</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2 flex">
          <div className="bg-red-500 px-2 rounded-l-sm">
            {open ? (
              <FontAwesomeIcon icon={faChevronDown} />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} />
            )}
          </div>
          <div className="bg-red-600 px-2 rounded-r-sm">
            {open ? "Replier" : "Déplier"}
          </div>
        </button>
      </div>
      <div className={`py-8 px-11 ${!open ? "hidden" : null}`}>
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
            <div className="border-dotted rounded-md border border-slate-600 py-6 flex flex-col">
              <span className="text-center mb-4">
                Glissez-déposez le type de contenu souhaité depuis le menu de droite
              </span>
              <AddBlocks excludeLayout={["Column", "Accordion"]} />
            </div>
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
  description: {
    default: "Display blocks in accordion",
    fr_FR: "Affiche des blocs en accordéon",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&multiColumns",
  },
};

export default Accordion;
