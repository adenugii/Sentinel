import { NAV_LINKS } from "@/core/constants";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Kiri: Logo & Nav Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Sentinel
            </Link>
            <div className="hidden md:flex space-x-6">
              {/* Hapus link "Produk" dan "Tentang Kami" agar sesuai gambar */}
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Beranda
              </Link>
              <Link href="/smartphones" className="text-gray-500 hover:text-gray-900">
                Produk
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900">
                Tentang Kami
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900">
                Kontak
              </Link>
            </div>
          </div>

          {/* Kanan: Search, Cart, Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Cari produk..."
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            
            <button className="text-gray-500 hover:text-gray-900 p-2 rounded-full relative">
              <ShoppingCart />
              <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
            
            {/* Tombol Login/Daftar Sesuai Desain Baru */}
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-800"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;