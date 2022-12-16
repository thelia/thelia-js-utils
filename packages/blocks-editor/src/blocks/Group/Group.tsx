import produce from "immer";
import AddBlocks from "../../components/AddBlocks";
import Block from "../../components/Block";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { BlockContextProvider } from "../../providers/BlockContext";
import { BlockModuleComponentProps, IBlock } from "../../types/types";
import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useIntl } from "react-intl";

import "./Group.css";

type GroupContentData = IBlock[];

type GroupData = { content: GroupContentData[] };

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

  return blockList && blockList.length > 0 ? (
    <div className="px-3 pt-2 xl:pt-4 xl:px-5">
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
    </div>
  ) : null;
};

const GroupContentComponent = ({
  blocks,
  index,
  data,
  onUpdate,
  noExclude = false,
}: BlockModuleComponentProps<GroupData>) => {
  const [open, setOpen] = useState(true);
  const intl = useIntl();

  return (
    <BlockContextProvider defaultBlocks={blocks}>
      <>
        <NestedBlocks
          onUpdate={(columnNewData: IBlock[]) => {
            const nextState = produce(data, (draft) => {
              draft.content[index] = columnNewData;
            });
            onUpdate(nextState);
          }}
        />
        <AddBlocks excludeLayout={!noExclude} inLayout />
      </>
    </BlockContextProvider>
  );
};

const GroupComponent = ({
  data,
  onUpdate,
  noExclude,
}: BlockModuleComponentProps<GroupData> & { noExclude?: boolean }) => {
  return (
    <>
      {data.content.map((blocks, index) => {
        return (
          <GroupContentComponent
            key={index}
            data={data}
            onUpdate={onUpdate}
            blocks={blocks}
            index={index}
            noExclude={noExclude}
          />
        );
      })}
    </>
  );
};

const initialData: GroupData = {
  content: [[]],
};

const moduleType = {
  id: "blockGroup",
};

const Group = {
  type: moduleType,
  component: GroupComponent,
  initialData: initialData,
  title: {
    default: "Group",
    fr: "Groupe",
    en: "Group",
    es: "Grupo",
    it: "Gruppo",
  },
  description: {
    default: "Group blocks",
    fr: "Groupe de blocs",
    en: "Group blocks",
    es: "Grupo de bloques",
    it: "Gruppo di blocchi",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&group",
  },
};

export default Group;
