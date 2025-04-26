"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const REDIRECT_URI = "http://localhost:3000/login/kakao-callback";

const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
  process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;

export default function LoginPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      alert("로그아웃 완료");
      router.push("/");
    } catch (error: any) {
      alert(
        `로그아웃 실패: ${error?.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <>
      <a href={kakaoAuthUrl}>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded">
          카카오 로그인
        </button>
      </a>

      <button
        className="bg-gray-800 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        카카오 로그아웃
      </button>
    </>
  );
}
