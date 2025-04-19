import axios from "@/lib/axios/instance";
import { Comment } from "./type";

export const getComments = async (postId: number): Promise<Comment[]> => {
  const response = await axios.get(`/comments?postId=${postId}`);
  return response.data;
};
