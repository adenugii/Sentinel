'use client'; // Kita butuh client component untuk 'usePathname'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListOrdered, Shield, LogOut, User } from "lucide-react";

export default function AccountSidebar() {
  const pathname = usePathname();

  // Mock data user
  const user = {
    name: "Ahmad Ridwan",
    email: "ahmad.ridwan@email.com",
    avatarUrl: "/images/avatar-placeholder.png", // Ganti dengan path avatar
  };

  const navLinks = [
    {
      href: "/account/profile", // <-- LINK BARU
      label: "Profil Saya",
      icon: User,
    },
    {
      href: "/account/orders", // <-- Rute untuk halaman ini
      label: "Riwayat Pesanan", // <-- Bahasa Indonesia
      icon: ListOrdered,
    },
    {
      href: "/account/warranties", // <-- Rute halaman sebelumnya
      label: "Garasi Gawai Saya", // <-- Bahasa Indonesia
      icon: Shield,
    },
  ];

  return (
    <aside className="bg-white p-6 rounded-lg shadow-sm w-full">
      {/* Profil User */}
      <div className="flex items-center space-x-3 mb-6">
        {/* <Image
          src={user.avatarUrl}
          alt="Avatar"
          width={48}
          height={48}
          className="rounded-full"
        /> */}

        {/* GANTI SEMENTARA DENGAN DIV INI */}
        <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
        
        <div>
          <h3 className="font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Navigasi Akun */}
      <nav className="space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href; // Gunakan '===' untuk match
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-md font-medium
                transition-colors
                ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Tombol Keluar */}
      <div className="border-t border-gray-200 mt-6 pt-6">
        <button className="flex items-center space-x-3 text-red-600 hover:text-red-800 w-full px-4 py-3">
          <LogOut className="w-5 h-5" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}