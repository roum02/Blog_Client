"use client";

import { useState } from "react";
import TopNav from "../TopNav";
import SideNav from "../SideNav";

export default function NavWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <TopNav onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <SideNav isOpen={isSidebarOpen} />
      <main
        className={`pt-14 transition-all duration-300 ${
          isSidebarOpen ? "ml-48" : ""
        }`}
      >
        {children}
      </main>
    </>
  );
}
