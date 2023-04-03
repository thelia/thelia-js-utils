import { BlockPluginDefinition } from "../../types/types";
import { useIntl } from "react-intl";
import ErrorBoundary from "../../components/ErrorBoundary";
import Select from "../../components/Inputs/Select";
import {
  createContext,
  useContext,
  ChangeEvent,
  FocusEvent,
  useState,
} from "react";
import { Input } from "../../components/Inputs";
import {
  BlockTableComponentProps,
  BlockTableData,
  Col,
  ColLink,
  ColText,
  RowsColProps,
} from "./Table.types";

import "./Table.css";

const initialData: BlockTableData = {
  rowAmount: 0,
  colAmount: 0,
  headers: [],
  rows: [],
};

const TableContext = createContext<BlockTableComponentProps>({
  data: initialData,
  onUpdate: () => {},
});

function cleanArray(array: any, length: number) {
  return array.splice(0, length);
}

function LayoutSelector() {
  const { data, onUpdate } = useContext(TableContext);
  const intl = useIntl();

  const rowOptions = Array.from(Array(13).keys());
  const colOptions = Array.from(Array(5).keys());

  const onChangeCol = (e: ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ ...data, colAmount: e.currentTarget.value });
  };

  const onChangeRow = (e: ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ ...data, rowAmount: e.currentTarget.value });
  };

  return (
    <div className="BlockTable-layout">
      <span className="Title">
        {intl.formatMessage({ id: "BlockTable__FIELD_TITLE_LAYOUT" })}
      </span>
      <Select
        id="BlockTable-layoutCol"
        onChange={onChangeCol}
        value={data.colAmount.toString()}
        label={intl.formatMessage({ id: "BlockTable__FIELD_LABEL_LAYOUT_COL" })}
      >
        {colOptions.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
      <Select
        id="BlockTable-layoutRow"
        onChange={onChangeRow}
        value={data.rowAmount.toString()}
        label={intl.formatMessage({ id: "BlockTable__FIELD_LABEL_LAYOUT_ROW" })}
      >
        {rowOptions.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </div>
  );
}

function Headers() {
  const { data, onUpdate } = useContext(TableContext);
  const intl = useIntl();

  const colIterable = Array.from({ length: data.colAmount });

  const onChangeText = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const headers = [...data.headers];

    headers[index] = e.currentTarget.value;

    onUpdate({ ...data, headers });
  };

  const onBlurText = (e: FocusEvent<HTMLInputElement>, index: number) => {
    const headers = [...data.headers];

    headers[index] = e.currentTarget.value;

    onUpdate({ ...data, headers });
  };

  if (colIterable?.length === 0) return null;

  return (
    <div className="BlockTable-headers">
      <span className="Title">
        {intl.formatMessage({ id: "BlockTable__HEADER" })}
      </span>
      <div className="BlockTable-headersList">
        {colIterable.map((_, index: number) => (
          <div
            className="BlockTable-headersListItem"
            key={`BlockTable-headers-${index}`}
          >
            <Input
              label={`Colonne n°${index}`}
              type="text"
              id="BlockTable-field"
              value={data.headers[index]}
              onChange={(e) => onChangeText(e, index)}
              onBlur={(e) => onBlurText(e, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function RowsCol({ rowIndex, colIndex, rowIterable }: RowsColProps) {
  const { data, onUpdate } = useContext(TableContext);
  const intl = useIntl();

  const col: Col = data.rows?.[rowIndex]?.[colIndex];

  const [type, setType] = useState<Col["type"]>(col?.type || "text");

  const defaultLabelValue =
    col?.type === "link" ? col?.value?.label : col?.value;
  const defaultLinkValue = col?.type === "link" ? col?.value?.link : undefined;

  const optionsType = [
    {
      value: "text",
      label: intl.formatMessage({ id: "BlockTable__OPTIONS_TEXT" }),
    },
    {
      value: "link",
      label: intl.formatMessage({ id: "BlockTable__OPTIONS_LINK" }),
    },
  ];

  const onChangeText = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    index: number
  ) => {
    const rows =
      data.rows.length > 0 ? [...data.rows] : (rowIterable as Col[][]);

    const currentRow: Col[] = rows[rowIndex] || [];
    const currentCol: Col = currentRow[index];

    const value: Col =
      type === "link"
        ? ({
            type: type as Col["type"],
            value: {
              label: e.currentTarget.value,
              link: currentCol?.value?.link || "",
            },
          } as ColLink)
        : ({
            type: type as Col["type"],
            value: e.currentTarget.value,
          } as ColText);

    if (currentRow?.[index] === undefined || currentRow?.[index] === null) {
      currentRow.push(value);
    } else {
      currentRow[index] = value;
    }

    rows[rowIndex] = cleanArray(currentRow, data.colAmount);

    onUpdate({ ...data, rows: cleanArray(rows, data.rowAmount) });
  };

  const onChangeLinkText = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    index: number
  ) => {
    if (type !== "link") return;

    const rows =
      data.rows.length > 0 ? [...data.rows] : (rowIterable as Col[][]);

    const currentRow: Col[] = rows[rowIndex] || [];
    const currentCol: ColLink = currentRow[index] as ColLink;

    const value: ColLink = {
      type: currentCol.type as ColLink["type"],
      value: {
        label: currentCol?.value?.label,
        link: e.currentTarget.value,
      },
    };

    currentRow[index] = value;

    rows[rowIndex] = cleanArray(currentRow, data.colAmount);

    onUpdate({ ...data, rows: cleanArray(rows, data.rowAmount) });
  };

  return (
    <div className="BlockTable-rowsCol">
      <span className="Title Title--2">Colonne n°{colIndex}</span>
      <Select
        id="BlockTable-colType"
        onChange={({ currentTarget }) =>
          setType(currentTarget.value === "link" ? "link" : "text")
        }
        value={type}
        label={intl.formatMessage({ id: "BlockTable__SELECT_TYPE_LABEL" })}
      >
        {optionsType.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>

      <Input
        type="text"
        label={intl.formatMessage({ id: "BlockTable__FIELD_LABEL_LABEL" })}
        id="BlockTable-fieldLabel"
        defaultValue={defaultLabelValue || ""}
        onChange={(e) => onChangeText(e, rowIndex, colIndex)}
      />

      {type === "link" ? (
        <Input
          type="text"
          label={intl.formatMessage({ id: "BlockTable__FIELD_LABEL_LINK" })}
          id="BlockTable-fieldLink"
          defaultValue={defaultLinkValue}
          onChange={(e) => onChangeLinkText(e, rowIndex, colIndex)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

function Rows() {
  const { data } = useContext(TableContext);
  const intl = useIntl();

  const colIterable = Array.from({ length: data.colAmount });
  const rowIterable = Array.from({ length: data.rowAmount });

  if (rowIterable?.length === 0 || colIterable?.length === 0) return null;

  return (
    <div className="BlockTable-rows">
      <span className="Title">
        {intl.formatMessage({ id: "BlockTable__ROWS" })}
      </span>
      <div className="BlockTable-rowsWrapper">
        {rowIterable.map((_, rowIndex: number) => {
          return (
            <div key={"row-" + rowIndex}>
              <div className="BlockTable-rowsList">
                <span className="Title">
                  {intl.formatMessage({ id: "BlockTable__ROW" })} {rowIndex + 1}
                </span>
                {colIterable.map((_, colIndex: number) => (
                  <RowsCol
                    key={"row-" + rowIndex + "col" + colIndex}
                    colIndex={colIndex}
                    rowIndex={rowIndex}
                    rowIterable={rowIterable}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BlockTableComponent({ data, onUpdate }: BlockTableComponentProps) {
  return (
    <ErrorBoundary>
      <TableContext.Provider value={{ data, onUpdate }}>
        <div className="BlockTable">
          <LayoutSelector />

          <Headers />

          <Rows />
        </div>
      </TableContext.Provider>
    </ErrorBoundary>
  );
}

const moduleType = {
  id: "blockTable",
};

const blockTable: BlockPluginDefinition<BlockTableData> = {
  type: moduleType,
  component: BlockTableComponent,
  initialData,
  title: {
    default: "Table",
    fr: "Tableau",
    en: "Table",
    es: "Tabla",
    it: "Tabella",
  },
  icon: undefined,
  description: {
    default: "Display a table",
    fr: "Affiche une tableau",
    en: "Display a table",
    es: "Mostrar un tabla",
    it: "Mostra un tabella",
  },
};

export default blockTable;
