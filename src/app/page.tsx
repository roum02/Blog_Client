import { PostSwiper, PostListWithMoreButton } from "@/lib/components/Client";
import { QueryClient } from "@tanstack/react-query";
import { prefetchPosts } from "@blog-client-query";

const bannerData = {
  imageUrl:
    "https://ilovecharacter.com/news/data/20250416/p1065598847654531_852_thum.png",
  title: "따끈따근",
  subtitle: "새로운 소식과 깊이 있는 포스팅을 만나보세요!",
};

export default async function Home() {
  const popularPosts = await prefetchPosts({ limit: 4 });

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <ImageBanner {...bannerData} />

      {popularPosts && (
        <>
          <h2 className="text-2xl font-semibold mt-10 mb-2 flex items-center gap-2">
            인기 글 <span className="text-yellow-400">✨</span>
          </h2>
          <p className="mb-6 text-gray-600">
            인기 있는 포스팅을 구경해보세요 !
          </p>

          <PostSwiper posts={popularPosts.posts} />
        </>
      )}

      <h2 className="text-2xl font-semibold mt-10 mb-2 flex items-center gap-2">
        전체 글
      </h2>

      <PostListWithMoreButton />
    </div>
  );
}

interface BannerProps {
  imageUrl: string;
  altText?: string;
  title: string;
  subtitle?: string;
}

function ImageBanner({
  imageUrl,
  altText = "배너 이미지",
  title,
  subtitle,
}: BannerProps) {
  return (
    <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden cursor-pointer shadow-lg">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover brightness-75 hover:brightness-90 transition"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white">
        <h2 className="text-3xl font-bold drop-shadow-md">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-lg drop-shadow-md max-w-xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
