export default function RegisterPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">글 작성하기</h1>

      <form className="space-y-4 max-w-xl">
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            내용
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
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
    </div>
  );
}
