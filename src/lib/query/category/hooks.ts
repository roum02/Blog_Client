// hooks/queries/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query";
import { getCategories } from "./api";
import { Category } from "./type";

export const CATEGORY_QUERY_KEY = ["categories"] as const;

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
