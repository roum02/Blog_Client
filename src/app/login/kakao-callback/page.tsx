"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      // 백엔드에 인증 요청
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/kakao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          // 토큰 저장 or 로그인 처리
          alert(`로그인 성공`);
          router.push("/");
        })
        .catch((err) => {
          alert(`로그인 실패 ${err}`);
        });
    }
  }, [code]);

  return <div>카카오 로그인 처리 중...</div>;
}
