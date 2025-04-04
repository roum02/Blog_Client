import type { Metadata } from "next";
import "./globals.css";
import { SideNav, TopNav, NavWrapper } from "@blog-client-components";

export const metadata: Metadata = {
  title: "Blog client",
  description: "Blog client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-0 bg-white">
        <NavWrapper>
          <main className={`pt-4 transition-all duration-300`}>{children}</main>
        </NavWrapper>
      </body>
    </html>
  );
}
