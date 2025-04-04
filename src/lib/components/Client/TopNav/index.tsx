"use client";

import { FiMenu, FiSearch } from "react-icons/fi";

type TopNavProps = {
  onToggleSidebar: () => void;
};

export default function TopNav({ onToggleSidebar }: TopNavProps) {
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

      <button
        onClick={() => {
          alert("Search clicked");
        }}
        className="text-2xl hover:text-gray-300"
        aria-label="Search"
      >
        <FiSearch />
      </button>
    </header>
  );
}
