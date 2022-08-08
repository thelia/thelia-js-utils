import { createContext, ReactElement, useState } from "react";
import { useQueryClient } from "react-query";
import { GroupTypeResponse, itemBlockGroupsType } from "../types/types";

import { useGroup } from "../utils/queries";

export const BlocksGroupContext = createContext<{
  group?: GroupTypeResponse;
  editGroup: Function;
  groupId?: number;
  itemType?: string;
  itemId?: number;
  setGroupId: Function;
  noRedirect: boolean;
  resetContext: Function;
}>({
  group: undefined,
  editGroup: () => {},
  noRedirect: false,
  setGroupId: () => {},
  resetContext: () => {},
});

export const BlocksGroupProvider = ({
  groupId: propsGroupId,
  itemType,
  itemId,
  children,
  noRedirect,
}: itemBlockGroupsType & {
  children: ReactElement;
  noRedirect: boolean;
}) => {
  const [groupId, setGroupId] = useState(propsGroupId);
  const { data: group, editGroup } = useGroup(groupId);
  const queryClient = useQueryClient();

  const resetContext = () => {
    setGroupId(undefined);
    queryClient.resetQueries("block_group");
  };

  return (
    <BlocksGroupContext.Provider
      value={{
        group,
        editGroup,
        groupId,
        setGroupId,
        itemType,
        itemId,
        noRedirect,
        resetContext,
      }}
    >
      {children}
    </BlocksGroupContext.Provider>
  );
};
