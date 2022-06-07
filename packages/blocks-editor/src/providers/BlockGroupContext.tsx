import * as React from "react";

import { GroupTypeResponse, Locale, itemBlockGroupsType } from "../types/types";

import { useGroup } from "../utils/queries";

export const BlocksGroupContext = React.createContext<{
  group?: GroupTypeResponse;
  editGroup: Function;
  groupId?: number;
  itemType?: string;
  itemId?: number;
  noRedirect: boolean;
}>({
  group: undefined,
  editGroup: () => {},
  noRedirect: false,
});

export const BlocksGroupProvider = ({
  groupId,
  itemType,
  itemId,
  children,
  noRedirect,
}: itemBlockGroupsType & {
  children: React.ReactElement;
  noRedirect: boolean;
}) => {
  const [group, setGroup] = React.useState<GroupTypeResponse>({
    visible: true,
    title: "",
    slug: null,
  });

  const { data, editGroup } = useGroup(groupId);

  React.useEffect(() => {
    if (data) {
      setGroup(data);
    }
  }, [data]);

  return (
    <BlocksGroupContext.Provider
      value={{ group, editGroup, groupId, itemType, itemId, noRedirect }}
    >
      <React.Suspense fallback="loading group">{children}</React.Suspense>
    </BlocksGroupContext.Provider>
  );
};
