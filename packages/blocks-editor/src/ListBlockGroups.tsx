import useSWR from "swr";
import React from "react";

export default function ListBlockGroups({ setSelectedBlock }) {
  const { data = [] } = useSWR("/block_group/list");
  console.log("data :", data);

  return (
    <>
      {data.map((block) => {
        <button onClick={() => setSelectedBlock(block.id)}>{block.id}</button>;
      })}
    </>
  );
}
