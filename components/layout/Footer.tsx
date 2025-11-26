import { Facebook, Twitter, Instagram, Youtube, Hexagon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-[#0B1120] text-gray-400 overflow-hidden border-t border-white/10">
      
      {/* BACKGROUND ORNAMENTS (Menyambung tema Why Choose Us) */}
      <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Kolom 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
               {/* Logo Icon Kecil */}
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                 <span className="font-bold text-lg">S</span>
               </div>
               SENTINEL
            </Link>
            <p className="text-sm leading-relaxed opacity-80">
              Marketplace Gawai Resmi pertama dengan jaminan keamanan data dan garansi digital berbasis Blockchain.
            </p>
            <div className="pt-4">
               <p className="text-xs text-gray-500">
                 © 2024 Sentinel. All rights reserved.
               </p>
            </div>
          </div>

          {/* Kolom 2: Kategori */}
          <div>
            <h3 className="text-white font-bold mb-6">Kategori</h3>
            <ul className="space-y-3 text-sm">
              {["Smartphones", "Laptops", "Wearables", "Audio", "Tablets"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Bantuan */}
          <div>
            <h3 className="text-white font-bold mb-6">Bantuan</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/faq" className="hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block">FAQ</Link></li>
              <li><Link href="/how-it-works" className="hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block">Cara Kerja</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block">Hubungi Kami</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Media Sosial */}
          <div>
            <h3 className="text-white font-bold mb-6">Ikuti Kami</h3>
            <div className="flex space-x-3 mb-6">
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, idx) => (
                <Link 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Dapatkan info promo terbaru dan update teknologi langsung di feed Anda.
            </p>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Syarat Penggunaan</Link>
          </div>
          
          <div className="flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-gray-300 flex items-center gap-1.5">
               Secured by <span className="text-white font-bold">Polygon PoS</span> <Hexagon className="w-3 h-3 text-purple-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;