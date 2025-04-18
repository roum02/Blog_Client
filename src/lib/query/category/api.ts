import axios from "@/lib/axios/instance";
import { Category } from "./type";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get("/category");
  return response.data;
};

export const getCategoriesDetail = async (id: number): Promise<Category> => {
  const response = await axios.get(`/category/${id}`);
  return response.data;
};
