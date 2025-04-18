import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import {
  POSTS_QUERY_KEY,
  getPost,
  POSTS_DETAIL_QUERY_KEY,
} from "@blog-client-query";
import { Suspense } from "react";
import PostDetailPageClient from "./client";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ category: string }>;
}

export default async function PostDetailPage({
  params,
  searchParams,
}: PostDetailPageProps) {
  const queryClient = new QueryClient();
  const param = await params;
  const postId = Number(param.id);
  const searchParam = await searchParams;

  await queryClient.prefetchQuery({
    queryKey: POSTS_DETAIL_QUERY_KEY(postId),
    queryFn: () => getPost(postId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<div>Loading...</div>}>
        <PostDetailPageClient postId={postId} />
      </Suspense>
    </HydrationBoundary>
  );
}
