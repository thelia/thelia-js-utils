import { useMutation, useQuery, useQueryClient } from "react-query";

import { LibraryImage } from "./types";
import { fetcher } from "@thelia/blocks-editor";

export function useLibraryImage(options: {
  id?: number | null;
  limit?: number | null;
  offset?: number;
  title?: string | null;
}) {
  return useQuery(
    ["LibraryImage", options],
    () =>
      fetcher(`/library/image`, {
        method: "GET",
        params: {
          id: options.id || null,
          limit: options.limit || 5,
          offset: options.offset || 0,
          title: options.title || null,
        },
      }),
    {
      keepPreviousData: true,
      onSuccess: (data: LibraryImage[]) => {},
    }
  );
}

export function useLibraryImageById(id: number | null) {
  return useQuery(
    ["LibraryImage", id],
    () =>
      fetcher(`/library/image`, {
        method: "GET",
        params: {
          id: id || null,
        },
      }),
    {
      enabled: !!id,
    }
  );
}

export function useCreateImage() {
  const queryClient = useQueryClient();
  return useMutation<
    LibraryImage,
    {
      message: string;
      statusCode: number;
      statusText: string;
    },
    FormData
  >(
    (data) => {
      return fetcher(`/library/image`, {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
        },
        data,
      });
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["LibraryImage"], (oldData) => {
          if (oldData && Array.isArray(oldData)) {
            return [...oldData, data];
          }

          return oldData;
        });
      },
    }
  );
}

export function useDeleteImage() {
  const queryClient = useQueryClient();
  return useMutation(
    (id: LibraryImage["id"]) => {
      return fetcher(`/library/image/${id}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: (_, id) => {
        queryClient.setQueriesData(["LibraryImage"], (oldData) => {
          if (oldData && Array.isArray(oldData)) {
            return oldData.filter((i) => i.id !== id);
          }

          return oldData;
        });
      },
    }
  );
}
export function useUpdateImage() {
  const queryClient = useQueryClient();
  return useMutation(
    (id: LibraryImage["id"]) => {
      return fetcher(`/library/image/${id}`, {
        method: "POST",
      });
    },
    {
      onSuccess: (data, id) => {
        queryClient.setQueryData(["LibraryImage"], (oldData) => {
          if (oldData && Array.isArray(oldData)) {
            return oldData.map((i) => (i.id === id ? data : i));
          }

          return oldData;
        });
      },
    }
  );
}
