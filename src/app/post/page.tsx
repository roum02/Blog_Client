import Link from "next/link";

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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {CATEGORY_TITLE[category]} 게시글
      </h1>
      <ul className="space-y-2">
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
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
