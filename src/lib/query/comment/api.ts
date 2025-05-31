import axios from "@/lib/axios/instance";
import { Comment } from "./type";

export interface CreateCommentPayload {
  content: string;
  postId: number;
  authorId: string;
  isPublished?: boolean;
}

export const getComments = async (postId: number): Promise<Comment[]> => {
  const response = await axios.get(`/comments?postId=${postId}`);
  return response.data;
};

export const saveComment = async (payload: CreateCommentPayload) => {
  const res = await axios.post(`/comments`, payload);
  return res.data;
};
