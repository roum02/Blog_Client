"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Post } from "@blog-client-query";
import Link from "next/link";

const PostSwiper = ({
  posts,
  CardComponent = PostCard,
}: {
  posts: Post[];
  CardComponent?: React.ComponentType<{ post: Post }>;
}) => {
  const handleMoreClick = () => {};

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView="auto"
      breakpoints={{
        640: { slidesPerView: "auto" },
        1024: { slidesPerView: "auto" },
      }}
    >
      {posts.map((post) => (
        <SwiperSlide
          key={post.id}
          style={{ width: 300, flexShrink: 0 }}
          className="!w-[300px]"
        >
          <CardComponent post={post} />
        </SwiperSlide>
      ))}
      <SwiperSlide
        key="more-slide"
        style={{ width: 150, flexShrink: 0 }}
        className="!w-[150px] flex items-center justify-center cursor-pointer rounded-lg shadow-sm hover:shadow-md"
        onClick={handleMoreClick}
      >
        <MoreSlide onClick={handleMoreClick} />
      </SwiperSlide>
    </Swiper>
  );
};

export default PostSwiper;

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.id}`}>
      <article className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col">
        {post?.thumbnailUrl && (
          <img
            src={post.thumbnailUrl}
            alt={`${post.title} 썸네일`}
            className="w-full h-40 object-cover rounded-md mb-4"
            loading="lazy"
          />
        )}

        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
        <p className="text-gray-700 mb-3 flex-grow">
          {post.category.description}
        </p>
        <time className="text-sm text-gray-400">{post.updatedAt}</time>
      </article>
    </Link>
  );
}

function MoreSlide({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="rounded-lg p-4 shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow h-full"
      style={{ minHeight: 302 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      <span className="text-xl font-semibold text-blue-600">+ 더보기</span>
    </div>
  );
}
