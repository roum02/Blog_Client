"use client";

import { FiMenu, FiSearch } from "react-icons/fi";
import { useAuthStore } from "@blog-client-store/useAuthStore";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios/instance";

type TopNavProps = {
  onToggleSidebar: () => void;
};

export default function TopNav({ onToggleSidebar }: TopNavProps) {
  const { isLoggedIn, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(`/auth/logout`, {}, { withCredentials: true });
      clearAuth();
      alert("로그아웃 완료");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      alert(`로그아웃 실패: ${errorMessage}`);
    }
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-gray-800 text-white flex items-center justify-between px-4 z-50 shadow">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-2xl hover:text-gray-300"
          aria-label="Toggle Sidebar"
        >
          <FiMenu />
        </button>
        <div className="text-lg font-bold">Dev Blog</div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            alert("Search clicked");
          }}
          className="text-2xl hover:text-gray-300"
          aria-label="Search"
        >
          <FiSearch />
        </button>

        {/* 통합 로그아웃 */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-3 py-1 border border-white rounded hover:bg-white hover:text-gray-800 transition"
            aria-label="Logout"
          >
            로그아웃
          </button>
        ) : (
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="px-3 py-1 border border-white rounded hover:bg-white hover:text-gray-800 transition"
            aria-label="Login"
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
}
