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
import { Category } from "@blog-client-query";

type SideNavProps = {
  isOpen: boolean;
  isAdmin: boolean;
  isDetailOpen: boolean;
  onToggleDetail: () => void;
  category?: Category[];
  onRouteChange?: () => void;
  profileImage?: string;
  nickname?: string;
};

export default function SideNav({
  isOpen,
  isAdmin,
  isDetailOpen,
  onToggleDetail,
  category,
  onRouteChange,
  profileImage = "https://item.kakaocdn.net/do/f54d975d70c2916c5705a0919f193a547154249a3890514a43687a85e6b6cc82",
  nickname = "Guest",
}: SideNavProps) {
  const pathname = usePathname();

  // 방어로직
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
            onClick={onRouteChange}
          >
            <FiHome />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="flex items-center gap-2 cursor-pointer hover:text-black"
            onClick={onRouteChange}
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
              onClick={onRouteChange}
            >
              <FiEdit />
              Register
            </Link>
          </li>
        )}

        <li>
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-black"
            onClick={onToggleDetail}
          >
            <FiCode />
            Dev Information
            {isDetailOpen ? <FiChevronDown /> : <FiChevronRight />}
          </div>

          {isDetailOpen && (
            <ul className="mt-2 ml-6 space-y-2 text-gray-600">
              {category &&
                category.map((item, index) => (
                  <li
                    className="flex items-center justify-between"
                    key={`${category}_${index}`}
                  >
                    <Link
                      href={`/post?category=${item.name}`}
                      className="flex items-center gap-2 cursor-pointer hover:text-black"
                      onClick={onRouteChange}
                    >
                      <span>{item.name}</span>
                      {/* TODO 신규 업데이트 된 게시글 추가 */}
                      {/* <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full"></span> */}
                    </Link>
                  </li>
                ))}
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
