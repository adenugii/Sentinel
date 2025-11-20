import { Award, Send, Lock } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Semudah 1-2-3
        </h2>
        
        {/* Kontainer untuk 3 langkah */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Langkah 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
              <Award className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              1. Beli Gawai Resmi
            </h3>
            <p className="text-gray-600">
              Semua gawai di Sentinel 100% dijamin resmi dari mitra terverifikasi.
            </p>
          </div>

          {/* Langkah 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
              <Send className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              2. Sertifikat Otomatis Terbit
            </h3>
            <p className="text-gray-600">
              Setelah pesanan Anda selesai, kami otomatis menerbitkan Sertifikat Garansi Digital ke Garasi Gawai Anda.
            </p>
          </div>

          {/* Langkah 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
              <Lock className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              3. Aman Anti Hilang
            </h3>
            <p className="text-gray-600">
              Sertifikat Anda (bukti tanggal beli) dicatat di blockchain. Anti hilang, dan siap ditunjukkan di service center kapanpun.
            </p>
          </div>
          
        </div>

        {/* Angka dengan garis penghubung */}
        <div className="mt-10 flex items-center justify-center max-w-2xl mx-auto">
          {/* Angka 1 */}
          <div className="w-12 h-12 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
            1
          </div>
          
          {/* Garis 1 ke 2 */}
          <div className="flex-1 h-1 bg-[#10B981] mx-4"></div>
          
          {/* Angka 2 */}
          <div className="w-12 h-12 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
            2
          </div>
          
          {/* Garis 2 ke 3 */}
          <div className="flex-1 h-1 bg-[#10B981] mx-4"></div>
          
          {/* Angka 3 */}
          <div className="w-12 h-12 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
            3
          </div>
        </div>
      </div>
    </section>
  );
}