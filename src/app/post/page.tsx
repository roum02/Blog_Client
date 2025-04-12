export default async function PostsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">전체 게시글</h1>
      <ul className="space-y-2">
        {posts.map((post: any) => (
          <li key={post.id}>
            <a
              href={`/posts/${post.id}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </a>
            <div className="text-sm text-gray-500">
              {new Date(post.updatedAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
