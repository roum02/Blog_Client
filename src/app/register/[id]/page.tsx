interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: Props) {
  const param = await params;
  const postId = param.id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">게시글 수정</h1>
      {postId}
    </div>
  );
}
