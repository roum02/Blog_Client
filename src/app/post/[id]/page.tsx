import { notFound } from "next/navigation";

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
  console.log(post);

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
    </div>
  );
}
