import { PostSwiper, PostListWithMoreButton } from "@/lib/components/Client";

const bannerData = {
  imageUrl:
    "https://ilovecharacter.com/news/data/20250416/p1065598847654531_852_thum.png",
  title: "따끈따근",
  subtitle: "새로운 소식과 깊이 있는 포스팅을 만나보세요!",
};

const latestPosts = [
  {
    id: 1,
    title: "NestJS로 시작하는 백엔드 개발",
    summary: "NestJS 기본 개념과 프로젝트 세팅 방법",
    date: "2025-05-30",
    thumbnail: "https://source.unsplash.com/random/400x200?nestjs",
  },
  {
    id: 2,
    title: "React 18 새로운 기능 알아보기",
    summary: "React 18의 주요 변경점과 활용법",
    date: "2025-05-29",
    thumbnail: "https://source.unsplash.com/random/400x200?react",
  },
  {
    id: 3,
    title: "타입스크립트 인터페이스 활용법",
    summary: "인터페이스와 타입 별칭의 차이점 및 실무 팁",
    date: "2025-05-28",
    // thumbnail 없으면 이미지 안 뜸
  },
  {
    id: 4,
    title: "타입스크립트 인터페이스 활용법",
    summary: "인터페이스와 타입 별칭의 차이점 및 실무 팁",
    date: "2025-05-28",
    // thumbnail 없으면 이미지 안 뜸
  },
];

export default function Home() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <ImageBanner {...bannerData} />
      <h2 className="text-2xl font-semibold mt-10 mb-2 flex items-center gap-2">
        인기 글 <span className="text-yellow-400">✨</span>
      </h2>
      <p className="mb-6 text-gray-600">인기 있는 포스팅을 구경해보세요 !</p>

      <PostSwiper posts={latestPosts} />

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
