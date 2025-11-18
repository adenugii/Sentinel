import { Database, Clock, ShieldCheck } from "lucide-react";

export default function WhyChooseSection() {
  // Sesuai gambar, section ini memiliki latar biru tua. 
  // Saya akan gunakan 'bg-blue-800', sesuaikan jika Anda punya hex spesifik.
  return (
    <section className="bg-blue-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-12">
          Mengapa Pilih Sentinel?
        </h2>
        
        {/* Grid untuk 3 kartu putih */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Kartu 1: Keamanan Blockchain */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <Database className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Keamanan Blockchain
            </h3>
            <p className="text-gray-600">
              Data garansi tersimpan aman di blockchain, anti-manipulasi.
            </p>
          </div>

          {/* Kartu 2: Akses Kapan Saja */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <Clock className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Akses Kapan Saja
            </h3>
            <p className="text-gray-600">
              Sertifikat digital dapat diakses 24/7 dari dashboard Anda, di mana saja.
            </p>
          </div>

          {/* Kartu 3: Verifikasi Instan */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Verifikasi Instan
            </h3>
            <p className="text-gray-600">
              Service center dapat memverifikasi keaslian garansi dalam hitungan detik.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}