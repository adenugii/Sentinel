import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // <-- Import AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sentinel - Gawai Resmi, Garansi Aman",
  description: "Marketplace Gawai Resmi dengan jaminan garansi digital aman di blockchain.",
  icons: {
    icon: "/icon.png", // Pastikan file logo.png ada di folder 'public'
    // Opsional: Icon khusus Apple
    apple: "/apple-icon.png", 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Bungkus seluruh aplikasi dengan AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}