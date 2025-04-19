// hooks/useCommentDetail.ts
import {
  useQuery,
  UseQueryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getComments, saveComment, CreateCommentPayload } from "./api";
import { Comment } from "./type";

export const COMMENTS_BY_POST_QUERY_KEY = (postId: number) =>
  ["COMMENTS", postId] as const;

export const useCommentsByPostId = (
  postId: number,
  options?: Omit<
    UseQueryOptions<Comment[], Error, Comment[], readonly ["COMMENTS", number]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: COMMENTS_BY_POST_QUERY_KEY(postId),
    queryFn: () => getComments(postId),
    enabled: typeof postId === "number" && postId > 0,
    ...options,
  });
};

export const useSaveComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCommentPayload) => saveComment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMMENTS_BY_POST_QUERY_KEY(postId),
      });
    },
  });
};
