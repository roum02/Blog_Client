import axios from "@/lib/axios/instance";

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  viewCount: number;
  isPublished: true;
  createdAt: string;
  updatedAt: string;
  // TODO 카테고리 추가
  category: {
    id: number;
    name: string;
  };
}

export const getPosts = async (): Promise<Post[]> => {
  const res = await axios.get("/posts");
  return res.data;
};

export const getPost = async (id: number): Promise<Post> => {
  const res = await axios.get(`/posts/${id}`);
  return res.data;
};
