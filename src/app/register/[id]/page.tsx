interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: Props) {
  const param = await params;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">게시글 수정</h1>
    </div>
  );
}
