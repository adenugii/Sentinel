'use client'; 

import { Search, ShoppingCart, User, LogOut, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Bagian Kiri: Logo & Link Utama */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
               Sentinel
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                Beranda
              </Link>
              <Link href="/products" className="text-gray-500 hover:text-gray-900 transition-colors">
                Produk
              </Link>
              <Link href="/faq" className="text-gray-500 hover:text-gray-900 transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Bagian Kanan: Search, Cart, Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Cari produk..."
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            
            {/* Tombol Keranjang */}
            <Link href="/cart" className="text-gray-500 hover:text-gray-900 p-2 rounded-full relative transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Link>
            
            {/* LOGIKA AUTHENTICATION */}
            {user ? (
              // TAMPILAN SETELAH LOGIN: Avatar & Dropdown
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-700 focus:outline-none"
                >
                  {/* AVATAR PLACEHOLDER (DISAMAKAN DENGAN SIDEBAR) */}
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 overflow-hidden">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  {/* Nama user ditampilkan (hidden di mobile) */}
                  <span className="hidden md:block max-w-[100px] truncate">{user.name}</span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50">
                    {/* Info User Kecil di Dropdown */}
                    <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-500">Login sebagai</p>
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                    </div>
                    
                    {/* Menu Links */}
                    <Link 
                        href="/account/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-700 flex items-center"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        <User className="w-4 h-4 mr-2" /> Profil Saya
                    </Link>
                    <Link 
                        href="/account/orders" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-700 flex items-center"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        <HelpCircle className="w-4 h-4 mr-2" /> Riwayat Pesanan
                    </Link>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    {/* Tombol Logout */}
                    <button 
                      onClick={() => { logout(); setIsDropdownOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // TAMPILAN BELUM LOGIN
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;