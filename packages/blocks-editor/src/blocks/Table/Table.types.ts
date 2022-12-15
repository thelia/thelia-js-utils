import { BlockModuleComponentProps } from "../../types/types";

export type ColLink = {
  type: "link";
  value: {
    link: string;
    label: string;
  };
};
export type ColText = {
  type: "text";
  value: string;
};

export type Col = ColLink | ColText;

export type BlockTableData = {
  rowAmount: number;
  colAmount: number;
  headers: string[];
  rows: Col[][];
};

export type RowsColProps = {
  rowIndex: number;
  colIndex: number;
  rowIterable: unknown[];
};

export type BlockTableComponentProps =
  BlockModuleComponentProps<BlockTableData>;
