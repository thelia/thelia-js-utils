import useSWR from "swr";
import React from "react";
import { IBlock } from "./types";

export default function ListBlockGroups() {
  const { data = [] } = useSWR("/block_group/list");

  return <div>list: {data.length}</div>;
}
