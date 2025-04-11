"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiHome,
  FiUser,
  FiEdit,
  FiChevronDown,
  FiChevronRight,
  FiCode,
} from "react-icons/fi";

type SideNavProps = {
  isOpen: boolean;
  isAdmin: boolean;
  onRouteChange?: () => void;
  profileImage?: string;
  nickname?: string;
};

export default function SideNav({
  isOpen,
  isAdmin,
  onRouteChange,
  profileImage = "https://item.kakaocdn.net/do/f54d975d70c2916c5705a0919f193a547154249a3890514a43687a85e6b6cc82",
  nickname = "Guest",
}: SideNavProps) {
  const pathname = usePathname();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    if (onRouteChange) {
      onRouteChange();
    }
  }, [pathname]);

  return (
    <aside
      className={`fixed top-14 left-0 w-60 h-full bg-gray-100 border-r border-gray-300 p-4 transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <ProfileContent profileImage={profileImage} nickname={nickname} />

      <ul className="space-y-3 text-gray-800 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer hover:text-black"
          >
            <FiHome />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="flex items-center gap-2 cursor-pointer hover:text-black"
          >
            <FiUser />
            About
          </Link>
        </li>

        {isAdmin && (
          <li>
            <Link
              href="/register"
              className="flex items-center gap-2 cursor-pointer hover:text-black"
            >
              <FiEdit />
              Register
            </Link>
          </li>
        )}

        <li>
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-black"
            onClick={() => setIsDetailOpen(!isDetailOpen)}
          >
            <FiCode />
            <span className="flex-1">Dev Information</span>
            {isDetailOpen ? <FiChevronDown /> : <FiChevronRight />}
          </div>

          {isDetailOpen && (
            <ul className="mt-2 ml-6 space-y-2 text-gray-600">
              <li className="flex items-center justify-between">
                <span>JavaScript</span>{" "}
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  43
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>TypeScript</span>{" "}
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  20
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Python</span>{" "}
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  1
                </span>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}

const ProfileContent = ({
  profileImage,
  nickname,
}: {
  profileImage?: string;
  nickname?: string;
}) => {
  return (
    <div className="flex items-center gap-3 mb-6 px-2">
      <img
        src={profileImage}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover border"
      />
      <div className="text-sm font-medium text-gray-800">{nickname}</div>
    </div>
  );
};
