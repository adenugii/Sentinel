import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom 1: Logo & Desc */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">SENTINEL</h2>
            <p className="text-sm">
              Marketplace Gawai Resmi dengan jaminan garansi digital aman di
              blockchain.
            </p>
            <p className="text-xs mt-4">
              © 2024 Sentinel. All rights reserved.
            </p>
          </div>

          {/* Kolom 2: Kategori */}
          <div>
            <h3 className="text-white font-semibold mb-3">Kategori</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/smartphones" className="hover:text-white">Smartphones</Link></li>
              <li><Link href="/laptops" className="hover:text-white">Laptops</Link></li>
              <li><Link href="/wearables" className="hover:text-white">Wearables</Link></li>
              <li><Link href="/audio" className="hover:text-white">Audio</Link></li>
              <li><Link href="/tablets" className="hover:text-white">Tablets</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Bantuan */}
          <div>
            <h3 className="text-white font-semibold mb-3">Bantuan</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">Cara Kerja Sentinel</Link></li>
              <li><Link href="/contact" className="hover:text-white">Hubungi Kami</Link></li>
              <li><Link href="/terms" className="hover:text-white">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Media Sosial */}
          <div>
            <h3 className="text-white font-semibold mb-3">Media Sosial</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white"><Twitter /></Link>
              <Link href="#" className="hover:text-white"><Facebook /></Link>
              <Link href="#" className="hover:text-white"><Instagram /></Link>
              <Link href="#" className="hover:text-white"><Youtube /></Link>
            </div>
            <p className="text-sm mt-4">
              Ikuti kami untuk info gawai terbaru dan penawaran spesial.
            </p>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-white">Ketentuan Privasi</Link>
            <Link href="/terms" className="hover:text-white">Syarat & Ketentuan</Link>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            {/* Ganti dengan icon blockchain jika ada */}
            <span className="w-4 h-4 bg-blue-500 rounded-full inline-block"></span> 
            <span>Dilindungi Teknologi Blockchain</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;