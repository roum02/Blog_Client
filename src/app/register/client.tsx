"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@blog-client-components";
import { useCreatePost } from "@/lib/query/post/hooks";
import { getCategories, CATEGORY_QUERY_KEY } from "@blog-client-query";
import { useQuery } from "@tanstack/react-query";

interface PostRegisterClientProps {
  //categories: { id: number; name: string }[];
}

export default function PostRegisterClient({}: PostRegisterClientProps) {
  const { data: categories = [] } = useQuery({
    queryKey: CATEGORY_QUERY_KEY,
    queryFn: getCategories,
  });

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");

  const { mutateAsync } = useCreatePost();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !categoryId || !content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      await mutateAsync({
        title,
        content,
        categoryId: Number(categoryId),
        authorId: 1,
        isPublished: true,
      });

      alert("게시글이 성공적으로 등록되었습니다");
      router.push("/post");
    } catch (error) {
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl p-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          카테고리
        </label>
        <select
          id="category"
          name="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">카테고리를 선택하세요</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          내용
        </label>
        <Textarea value={content} onChange={setContent} />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          등록
        </button>
      </div>
    </form>
  );
}
