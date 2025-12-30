'use client';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Jika loading selesai DAN user tidak ada (belum login)
    if (!isLoading && !user) {
      router.push('/login'); // Redirect ke login
    }
  }, [user, isLoading, router]);

  // Tampilkan loading screen sederhana saat mengecek status auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  // Jika user belum login, jangan render apa-apa (tunggu redirect)
  if (!user) return null;

  // Jika user ada, tampilkan halaman aslinya
  return <>{children}</>;
}