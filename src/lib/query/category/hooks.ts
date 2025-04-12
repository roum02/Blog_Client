// hooks/queries/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./api";

export const CATEGORY_QUERY_KEY = ["categories"];

export const useCategories = () => {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEY,
    queryFn: getCategories,
    //staleTime: 1000 * 60 * 5, // optional: 5분간 fresh
  });
};
