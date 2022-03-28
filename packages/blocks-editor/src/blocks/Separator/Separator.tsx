import * as React from "react";
import { BlockModuleComponentProps } from "../../types/types";

export type BlockSeparatorData = {
  type: string;
  size: number;
};

const types = [
  { label: "Espace", value: "space" },
  { label: "Bordure", value: "hr" },
];

const initialData = {
  type: "space",
  size: 1,
};

const BlockSeparatorComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockSeparatorData>) => {
  const [type, setType] = React.useState<string>(initialData.type);
  const [size, setSize] = React.useState<number>(initialData.size);

  React.useEffect(() => {
    if (data.type) {
      setType(data.type);
    }

    if (data.size) {
      setSize(data.size);
    }
  }, [data]);

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    onUpdate({ ...data, type: e.target.value });
  };

  const onChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(+e.target.value);
  };

  const onBlurSize = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onUpdate({ ...data, size: +e.target.value });
    }
  };

  return (
    <div className="BlockSeparator" data-type={type}>
      <div className="BlockSeparator-field">
        <label htmlFor="separator-type">Type</label>
        <select
          name="separator-type"
          id="separator-type"
          onChange={onChangeType}
          value={type.toString()}
        >
          {types.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="BlockSeparator-field">
        <label htmlFor="separator-size">Size</label>
        <input
          type="number"
          name="separator-size"
          id="separator-size"
          value={size.toString()}
          onChange={onChangeSize}
          onBlur={onBlurSize}
        />
      </div>
    </div>
  );
};

const moduleType = {
  id: "blockSeparator",
};

const BlockSeparator = {
  type: moduleType,
  component: BlockSeparatorComponent,
  initialData,
  title: {
    default: "Separator",
    fr_FR: "Séparateur",
  },
  description: {
    default: "Display a separator",
    fr_FR: "Affiche un séparateur",
  },
  image: {
    default:
      "https://source.unsplash.com/featured/300x250?nature&blockSeparator",
  },
};

export default BlockSeparator;
