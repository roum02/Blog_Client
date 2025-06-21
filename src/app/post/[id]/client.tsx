"use client";

import Link from "next/link";
import {
  usePost,
  useCommentsByPostId,
  useSaveComment,
} from "@blog-client-query";
import { notFound } from "next/navigation";
import dayjs from "@blog-client-dayjs";
import { CommentList, CommentForm } from "@/lib/components/Client";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function PostDetailPageClient({ postId }: { postId: number }) {
  const { data: post } = usePost(postId);
  const { data: comments } = useCommentsByPostId(postId);
  const { mutate: saveComment, isPending } = useSaveComment(postId);

  const { user, isLoggedIn } = useAuthStore();

  if (!post || !comments) {
    return notFound();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-500 text-sm">
        작성일:{" "}
        {/* {dayjs(post.updatedAt).tz("Asia/Seoul").format("YYYY.MM.DD A hh:mm")} | */}
        {post.updatedAt}
        카테고리: {post.category.name}
      </p>
      {/* TODO sanitizeHtml 추가 */}
      {post?.thumbnailUrl && <img src={post?.thumbnailUrl} />}

      <div
        className="mt-4 prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {user?.memberType === "ADMIN" && (
        <div className="mt-6 text-right">
          <Link
            href={`/register/${post.id}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            수정
          </Link>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">댓글</h2>
        <CommentList comments={comments} />
        <CommentForm
          onSubmit={(content) => {
            if (!user) {
              alert("로그인 후 댓글 입력이 가능합니다.");
              return;
            }
            saveComment({
              content,
              postId,
              authorId: user.memberNickName,
              isPublished: true,
            });
          }}
          isSubmitting={isPending}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
}
