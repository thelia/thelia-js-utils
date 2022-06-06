import { BlocksProvider, useGroups } from "./utils/queries";

import { Suspense } from "react";

function List() {
  const { data: groups = [] } = useGroups();

  if (groups.length <= 0) {
    return <div>No blocks to display</div>;
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Contenus liés</th>
          <th>Langues disponibles</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group: any) => {
          return (
            <tr>
              <td>{group.id}</td>
              <td>
                <a href={`/admin/TheliaBlocks/${group.id}`}>
                  {group.title || "No Title"}
                </a>
              </td>
              <td>TODO</td>
              <td>TODO</td>
              <td>TODO</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function BlocksList({ apiUrl }: { apiUrl: string }) {
  if (!apiUrl) return null;

  return (
    <BlocksProvider api={apiUrl}>
      <div className="BlocksList">
        <div className="mb-8">
          <a href="/admin/TheliaBlocks/new" className="btn btn-danger ">
            Create new group
          </a>
        </div>
        <Suspense fallback="loading">
          <List />
        </Suspense>
      </div>
    </BlocksProvider>
  );
}
