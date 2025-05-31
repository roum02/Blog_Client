"use client";

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
import Image from "next/image";
import { useAuthStore } from "@blog-client-store/useAuthStore";
import { useMemo } from "react";

type SideNavProps = {
  isOpen: boolean;
  isDetailOpen: boolean;
  onToggleDetail: () => void;
  category?: Category[];
  onRouteChange?: () => void;
  profileImage?: string;
  nickname?: string;
};

const PROFILE_IMAGES = [
  "https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg",
  "https://i.pinimg.com/originals/20/e8/0d/20e80d9ccf4e7c7a68539771b0cae3c3.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2-pg1Dy7Lbs1U-l9uL_gbYNtlrMzMN0mDgJDzexObokS1SxE7ad0G6JdiehmjBMVtYTw&usqp=CAU",
  "https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBeUdv9BYhLSfucfygpsTvLfSZHAJQ3lEhqPKlRcf9fkIlCJljY0mwtuIGNJpqhDqtuPU&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2-pg1Dy7Lbs1U-l9uL_gbYNtlrMzMN0mDgJDzexObokS1SxE7ad0G6JdiehmjBMVtYTw&usqp=CAU",
  "https://i.pinimg.com/236x/48/06/65/4806655144635765866e5b1361d4a9c0.jpg",
];

const GUEST_PROFILE_IMAGE =
  "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800";

export default function SideNav({
  isOpen,
  isDetailOpen,
  onToggleDetail,
  category,
  onRouteChange,
  nickname = "Guest",
}: SideNavProps) {
  const { user } = useAuthStore();
  const getProfileImageByUserId = (userId?: string): string => {
    if (!userId) {
      return GUEST_PROFILE_IMAGE;
    }
    const index =
      Array.from(userId).reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      PROFILE_IMAGES.length;
    return PROFILE_IMAGES[index];
  };

  const profileImage = useMemo(
    () => getProfileImageByUserId(user?.memberId),
    [user]
  );

  return (
    <aside
      className={`fixed top-14 left-0 w-60 h-full bg-gray-100 border-r border-gray-300 p-4 transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <ProfileContent
        profileImage={profileImage}
        nickname={user?.memberNickName || nickname}
      />

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

        {user?.memberType === "ADMIN" && (
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
  profileImage: string;
  nickname?: string;
}) => {
  return (
    <div className="flex items-center gap-3 mb-6 px-2">
      <Image
        src={profileImage}
        width={150}
        height={150}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover border"
      />
      <div className="text-sm font-medium text-gray-800">{nickname}</div>
    </div>
  );
};
