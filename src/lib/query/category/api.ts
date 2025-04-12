import axios from "@/lib/axios/instance";
import { Category } from "./type";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get("/category");
  return response.data;
};
