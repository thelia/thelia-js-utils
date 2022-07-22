import {
  BlocksProvider,
  useGroups,
  useLinkContentToGroup,
} from "./utils/queries";
import React, { ChangeEvent, Suspense, useRef, useState } from "react";

import { GroupTypeStore } from "./types/types";
import slugify from "./utils/slugify";

interface ILinkBlockToItemprops {
  apiUrl: string;

  groupId?: number;
  itemId?: number;
  itemType?: string;
}

function List({
  search,
  onClickGroup,
}: {
  search: string;
  onClickGroup: (group: GroupTypeStore) => void;
}) {
  const {
    data,
  }: {
    isLoading: boolean;
    isError: boolean;
    error: any;
    data: any;
  } = useGroups();

  const results = data.filter(
    ({ slug }: { slug: GroupTypeStore["slug"] }) =>
      slug?.search(new RegExp(slugify(search), "i")) !== -1
  );

  return (
    <ul className="LinkBlockToItem-dropdown">
      {results.map((group: GroupTypeStore) => (
        <li key={group.id} className="LinkBlockToItem-dropdownItem">
          <button
            type="button"
            onClick={() => {
              onClickGroup(group);
            }}
          >
            #{group.id} - {group.title}
            {!!group.itemBlockGroups?.length && (
              <span className="">
                {group.itemBlockGroups.map(({ itemId, itemType }) => (
                  <span key={`${itemType}-${itemId}`} className="ml-1">
                    {itemType}-{itemId}
                  </span>
                ))}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

function BlockSelector({
  itemId,
  itemType,
}: Omit<ILinkBlockToItemprops, "apiUrl">) {
  const [search, setSearch] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<GroupTypeStore>();
  const [open, setOpen] = useState<boolean>(false);

  const mutation = useLinkContentToGroup();
  const selectRef = useRef(null);

  const linkGroupToContent = (group: GroupTypeStore) => {
    mutation.mutate({ id: group.id, itemId, itemType });
  };

  const onClickGroup = (group: GroupTypeStore) => {
    setSearch(group.title);
    setSelectedGroup(group);
    setOpen(false);
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setSelectedGroup(undefined);
  };

  return (
    <div className="LinkBlockToItem">
      <div className="LinkBlockToItem-select" ref={selectRef}>
        <input
          type="text"
          value={search}
          onFocus={() => setOpen(true)}
          onChange={onChangeInput}
          className="w-full"
        />
        <Suspense fallback="loading">
          {open && <List search={search} onClickGroup={onClickGroup} />}
        </Suspense>
      </div>
      <div className="ml-6">
        <button
          type="button"
          className=""
          onClick={() => selectedGroup && linkGroupToContent(selectedGroup)}
          disabled={!selectedGroup}
        >
          Lier
        </button>
      </div>
    </div>
  );
}

const LinkBlockToItem = ({
  apiUrl,
  groupId,
  itemId,
  itemType,
}: ILinkBlockToItemprops) => {
  if (!apiUrl) return null;
  return (
    <BlocksProvider api={apiUrl}>
      <Suspense fallback="loading">
        <BlockSelector groupId={groupId} itemId={itemId} itemType={itemType} />
      </Suspense>
    </BlocksProvider>
  );
};

export default LinkBlockToItem;
