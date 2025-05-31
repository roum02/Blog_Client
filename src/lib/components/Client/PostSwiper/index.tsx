"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PostSwiper = ({
  posts,
  CardComponent = PostCard,
}: {
  posts: Post[];
  CardComponent?: React.ComponentType<{ post: Post }>;
}) => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {posts.map((post) => (
        <SwiperSlide key={post.id}>
          <CardComponent post={post} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PostSwiper;

interface Post {
  id: number;
  title: string;
  summary: string;
  date: string;
  thumbnail?: string;
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col">
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={`${post.title} 썸네일`}
          className="w-full h-40 object-cover rounded-md mb-4"
          loading="lazy"
        />
      )}
      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-3 flex-grow">{post.summary}</p>
      <time className="text-sm text-gray-400">{post.date}</time>
    </article>
  );
}
