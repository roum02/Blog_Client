import {
  useQuery,
  UseQueryOptions,
  useMutation,
  QueryClient,
} from "@tanstack/react-query";
import {
  getPosts,
  getPost,
  Post,
  CreatePostPayload,
  createPost,
  PostList,
  uploadImageurl,
  deleteImageurl,
} from "./api";

export const POSTS_QUERY_KEY = ["POSTS"] as const;
export const POSTS_DETAIL_QUERY_KEY = (id: number) =>
  [...POSTS_QUERY_KEY, id] as const;

const queryClient = new QueryClient();

export const prefetchPosts = async (
  query = {}
): Promise<PostList | undefined> => {
  await queryClient.prefetchQuery({
    queryKey: [...POSTS_QUERY_KEY, query],
    queryFn: ({ queryKey }) => {
      const [, queryParam] = queryKey;
      return getPosts(queryParam);
    },
  });

  return queryClient.getQueryData([...POSTS_QUERY_KEY, query]);
};

export const usePosts = (
  query = {},
  options?: Omit<
    UseQueryOptions<PostList, Error, PostList, readonly [string, typeof query]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<PostList, Error, PostList, readonly [string, typeof query]>({
    queryKey: [...POSTS_QUERY_KEY, query],
    queryFn: ({ queryKey }) => {
      const [, queryParam] = queryKey;
      return getPosts(queryParam);
    },
    ...options,
  });
};

export const usePost = (
  id: number,
  options?: Omit<
    UseQueryOptions<Post, Error, Post, readonly ["POSTS", number]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: POSTS_DETAIL_QUERY_KEY(id),
    queryFn: () => getPost(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
  });
};

export const useUploadImageurl = () => {
  return useMutation({
    mutationFn: (payload: FormData) => uploadImageurl(payload),
  });
};

export function useDeleteImage() {
  return useMutation({
    mutationFn: (key: string) => deleteImageurl(key),
  });
}
