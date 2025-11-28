'use client';

import { ShieldCheck, CheckCircle, Wifi } from "lucide-react";
import Image from "next/image";

export default function AuthGraphic() {
  return (
    <div className="relative flex-1 hidden lg:flex flex-col justify-between h-full bg-[#0E182D] text-white p-12 overflow-hidden">
      
      {/* 1. BACKGROUND DENGAN ANIMASI HALUS */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/auth-bg.png"
          alt="Auth background"
          fill 
          style={{ objectFit: "cover" }} 
          // PERUBAHAN: Opacity dinaikkan jadi 50 agar lebih terlihat
          className="opacity-50"
          priority 
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E182D] via-[#0E182D]/60 to-transparent"></div>
        
        {/* Animated Ambient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>
      
      {/* 2. KONTEN ATAS: LOGO */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="bg-green-500/10 p-2.5 rounded-xl backdrop-blur-sm border border-green-500/20 shadow-lg shadow-green-900/20">
            <ShieldCheck className="w-6 h-6 text-green-400" />
        </div>
        <span className="text-xl font-bold tracking-wide text-white">SENTINEL</span>
      </div>

      {/* 3. KONTEN TENGAH: FLOATING CARD (LEBIH LEBAR) */}
      <div className="relative z-10 flex justify-center my-auto w-full">
        {/* Wrapper animasi float */}
        <div className="animate-[float_6s_ease-in-out_infinite] w-full flex justify-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md transform rotate-3 hover:rotate-0 transition-all duration-500 hover:shadow-green-500/20 hover:border-green-500/30 group cursor-default">
                
                {/* Header Card */}
                <div className="flex items-center gap-5 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/40 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-300 font-medium uppercase tracking-wide">Status Garansi</p>
                        <p className="text-lg font-bold text-white flex items-center gap-2">
                            Terverifikasi Aman
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                        </p>
                    </div>
                </div>

                {/* Skeleton Loader dengan Shimmer Effect */}
                <div className="space-y-4 mb-6">
                    <div className="h-3 bg-white/10 rounded-full w-3/4 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full w-1/2 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] delay-75"></div>
                    </div>
                </div>

                {/* Footer Card */}
                <div className="pt-5 border-t border-white/10 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Network</span>
                        <div className="flex items-center gap-2 mt-1">
                            <Wifi className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-medium text-green-400">Polygon PoS</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Block ID</span>
                        <p className="text-sm font-mono text-white opacity-90 group-hover:opacity-100 transition-opacity tracking-wide">#8829104AC</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 4. KONTEN BAWAH: TEKS */}
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-bold mb-3 leading-tight">
          Keamanan Gawai, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 animate-pulse">
            Abadi di Blockchain.
          </span>
        </h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
          Bergabunglah dengan ribuan pengguna yang telah mengamankan aset digital dan fisik mereka bersama Sentinel.
        </p>
      </div>

      {/* DEFINISI KEYFRAMES (Inline Style) */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

    </div>
  );
}