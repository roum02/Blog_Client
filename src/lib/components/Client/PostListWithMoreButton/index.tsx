"use client";
import { useState, useRef, useEffect } from "react";
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = post.content;
    }
  }, [post.content]);

  return (
    <article
      className="relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow group"
      style={{
        backgroundImage: `url(${post?.thumbnailUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "250px",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 text-white">
        <span className="inline-block bg-green-200 text-green-900 text-xs px-2 py-1 rounded mb-2 w-max select-none">
          {post.category.name}
        </span>

        <h3 className="text-white font-semibold text-lg leading-snug mb-1 line-clamp-2">
          {post.title}
        </h3>
        <div
          ref={ref}
          className="text-gray-200 text-sm flex-grow line-clamp-1 overflow-hidden"
        />
        <time className="text-xs text-white/60 mt-2">{post.updatedAt}</time>
      </div>
    </article>
  );
}
