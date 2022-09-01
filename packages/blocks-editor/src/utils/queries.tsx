import {
  BlockGroupPatch,
  GroupTypeResponse,
  GroupTypeStore,
  IBlock,
  itemBlockGroupsType,
} from "../types/types";
import { QueryClientProvider, useMutation, useQuery, useQueryClient } from "react-query";
import { ReactNode, useContext, useEffect, useState } from "react";
import { BlocksGroupContext } from "../providers/BlockGroupContext";
import { LocaleContext } from "../providers/LocaleContext";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import { useBlocksContext } from "../hooks/useBlockContext";

import { fetcher, instance, queryClient } from "@thelia/fetcher";

export function BlocksProvider({ children, api }: { children: ReactNode; api: string }) {
  const [initialized, setInitialized] = useState<boolean>(false);
  useEffect(() => {
    instance.defaults.baseURL = api;
    setInitialized(true);
  }, [api]);

  if (!initialized) {
    return null;
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function useGroups(options?: { limit?: number; offset?: number }) {
  const { currentLocale } = useContext(LocaleContext);

  return useQuery<GroupTypeResponse[]>(
    ["block_group", options],
    () =>
      fetcher(`/block_group/list`, {
        method: "GET",
        params: {
          limit: options?.limit || 10,
          offset: options?.offset || 0,
          locale: currentLocale,
        },
      }),
    {
      keepPreviousData: true,
    }
  );
}

export function useGroup(id?: number) {
  const { groupId: contextGroupId } = useContext(BlocksGroupContext);
  const { currentLocale } = useContext(LocaleContext);
  const groupId = id || contextGroupId;

  const key = ["block_group", groupId, currentLocale];
  const queryClient = useQueryClient();

  const query = useQuery<GroupTypeResponse>(
    key,
    async () => {
      const data = await fetcher<GroupTypeResponse>(`/block_group`, {
        method: "GET",
        params: {
          id: groupId,
          locale: currentLocale,
          disable_shortcode: 1,
        },
      });

      return data;
    },
    {
      enabled: !!groupId,
      staleTime: 0,
      cacheTime: Infinity,
      initialData: undefined,
    }
  );

  return {
    ...query,
    editGroup: (data: any) => {
      queryClient.setQueryData(key, () => {
        return data;
      });
    },
  };
}

export function useCreateOrUpdateGroup() {
  const {
    groupId: contextGroupId,
    itemId: contextItemId,
    itemType: contextItemType,
    noRedirect = false,
  } = useContext(BlocksGroupContext);
  const intl = useIntl();
  const { currentLocale } = useContext(LocaleContext);
  const { group: contextGroup } = useContext(BlocksGroupContext);

  return useMutation(
    ({
      groupId = contextGroupId,
      itemId = contextItemId,
      itemType = contextItemType,
      group = contextGroup,
      blocks,
    }: itemBlockGroupsType & {
      group?: any;
      blocks: IBlock[];
    }) => {
      const { itemBlockGroups = {}, ...groupOmitItemBlockGroups } = group;

      const data: BlockGroupPatch = {
        blockGroup: {
          ...groupOmitItemBlockGroups,
          visible: true,
          jsonContent: JSON.stringify(blocks),
        },

        locale: currentLocale,
      };

      if (itemId || itemType) {
        data.itemBlockGroup = {
          itemType,
          itemId,
          blockGroupId: group.id,
        };
      }

      if (!data.blockGroup.slug) {
        data.blockGroup.slug = null;
      }

      return fetcher(`/block_group`, {
        method: groupId ? "PATCH" : "POST",
        data,
      });
    },
    {
      onSuccess: (data: GroupTypeStore) => {
        toast.success(intl.formatMessage({ id: "Toast__BLOCK_SAVED" }));
        if (noRedirect) {
          window.location.reload();
          return;
        }
        window.location.replace(`/admin/TheliaBlocks/${data.id}`);
      },
      onError: () => {
        toast.error(intl.formatMessage({ id: "Toast__BLOCK_NOT_SAVED" }));
      },
    }
  );
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  const { groupId: contextGroupId } = useContext(BlocksGroupContext);
  const intl = useIntl();

  return useMutation(
    (id?: number) => {
      if (!id && !contextGroupId) {
        throw new Error(
          "id is mandatory, and no fallback groupId was found in current context"
        );
      }
      return fetcher(`/block_group/${id || contextGroupId}`, {
        method: "DELETE",
      });
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["block_group"]);
        toast.success(intl.formatMessage({ id: "Toast__BLOCK_DELETED" }));
      },
      onError: () => {
        toast.error(intl.formatMessage({ id: "Toast__BLOCK_NOT_DELETED" }));
      },
    }
  );
}

export function useDeleteItemBlockGroup() {
  const queryClient = useQueryClient();
  const intl = useIntl();

  return useMutation(
    (id?: number) => {
      if (!id) {
        throw new Error(
          "id is mandatory, and no fallback itemId was found in current context"
        );
      }
      return fetcher(`item_block_group/${id}`, {
        method: "DELETE",
      });
    },

    {
      onSuccess: (data, groupId) => {
        queryClient.invalidateQueries(["item_block_group"]);
        toast.success(intl.formatMessage({ id: "Toast__ITEM_BLOCK_GROUP_DELETED" }));
      },
      onError: (error) => {
        toast.error(intl.formatMessage({ id: "Toast__ITEM_BLOCK_GROUP_NOT_DELETED" }));
      },
    }
  );
}

export function useDuplicateGroup() {
  const { groupId } = useContext(BlocksGroupContext);

  return useMutation(
    (id?: number) => {
      if (!id && !groupId) {
        throw new Error(
          "id is mandatory, and no fallback groupId was found in current context"
        );
      }

      return fetcher(`/block_group/duplicate/${id}`, {
        method: "POST",
      });
    },
    {
      onSuccess: (newGroupId: number) => {
        window.location.replace(`/admin/TheliaBlocks/${newGroupId}`);
      },
    }
  );
}

export function useLinkContentToGroup() {
  const {
    groupId,
    setGroupId,
    itemId: contextItemId,
    itemType: contextItemType,
  } = useContext(BlocksGroupContext);

  const { currentLocale } = useContext(LocaleContext);

  const intl = useIntl();
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, itemId, itemType }: { id?: number; itemId?: number; itemType?: string }) =>
      fetcher(`/item_block_group`, {
        method: "POST",
        data: {
          itemBlockGroup: {
            blockGroupId: id || groupId,
            itemId: itemId || contextItemId,
            itemType: itemType || contextItemType,
          },
        },
      }),
    {
      onSuccess: (data: GroupTypeResponse) => {
        toast.success(intl.formatMessage({ id: "Toast__ITEM_BLOCK_GROUP_LINKED" }));

        setGroupId(data.id);
        queryClient.setQueryData(["block_group", data.id, currentLocale], data);
        /* window.location.reload(); */
      },
    }
  );
}

export function useUnlinkContentFromGroup() {
  const { resetContext } = useContext(BlocksGroupContext);
  const { resetBlocks } = useBlocksContext();
  const intl = useIntl();

  return useMutation(
    ({ id }: { id: GroupTypeStore["id"] }) =>
      fetcher(`/item_block_group/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => {
        toast.success(intl.formatMessage({ id: "Toast__ITEM_BLOCK_GROUP_UNLINKED" }));

        resetBlocks();
        resetContext();
        /* window.location.reload(); */
      },
    }
  );
}

export function usePreviewGroup(timestamp: number, data: string) {
  const { currentLocale } = useContext(LocaleContext);
  const intl = useIntl();

  const key = ["preview_block_group", currentLocale, timestamp];

  const query = useQuery(
    key,
    async () => {
      return fetcher(`/preview`, {
        baseURL: window.location.origin + "/TheliaBlocks",
        method: "POST",
        data: {
          json: data,
        },
      });
    },
    {
      enabled: !!timestamp && !!currentLocale,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      suspense: false,
      onError: (error) => {
        toast.error(intl.formatMessage({ id: "Toast__TOOLBAR_PREVIEW_ERROR" }));
      },
    }
  );

  return query;
}

export type SearchProps = {
  searchIn?: "product" | "folder" | "category" | "content";
  type: "ids" | "reference" | "title" | "id";
  value: string | null;
};

export function useProductsBy({ type, value = null }: SearchProps) {
  let params: {
    id: string | null;
    ids: string | null;
    reference: string | null;
    title: string | null;
  } = {
    id: null,
    ids: null,
    reference: null,
    title: null,
  };

  params[type] = value;

  return useQuery(
    ["Products", type, value],
    () =>
      fetcher(`/product/search`, {
        method: "GET",
        params,
      }),
    {
      enabled: !!value,
    }
  );
}

export function useSearchBy({ searchIn, type = "title", value = null }: SearchProps) {
  let params: {
    id: string | null;
    ids: string | null;
    reference: string | null;
    title: string | null;
  } = {
    id: null,
    ids: null,
    reference: null,
    title: null,
  };

  params[type] = value;

  return useQuery(
    ["Search", value],
    () =>
      fetcher(`/${searchIn}/search`, {
        method: "GET",
        params,
      }),
    {
      enabled: !!value,
    }
  );
}
