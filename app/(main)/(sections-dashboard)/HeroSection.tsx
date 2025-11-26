import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* BACKGROUND IMAGE (FIXED)
        - fixed: Membuat gambar 'menempel' di viewport (layar) dan tidak ikut bergerak saat scroll.
        - inset-0: Memenuhi seluruh layar.
        - -z-10: Memastikan gambar berada di lapisan paling belakang.
      */}
      <div className="fixed inset-0 w-full h-full -z-10">
        {/* Layer Warna Dasar (mencegah flash putih sebelum gambar load) */}
        <div className="absolute inset-0 bg-[#0E182D]" />
        
        <Image
          src="/images/hero-bg.png"
          alt="Hero background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-40"
          priority
        />
        
        {/* Gradient Overlay untuk keterbacaan teks */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E182D]/50 via-transparent to-[#0E182D]"></div>
      </div>

      {/* CONTENT 
         - relative z-10: Agar teks berada di atas background dan tetap ikut scroll (normal flow).
      */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-2xl">
          Gawai Resmi. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Garansi Aman Selamanya.
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
          Sentinel mengamankan bukti pembelian Anda dengan teknologi
          <span className="font-semibold text-white mx-1">Blockchain</span>. 
          Ucapkan selamat tinggal pada nota fisik yang mudah hilang.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/products"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all hover:scale-105 shadow-lg shadow-green-500/30"
          >
            Belanja Sekarang
          </Link>
          <Link
            href="/faq"
            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all"
          >
            Pelajari Cara Kerja
          </Link>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-10 h-10 text-white/70" />
      </div>

    </section>
  );
};

export default HeroSection;