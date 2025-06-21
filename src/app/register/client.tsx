"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@blog-client-components";
import { useCreatePost, useUploadImageurl } from "@/lib/query/post/hooks";
import { getCategories, CATEGORY_QUERY_KEY } from "@blog-client-query";
import { useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type RegisterInputType = yup.InferType<typeof schema>;

const schema = yup.object({
  title: yup.string().required(),
  categoryId: yup.number().required(),
  content: yup.string().required(),
  isPublished: yup.string().oneOf(["true", "false"]).required(),
  thumbnailUrl: yup.string().optional(),
});

const IMAGE_PRE_URL = `https://s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}`;

export default function PostRegisterClient({}) {
  const [activeTab, setActiveTab] = useState<"url" | "upload">("url");
  const [imageUrl, setImageUrl] = useState("");
  const { data: categories = [] } = useQuery({
    queryKey: CATEGORY_QUERY_KEY,
    queryFn: getCategories,
  });

  // TODO: yupResolver 확인
  const methods = useForm<RegisterInputType>({
    // resolver: yupResolver(schema),
    defaultValues: {
      isPublished: "true",
    },
  });

  const { register, handleSubmit } = methods;

  const { mutateAsync: postUploadMutation, isPending: isPostUploading } =
    useCreatePost();
  const { mutateAsync: uploadImageMutation, isPending: isImageUploading } =
    useUploadImageurl();

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterInputType> = async (data) => {
    if (isPostUploading) {
      return;
    }

    if (!data.title || !data.categoryId || !data.content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      await postUploadMutation({
        title: data.title,
        content: data.content,
        categoryId: Number(data.categoryId),
        authorId: 1,
        isPublished: data.isPublished === "true",
        thumbnailUrl: data?.thumbnailUrl
          ? data.thumbnailUrl
          : `${IMAGE_PRE_URL}/${imageUrl}`,
      });

      alert("게시글이 성공적으로 등록되었습니다");
      router.push("/post");
    } catch (error) {
      alert(`${error} 등록에 실패했습니다.`);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) {
      return;
    }
    const file = e.target.files[0];

    // 이미지(파일)를 서버에 보낼 때는 multipart/form-data 형식으로 전송
    const formData = new FormData();
    formData.append("file", file);

    try {
      const imgUrlData = await uploadImageMutation(formData);
      setImageUrl(imgUrlData.imageUrl);
      alert("이미지가 성공적으로 등록되었습니다.");
    } catch (error) {
      alert(`${error} 등록에 실패했습니다.`);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-xl p-6"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            제목
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
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
            {...register("categoryId")}
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

        <span className="block text-sm font-medium text-gray-700 mb-1">
          공개 여부
        </span>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              value="true"
              {...register("isPublished")}
              className="text-blue-500"
            />
            <span>공개</span>
          </label>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              value="false"
              {...register("isPublished")}
              className="text-blue-500"
            />
            <span>비공개</span>
          </label>
        </div>

        {/* 탭 버튼 */}
        <div className="flex border-b mb-4">
          <button
            type="button"
            className={`flex-1 py-2 text-center ${
              activeTab === "url"
                ? "border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("url")}
          >
            URL 입력
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center ${
              activeTab === "upload"
                ? "border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            이미지 업로드
          </button>
        </div>

        {/* 탭 내용 */}
        {activeTab === "url" && (
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              섬네일 URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              {...register("thumbnailUrl")}
              className="w-full rounded border px-3 py-2"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Thumbnail Preview"
                className="mt-2 w-40 h-40 object-cover rounded"
              />
            )}
          </div>
        )}

        {activeTab === "upload" && (
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              이미지 업로드
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isImageUploading}
              className="w-full"
            />
            {isImageUploading && (
              <div className="mt-2 text-sm text-blue-600">
                이미지 업로드 중...
              </div>
            )}
            {imageUrl && (
              <img
                src={`${IMAGE_PRE_URL}/${imageUrl}`}
                alt="Uploaded Thumbnail Preview"
                className="mt-2 w-40 h-40 object-cover rounded"
              />
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            내용
          </label>
          <Textarea />
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={isPostUploading}
            className={`px-4 py-2 rounded transition ${
              isPostUploading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isPostUploading ? "등록 중..." : "등록"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
