import {
  BlockGroupPatch,
  GroupTypeResponse,
  GroupTypeStore,
  IBlock,
  itemBlockGroupsType,
} from "../types/types";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios, { AxiosRequestConfig } from "axios";
import { useContext, useEffect, useState } from "react";

import { BlocksGroupContext } from "../providers/BlockGroupContext";
import { LocaleContext } from "../providers/LocaleContext";
import toast from "react-hot-toast";

const instance = axios.create();

export async function fetcher<T>(url: string, config: AxiosRequestConfig = {}) {
  try {
    const response = await instance({
      url,
      withCredentials: true,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
    },
  },
});

export function BlocksProvider({
  children,
  api,
}: {
  children: React.ReactNode;
  api: string;
}) {
  const [initialized, setInitialized] = useState<boolean>(false);
  useEffect(() => {
    instance.defaults.baseURL = api;
    setInitialized(true);
  }, [api]);

  if (!initialized) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export function useGroups() {
  return useQuery<GroupTypeResponse[]>(["block_group"], () =>
    fetcher(`/block_group/list`)
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
        },
      });

      return data;
    },
    {
      enabled: !!groupId,
      cacheTime: Infinity,
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

      let data: BlockGroupPatch = {
        blockGroup: {
          ...groupOmitItemBlockGroups,
          jsonContent: JSON.stringify(blocks),
        },

        locale: currentLocale,
      };

      console.log(itemId, itemType, contextItemId, contextItemType);

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
        toast.success("enregistré avec succès");
        if (noRedirect) {
          window.location.reload();
          return;
        }
        window.location.replace(`/admin/TheliaBlocks/${data.id}`);
      },
    }
  );
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  const { groupId: contextGroupId } = useContext(BlocksGroupContext);
  const { currentLocale } = useContext(LocaleContext);

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
      onSuccess: (data, groupId) => {
        queryClient.invalidateQueries(["block_group"]);
        toast.success("groupe supprimé");
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
    itemId: contextItemId,
    itemType: contextItemType,
  } = useContext(BlocksGroupContext);

  return useMutation(
    (id?: number, itemId?: number, itemType?: string) =>
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
        const { jsonContent, ...rest } = data;
        console.log("TODO");
      },
    }
  );
}

export function useUnlinkContentFromGroup() {
  return useMutation(
    ({ id }: { id: GroupTypeStore["id"] }) =>
      fetcher(`/item_block_group/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => {
        console.log("TODO");
      },
    }
  );
}

export function usePreviewGroup(timestamp: number, data: string) {
  const { currentLocale } = useContext(LocaleContext);

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
    }
  );

  return query;
}
