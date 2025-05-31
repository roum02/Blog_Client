"use client";

import { useForm } from "react-hook-form";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
  isLoggedIn: boolean;
}

export default function CommentForm({
  onSubmit,
  isSubmitting = false,
  isLoggedIn = false,
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
        placeholder={
          isLoggedIn ? "댓글을 입력하세요" : "로그인 후 댓글 입력이 가능합니다."
        }
        className={`w-full p-3 border rounded shadow-sm resize-none focus:outline-none focus:ring ${
          isLoggedIn ? "focus:ring-blue-300" : "bg-gray-200 cursor-not-allowed"
        }`}
        rows={4}
        disabled={!isLoggedIn}
      />
      <div className="text-right">
        <button
          type="submit"
          disabled={isSubmitting || !isLoggedIn}
          className={`px-4 py-2 rounded text-white transition
            ${
              isLoggedIn
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }
            disabled:opacity-50
          `}
        >
          댓글 작성
        </button>
      </div>
    </form>
  );
}
