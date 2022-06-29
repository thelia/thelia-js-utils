import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

import { BlocksGroupContext } from "../../providers/BlockGroupContext";

export default function GroupTitle() {
  const [title, setTitle] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);

  const { group, editGroup } = useContext(BlocksGroupContext);

  useEffect(() => {
    if (group?.title) {
      setTitle(group.title);
    }
  }, [group]);

  useLayoutEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef?.current?.focus();
    }
  }, [isEditing, titleRef]);

  return (
    <div>
      {isEditing ? (
        <div className="flex">
          <input
            type="text"
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            onBlur={() => {
              setIsEditing(false);
              editGroup({ ...group, title });
            }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="text-4xl">{title || "aucun titre"}</div>
          <button
            type="button"
            className="bg-gray-500 text-white p-4 hover:bg-gray-700"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            edit
          </button>
        </div>
      )}
    </div>
  );
}
