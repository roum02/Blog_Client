import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import {
  getPost,
  POSTS_DETAIL_QUERY_KEY,
  COMMENTS_BY_POST_QUERY_KEY,
  getComments,
} from "@blog-client-query";
import { Suspense } from "react";
import PostDetailPageClient from "./client";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const queryClient = new QueryClient();
  const param = await params;
  const postId = Number(param.id);

  await queryClient.prefetchQuery({
    queryKey: POSTS_DETAIL_QUERY_KEY(postId),
    queryFn: () => getPost(postId),
  });

  await queryClient.prefetchQuery({
    queryKey: COMMENTS_BY_POST_QUERY_KEY(postId),
    queryFn: () => getComments(postId),
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
