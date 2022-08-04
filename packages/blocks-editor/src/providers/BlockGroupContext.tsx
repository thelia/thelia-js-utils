import { createContext, ReactElement, Suspense, useEffect, useState } from "react";
import { GroupTypeResponse, itemBlockGroupsType } from "../types/types";

import { useGroup } from "../utils/queries";

export const BlocksGroupContext = createContext<{
  group?: GroupTypeResponse;
  editGroup: Function;
  groupId?: number;
  itemType?: string;
  itemId?: number;
  setContextualGroupId: Function;
  noRedirect: boolean;
}>({
  group: undefined,
  editGroup: () => {},
  noRedirect: false,
  setContextualGroupId: () => {},
});

export const BlocksGroupProvider = ({
  groupId,
  itemType,
  itemId,
  children,
  noRedirect,
}: itemBlockGroupsType & {
  children: ReactElement;
  noRedirect: boolean;
}) => {
  const [contextualGroupId, setContextualGroupId] = useState(groupId);

  console.log(contextualGroupId);

  const [group, setGroup] = useState<GroupTypeResponse>({
    locales: [],
    visible: true,
    title: "",
    slug: null,
  });

  const { data, editGroup } = useGroup(contextualGroupId);

  useEffect(() => setContextualGroupId(groupId), [groupId]);

  useEffect(() => {
    if (data) {
      setGroup(data);
    }
  }, [data]);

  return (
    <BlocksGroupContext.Provider
      value={{
        group,
        editGroup,
        groupId: contextualGroupId,
        setContextualGroupId,
        itemType,
        itemId,
        noRedirect,
      }}
    >
      <Suspense fallback="loading group">{children}</Suspense>
    </BlocksGroupContext.Provider>
  );
};
