"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const handleKakaoLogin = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // 쿠키 포함 설정
            body: JSON.stringify({ code }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "서버 오류");
        }

        const data = await response.json();

        // 로그인 성공 처리
        alert(`로그인 성공 ${JSON.stringify(data)}`);
      } catch (err) {
        alert(`로그인 실패: ${(err as Error).message}`);
      }
      router.push("/");
    };

    if (code) {
      handleKakaoLogin();
    }
  }, [code]);

  return <div>카카오 로그인 처리 중...</div>;
}
