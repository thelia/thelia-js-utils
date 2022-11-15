import { GroupTypeResponse, itemBlockGroupsType } from "../types/types";
import { ReactElement, createContext, useEffect, useState } from "react";

import { useGlobalHasChanged } from "../utils/globalState";
import { useGroup } from "../utils/queries";
import { useIntl } from "react-intl";
import { useQueryClient } from "react-query";

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

  const intl = useIntl();
  const [hasChanged] = useGlobalHasChanged();

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = intl.formatMessage({
        id: "BlocksEditor__UNSAVED_LEAVE",
      });
    };

    if (hasChanged) {
      window.addEventListener("beforeunload", handler);
      return () => {
        window.removeEventListener("beforeunload", handler);
      };
    }

    return () => {};
  }, [hasChanged]);

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
