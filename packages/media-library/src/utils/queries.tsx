import { useMutation, useQuery, useQueryClient } from "react-query";

import { ImageTag, LibraryImage } from "../types/types";
import { fetcher } from "@thelia/blocks-editor";

export function useLibraryImage(options: {
  id?: number | null;
  limit?: number | null;
  offset?: number;
  title?: string | null;
  tagId?: number | null;
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
          tagId: options.tagId || null,
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
        queryClient.setQueryData(["LibraryImage"], (oldData: any) => {
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
        queryClient.setQueriesData(["LibraryImage"], (oldData: any) => {
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
        queryClient.setQueryData(["LibraryImage"], (oldData: any) => {
          if (oldData && Array.isArray(oldData)) {
            return oldData.map((i) => (i.id === id ? data : i));
          }

          return oldData;
        });
      },
    }
  );
}

export function useGetTags() {
  return useQuery(
    ["LibraryTag"],
    () =>
      fetcher(`/library/tag`, {
        method: "GET",
      }),
    {
      keepPreviousData: true,
      onSuccess: (data: ImageTag["tag"][]) => {},
    }
  );
}

export function useDeleteTagAssociation() {
  const queryClient = useQueryClient();

  return useMutation(
    (id: ImageTag["tag"]["id"]) => {
      return fetcher(`/library/image_tag/${id}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: (data, id) => {
        queryClient.setQueriesData(["LibraryImage"], (oldData: any) => {
          if (oldData && Array.isArray(oldData)) {
            return oldData.map((image) => {
              if (image.tags && image.tags.length) {
                return {
                  ...image,
                  tags: image.tags.filter(
                    ({ imageTag }: { imageTag: ImageTag["imageTag"] }) =>
                      imageTag.id !== id
                  ),
                };
              }
              return image;
            });
          }

          return oldData;
        });
      },
    }
  );
}

export function useAssociateTag() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { imageId: number | null; tagId: number }) => {
      return fetcher(`/library/image_tag`, {
        method: "POST",
        data,
      });
    },
    {
      onSuccess: (data) => {
        queryClient.setQueriesData(["LibraryImage"], (oldData: any) => {
          if (oldData && Array.isArray(oldData)) {
            return oldData.map((image) => {
              if (image.id === data.imageTag.imageId) {
                return {
                  ...image,
                  tags: [...image.tags, data],
                };
              }

              return image;
            });
          }

          return oldData;
        });
      },
    }
  );
}
