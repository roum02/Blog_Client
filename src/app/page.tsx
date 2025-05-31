import { PostSwiper } from "@/lib/components/Client";

export default function Home() {
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

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
        최신 글 <span className="text-yellow-400">✨</span>
      </h2>
      <p className="mb-6 text-gray-600">
        따끈따근 하게 올라온 최신 포스팅을 구경해보세요 !
      </p>

      <PostSwiper posts={latestPosts} />
    </div>
  );
}
