"use client";
import { useAuthStore } from "@/lib/store/useAuthStore";
import axios from "@/lib/axios/instance";
import { useRouter } from "next/navigation";

const REDIRECT_URI = "https://localhost:3000/login/kakao-callback";

const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
  process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;

export default function LoginPage() {
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      await axios.post(`/auth/logout`, {}, { withCredentials: true });
      clearAuth();
      alert("로그아웃 완료");
    } catch (error: any) {
      alert(
        `로그아웃 실패: ${error?.response?.data?.message || error.message}`
      );
    }
    router.push("/");
  };

  return (
    <>
      <a href={kakaoAuthUrl}>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded">
          카카오 로그인
        </button>
      </a>

      <a
      //href={googleAuthUrl}
      >
        <button className="bg-blue-600 text-white px-4 py-2 rounded ml-2">
          구글 로그인
        </button>
      </a>

      {/* 통합 로그아웃 */}
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded ml-2"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </>
  );
}
