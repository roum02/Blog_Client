import { Comment } from "@/lib/query/comment/type";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return <div className="text-gray-500">아직 작성된 댓글이 없어요.</div>;
  }

  return (
    <ul className="space-y-4 mt-6">
      {comments.map((comment) => (
        <li key={comment.id} className="p-4 border rounded shadow-sm">
          <p className="text-sm text-gray-800 whitespace-pre-wrap">
            {comment.content}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            작성자 ID: {comment.authorId} |{" "}
            {new Date(comment.createdAt).toLocaleString("ko-KR")}
          </p>
        </li>
      ))}
    </ul>
  );
}
