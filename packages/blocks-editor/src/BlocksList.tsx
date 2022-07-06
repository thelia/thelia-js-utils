import {
  BlocksProvider,
  useDeleteGroup,
  useDuplicateGroup,
  useGroups,
} from "./utils/queries";
import toast, { Toaster } from "react-hot-toast";

import { GroupTypeResponse } from "./types/types";
import { Suspense } from "react";
import { getContentUrl } from "./utils/content-url";
import useCopyToClipboard from "react-use/esm/useCopyToClipboard";

const List = () => {
  const { data: groups = [] } = useGroups();
  const [copied, copyToClipboard] = useCopyToClipboard();
  const mutationDelete = useDeleteGroup();
  const mutationDuplicate = useDuplicateGroup();

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
        {groups.map((group: GroupTypeResponse) => {
          return (
            <tr>
              <td>{group.id}</td>
              <td>
                <a href={`/admin/TheliaBlocks/${group.id}`}>
                  {group.title || "No Title"}
                </a>
              </td>
              <td className="">
                <div className="flex gap-2 items-center">
                  {!!group.itemBlockGroups?.length && (
                    <span className="text-sm font-normal text-gray-400">
                      <i className="fa fa-link ml-1"></i>
                      {group.itemBlockGroups.map(({ itemId, itemType }) => {
                        if (itemId && itemType) {
                          return (
                            <a
                              href={getContentUrl(itemType, itemId)}
                              key={`${itemType}-${itemId}`}
                            >
                              {itemType}-{itemId}
                            </a>
                          );
                        } else {
                          return (
                            <span key={`${itemType}-${itemId}`}>
                              {itemType}-{itemId}
                            </span>
                          );
                        }
                      })}
                    </span>
                  )}
                </div>
              </td>
              <td>TODO</td>
              <td>
                <div>
                  <button
                    onClick={() => {
                      mutationDelete.mutate(group.id);
                    }}
                  >
                    delete
                  </button>
                  <button
                    onClick={() => {
                      mutationDuplicate.mutate(group.id);
                    }}
                  >
                    duplicate
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const shortcode = `[block_group slug=${group.slug}]`;
                      copyToClipboard(shortcode);
                      toast(`${shortcode} copié avec succès`);
                    }}
                  >
                    shortcode
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const BlocksList = ({ apiUrl }: { apiUrl: string }) => {
  if (!apiUrl) return null;

  return (
    <BlocksProvider api={apiUrl}>
      <div className="BlocksList">
        <Toaster />

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
};

export default BlocksList;
