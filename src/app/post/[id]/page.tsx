import { notFound } from "next/navigation";
import Link from "next/link";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function PostDetailPage({
  params,
  searchParams,
}: PostDetailPageProps) {
  const param = await params;
  const searchParam = await searchParams;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${param.id}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return notFound();
  }

  const post = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-500 text-sm">
        작성일: {new Date(post.updatedAt).toLocaleString()} | 카테고리:{" "}
        {/* {post.category.name} */}
      </p>
      {/* TODO sanitizeHtml 추가 */}
      <div
        className="mt-4 prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-6 text-right">
        <Link
          href={`/register/${post.id}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          수정
        </Link>
      </div>
    </div>
  );
}
