// hooks/queries/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query";
import { getCategories } from "./api";
import { Category } from "./type";

export const CATEGORY_QUERY_KEY = ["CATEGOIES"] as const;
export const CATEGORY_DETAIL_QUERY_KEY = (id: number) =>
  [...CATEGORY_QUERY_KEY, id] as const;

export const useCategories = (
  options?: Omit<
    UseQueryOptions<Category[], Error, Category[], typeof CATEGORY_QUERY_KEY>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEY,
    queryFn: getCategories,
    ...options,
  });
};
