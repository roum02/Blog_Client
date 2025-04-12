"use client";

import { useState } from "react";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import { useCategories } from "@blog-client-query";

export default function NavWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: categoryData } = useCategories();

  return (
    <>
      <TopNav onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <SideNav
        isOpen={isSidebarOpen}
        isAdmin={true}
        onRouteChange={() => setIsSidebarOpen(false)}
        category={categoryData}
      />

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40"
        />
      )}

      <main className={`pt-14 transition-all duration-300 `}>{children}</main>
    </>
  );
}
