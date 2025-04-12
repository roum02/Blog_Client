import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPosts, getPost, Post } from "./api";

export const POSTS_QUERY_KEY = ["POSTS"] as const;

export const usePosts = (
  options?: Omit<
    UseQueryOptions<Post[], Error, Post[], typeof POSTS_QUERY_KEY>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: getPosts,
    ...options,
  });
};

export const usePost = (
  id: number,
  options?: Omit<
    UseQueryOptions<Post, Error, Post, readonly ["posts", number]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["posts", id] as const,
    queryFn: () => getPost(id),
    enabled: !!id,
    ...options,
  });
};
