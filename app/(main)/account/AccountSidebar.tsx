'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, ShoppingBag, ShieldCheck, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { userService, UserProfile } from "@/core/services/userService";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const MENU_ITEMS = [
  { label: "Profil Saya", href: "/account/profile", icon: User },
  { label: "Riwayat Pesanan", href: "/account/orders", icon: ShoppingBag },
  { label: "Garansi Gawai Saya", href: "/account/warranties", icon: ShieldCheck },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userService.getProfile();
        setUser(data);
      } catch (error) {
        console.error("Gagal load sidebar user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    const confirm = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirm) {
      logout();
      router.push("/login");
    }
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
      
      {/* CARD USER PROFILE */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4 mb-6">
          {/* Avatar / Placeholder */}
          <div className="relative w-12 h-12 flex-shrink-0 rounded-full bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center">
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            ) : user?.profile_picture ? (
              <Image 
                src={user.profile_picture}
                alt="Profile"
                fill
                className="object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              // PLACEHOLDER KONSISTEN
              <User className="w-6 h-6 text-gray-400" />
            )}
            
            {/* Fallback layer agar icon tetap muncul jika Image error/loading */}
            {user?.profile_picture && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 -z-10">
                  <User className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>

          <div className="overflow-hidden">
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            ) : (
              <>
                <h3 className="font-bold text-gray-900 truncate">
                  {user?.name || "Pengguna"}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {user?.email || "-"}
                </p>
              </>
            )}
          </div>
        </div>

        {/* MENU NAVIGASI */}
        <nav className="space-y-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? "bg-blue-700 text-white shadow-md shadow-blue-700/20" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-white" : "text-gray-500"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 mt-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Keluar
          </button>
        </div>
      </div>
    </aside>
  );
}