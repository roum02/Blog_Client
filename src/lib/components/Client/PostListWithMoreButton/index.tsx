"use client";
import { useState } from "react";
import { Post, usePosts } from "@blog-client-query";

const LIMIT_SIZE = 6;

function PostListWithMoreButton() {
  const [initLimitRow, setInitLimitRow] = useState<number>(LIMIT_SIZE);

  const { data: posts } = usePosts({ limit: initLimitRow });

  const loadMore = async () => {
    setInitLimitRow((prev) => prev + LIMIT_SIZE);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {posts?.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {(posts?.totalCount || 0) > initLimitRow && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="flex items-center gap-2 px-6 py-3 bg-transparent text-green-600 border border-green-600 rounded hover:bg-green-100 disabled:opacity-50 transition"
          >
            <span className="text-xl">＋</span>
            <span>더 보기</span>
          </button>
        </div>
      )}
    </>
  );
}

export default PostListWithMoreButton;

function PostCard({ post }: { post: Post }) {
  return (
    <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col">
      {/* {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={`${post.title} 썸네일`}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
      )} */}

      <div className="p-4 flex flex-col flex-grow">
        <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mb-2 w-max select-none">
          {post.category.name}
        </span>
        <h3 className="text-gray-200 font-semibold text-lg leading-snug mb-2 line-clamp-2">
          🎨 {post.title}
        </h3>
        <p className="text-gray-200 text-sm flex-grow line-clamp-3">
          {post.category.description}
        </p>
        <time className="text-gray-400 text-xs mt-3">{post.updatedAt}</time>
      </div>
    </article>
  );
}
