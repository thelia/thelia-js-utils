import { nanoid } from "nanoid";
import * as React from "react";
import AddBlocks from "../../components/AddBlocks";
import Block from "../../components/Block";
import { BlockModuleComponentProps, IBlock } from "../../types/types";

export type BlockGroupData = IBlock[];

const emptyBlockData = () => ({
  id: nanoid(),
  type: { id: "", title: { default: "" } },
  parent: null,
  data: null,
});

const EmptyBlock = ({
  onUpdate,
  onDelete,
}: {
  onUpdate: BlockModuleComponentProps<BlockGroupData>["onUpdate"];
  onDelete: Function | null;
}) => {
  const [isSettingBlock, setIsSettingBlock] = React.useState<boolean>(false);

  return (
    <div>
      {isSettingBlock ? (
        <AddBlocks />
      ) : (
        <div>
          <button type="button" onClick={() => setIsSettingBlock(true)}>
            Selectionner un block
          </button>
          {onDelete && (
            <button type="button" onClick={() => onDelete()}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const BlockGroupComponent = ({
  id,
  data,
  onUpdate,
  excludeBlockType,
}: BlockModuleComponentProps<BlockGroupData>) => {
  const onUpdateEmpty = (newBlock: IBlock) => {
    onUpdate(
      data.map((block) =>
        block.id === newBlock.id ? { ...newBlock, parent: id } : block
      ) as BlockGroupData
    );
  };

  const handleDeleteEmpty = (blockToDelete: IBlock) => {
    onUpdate(data.filter((block) => block?.id !== blockToDelete.id));
  };

  const handleDeleteBlock = (blockToDelete: IBlock) => {
    onUpdate(
      data.map((block) =>
        block.id === blockToDelete.id ? emptyBlockData() : block
      )
    );
  };

  const addBlock = (index: number) => {
    onUpdate([
      ...data.slice(0, index + 1),
      emptyBlockData(),
      ...data.slice(index + 1),
    ]);
  };

  const handleUpdateBlock =
    (currentBlock: IBlock) => (newData: IBlock["data"]) => {
      onUpdate(
        data.map((block) => {
          if (block.id === currentBlock.id) {
            return {
              ...block,
              data: newData,
            };
          }
          return block;
        })
      );
    };

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="BlockGroup"
    >
      {data.map((block) => (
        <React.Fragment key={block.id}>
          {block.type.id === "" ? (
            <EmptyBlock
              key={block.id}
              onUpdate={onUpdateEmpty}
              onDelete={data.length > 1 ? () => handleDeleteEmpty(block) : null}
            />
          ) : (
            <div key={block.id}>
              <Block block={block} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const initialData = [emptyBlockData()];

const moduleType = {
  id: "blockGroup",
};

const BlockGroup = {
  type: moduleType,
  component: BlockGroupComponent,
  initialData,
  title: {
    default: "Group",
    fr_FR: "Groupe",
  },
  description: {
    default: "Allow to group multiple blocks",
    fr_FR: "Permet de grouper plusieurs blocs",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&blockGroup",
  },
};

export default BlockGroup;
