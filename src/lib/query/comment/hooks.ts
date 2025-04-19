// hooks/useCommentDetail.ts
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getComments } from "./api";
import { Comment } from "./type";

export const COMMENT_DETAIL_QUERY_KEY = (postId: number) =>
  ["COMMENTS", postId] as const;

export const useCommentsByPostId = (
  postId: number,
  options?: Omit<
    UseQueryOptions<Comment[], Error, Comment[], readonly ["COMMENTS", number]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: COMMENT_DETAIL_QUERY_KEY(postId),
    queryFn: () => getComments(postId),
    enabled: typeof postId === "number" && postId > 0,
    ...options,
  });
};
