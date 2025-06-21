import axios from "@/lib/axios/instance";
import qs from "qs";

export interface PostList {
  posts: Post[];
  totalCount: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  viewCount: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    description?: string;
  };
  thumbnailUrl?: string;
}

export interface CreatePostPayload {
  title: string;
  content: string; // HTML
  categoryId: number;
  authorId: number;
  isPublished: boolean;
  thumbnailUrl?: string;
}

export interface UploadImageResponse {
  imageUrl: string;
}

export const getPosts = async (
  query: Record<string, string | number>
): Promise<PostList> => {
  const queryString = qs.stringify(query, { skipNulls: true });
  const res = await axios.get(`/posts?${queryString}`);
  return res.data;
};

export const getPost = async (id: number): Promise<Post> => {
  const res = await axios.get(`/posts/${id}`);
  return res.data;
};

export const createPost = async (payload: CreatePostPayload) => {
  const res = await axios.post("/posts", payload);
  return res.data;
};

export const uploadImageurl = async (
  payload: FormData
): Promise<UploadImageResponse> => {
  const res = await axios.post("/posts/image", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteImageurl = async (key: string) => {
  // 두 번째 인자 config 객체
  const res = await axios.delete("/posts/image", {
    params: { key },
  });
  return res.data;
};
