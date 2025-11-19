import { Search, ShoppingCart, HelpCircle } from "lucide-react"; // Tambah icon HelpCircle untuk FAQ
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Kiri: Logo & Nav Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
               {/* Logo Sentinel (Optional Icon) */}
               Sentinel
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                Beranda
              </Link>
              
              {/* UPDATE LINK INI */}
              <Link href="/products" className="text-gray-500 hover:text-gray-900 transition-colors">
                Produk
              </Link>

              <Link href="/faq" className="text-gray-500 hover:text-gray-900 transition-colors">
                FAQ
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
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            
            {/* Tombol Keranjang (Link ke /cart) */}
            <Link href="/cart" className="text-gray-500 hover:text-gray-900 p-2 rounded-full relative transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                3 {/* Mock jumlah item, sesuaikan dengan state cart nanti */}
              </span>
            </Link>
            
            {/* Tombol Login/Daftar */}
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;