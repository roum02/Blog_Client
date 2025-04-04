"use client";

import { FiMenu } from "react-icons/fi";

type TopNavProps = {
  onToggleSidebar: () => void;
};

export default function TopNav({ onToggleSidebar }: TopNavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-gray-800 text-white flex items-center px-4 z-50 shadow">
      <button
        onClick={onToggleSidebar}
        className="text-2xl focus:outline-none hover:text-gray-300"
        aria-label="Toggle Sidebar"
      >
        <FiMenu />
      </button>
      <div className="ml-4 text-lg font-bold">Dev Blog</div>
    </header>
  );
}
