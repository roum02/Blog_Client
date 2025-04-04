import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        <nav>navigation</nav>
        {children}
      </body>
    </html>
  );
}
