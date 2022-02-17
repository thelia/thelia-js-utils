import * as React from "react";

import useSWR from "swr";

export default function ListBlockGroups() {
  const { data = [] } = useSWR("/block_group/list");
  return <div>list {data.length}</div>;
}
