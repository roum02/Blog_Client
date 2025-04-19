"use client";

import { useForm } from "react-hook-form";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
}

export default function CommentForm({
  onSubmit,
  isSubmitting = false,
}: CommentFormProps) {
  const { register, handleSubmit, reset } = useForm<{ content: string }>();

  const handleFormSubmit = ({ content }: { content: string }) => {
    if (!content) return;
    onSubmit(content);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8 space-y-4">
      <textarea
        {...register("content")}
        placeholder="댓글을 입력하세요"
        className="w-full p-3 border rounded shadow-sm resize-none focus:outline-none focus:ring focus:ring-blue-300"
        rows={4}
      />
      <div className="text-right">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "작성 중..." : "댓글 작성"}
        </button>
      </div>
    </form>
  );
}
