import PostRegisterClient from "./client";
import {
  getCategories,
  CATEGORY_QUERY_KEY,
  queryClient,
} from "@blog-client-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function RegisterPage() {
  await queryClient.prefetchQuery({
    queryKey: CATEGORY_QUERY_KEY,
    queryFn: getCategories,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">글 작성하기</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostRegisterClient />
      </HydrationBoundary>
    </div>
  );
}
