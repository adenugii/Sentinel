import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sentinel - Gawai Resmi, Garansi Aman",
  description: "Marketplace Gawai Resmi dengan jaminan garansi digital aman di blockchain.",
};

// Layout ini hanya berisi HTML dan BODY
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* Navbar dan Footer sudah tidak ada di sini */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}