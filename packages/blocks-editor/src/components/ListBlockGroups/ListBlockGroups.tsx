import React from "react";
import useSWR from "swr";

export default function ListBlockGroups() {
  const { data: blocks = [] } = useSWR("/block_group/list");

  return <div>list: {blocks.length}</div>;
}
