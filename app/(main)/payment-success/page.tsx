import { CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  // Navbar dan Footer sudah otomatis ditangani oleh app/layout.tsx

  return (
    // Kita gunakan bg-white sesuai desain, bukan bg-gray-50 dari layout
    <div className="bg-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          
          {/* 1. Ikon Centang Hijau */}
          <div className="bg-green-500 rounded-full p-5 mb-6">
            {/* Saya gunakan 'CheckCircle2' dari lucide-react.
              Ganti dengan ikon centang tebal jika Anda punya.
            */}
            <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={1.5} />
          </div>

          {/* 2. Teks Utama */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Pembayaran Berhasil!
          </h1>
          <p className="text-gray-600 max-w-md mb-8">
            Terima kasih, pesanan Anda (No. SEN-123456) telah kami terima dan sedang diproses.
          </p>

          {/* 3. Kotak Info Garansi */}
          <div className="bg-green-50 border border-green-300 rounded-lg p-4 flex items-start space-x-3 text-left mb-8 w-full">
            <ShieldCheck className="w-8 h-8 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-800">
                Garansi Digital Anda Sedang Disiapkan
              </h4>
              <p className="text-sm text-green-700">
                Setelah pesanan ini selesai dan diterima, Sertifikat Garansi 
                Digital Anda akan di halaman 'Garasi Gawai' 
                <span className="font-bold"> otomatis diterbitkan</span>. 
                Anda tidak perlu menyimpan nota fisik.
              </p>
            </div>
          </div>

          {/* 4. Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link
              href="/account/orders" // Link ke Riwayat Pesanan
              className="w-full bg-green-500 text-white text-center font-semibold py-3 rounded-full hover:bg-green-600 transition-colors"
            >
              Lihat Riwayat Pesanan
            </Link>
            <Link
              href="/" // Link ke Beranda
              className="w-full bg-white text-gray-700 border border-gray-300 text-center font-semibold py-3 rounded-full hover:bg-gray-50 transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}