import { ChangeEvent, useEffect, useState } from "react";
import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
} from "../../types/types";
import BlockText, { BlockTextData } from "../Text";
import { nanoid } from "nanoid";
import { ReactComponent as Icon } from "../Button/assets/button.svg";
import { Select } from "../../components/Inputs";
import "./List.css";

enum typeList {
  Unordered = "ul",
  Ordered = "ol",
}

export type BlockListData = {
  type: typeList;
  values: string[];
};

type ListItemType = { id: string; value: string };

const types = [
  {
    label: "Ordered",
    value: typeList.Ordered,
  },
  {
    label: "Unordered",
    value: typeList.Unordered,
  },
];

function BlockListComponent({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockListData>) {
  const [listItems, setListItems] = useState<ListItemType[]>([]);

  useEffect(() => {
    if (data.values) {
      setListItems(data.values.map((value) => ({ id: nanoid(), value })));
    }
  }, []);

  const onChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ ...data, type: e.target.value });
  };

  const addLine = () => {
    const newListItems = [...listItems, { id: nanoid(), value: "" }];
    setListItems(newListItems);
    onUpdate({ ...data, values: newListItems.map(({ value }) => value) });
  };

  const deleteLine = (id: string) => {
    const newListItems = listItems.filter(
      ({ id: currentId }) => currentId !== id
    );
    setListItems(newListItems);
    onUpdate({ ...data, values: newListItems.map(({ value }) => value) });
  };

  const handleUpdateText = (
    listItem: ListItemType,
    textData: BlockTextData
  ) => {
    const newListItems = listItems.map(({ id, value }) => ({
      id,
      value: id === listItem.id ? textData.value : value,
    }));
    setListItems(newListItems);
    onUpdate({
      ...data,
      values: newListItems.map(({ value }) => value),
    });
  };

  return (
    <div className="BlockList">
      <div className="BlockList__Config">
        <Select
          id="type-field"
          label="Type"
          value={data.type}
          onChange={onChangeType}
        >
          {types.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
      <div className="BlockList__List">
        {listItems.map((listItem) => (
          <div className="BlockList__Line" key={listItem.id}>
            <BlockText.component
              id={`text-${listItem.id}`}
              data={{ value: listItem.value }}
              onUpdate={(textData: BlockTextData) => {
                handleUpdateText(listItem, textData);
              }}
            />

            <button
              type="button"
              onClick={() => deleteLine(listItem.id)}
              disabled={listItems.length < 2}
              className="BlockList__Delete"
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ))}
        <div className="text-center">
          <button type="button" className="BlockList__Add" onClick={addLine}>
            Ajouter un élément
          </button>
        </div>
      </div>
    </div>
  );
}

const initialData: BlockListData = {
  type: typeList.Unordered,
  values: [""],
};

const moduleType = {
  id: "blockList",
};

const BlockList: BlockPluginDefinition<BlockListData> = {
  type: moduleType,
  component: BlockListComponent,
  initialData,
  icon: Icon,
  title: {
    default: "List",
    fr: "Liste",
    en: "List",
    es: "Lista",
    it: "Lista",
  },
  description: {
    default: "Display a list",
    fr: "Affiche une liste",
    en: "Display a list",
    es: "Mostrar una lista",
    it: "Mostra una lista",
  },
};

export default BlockList;
