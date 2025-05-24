import Link from "next/link";
import { notFound } from "next/navigation";
import { Post } from "@blog-client-query";

interface PostsPageProps {
  searchParams: Promise<{ category?: string }>;
}

const CATEGORY_TITLE = {
  All: "전체",
  Tech: "기술",
} as const;

type CategoryKey = keyof typeof CATEGORY_TITLE;

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const category = (params.category ?? "All") as CategoryKey;

  // TODO fetch query 로 변경
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);

  console.log(res);

  if (!res.ok) {
    return notFound();
  }

  const posts = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {CATEGORY_TITLE[category]} 게시글
      </h1>
      <ul className="space-y-2">
        {posts.map((post: Post) => (
          <li key={post.id}>
            <Link
              href={
                category
                  ? `/post/${post.id}?category=${encodeURIComponent(category)}`
                  : `/post/${post.id}`
              }
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
            <div className="text-sm text-gray-500">
              {new Date(post.updatedAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
