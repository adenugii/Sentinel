import { ShieldCheck, LockKeyhole, CheckCircle } from "lucide-react";

export default function TrustBarSection() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          {/* Kolom 1: 100% Resmi */}
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-green-100 p-3 mb-3">
              <ShieldCheck className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-1 text-gray-900">
              100% Resmi
            </h3>
            <p className="text-gray-600">
              Semua produk dijamin orisinalitasnya dari distributor resmi.
            </p>
          </div>

          {/* Kolom 2: Garansi Digital */}
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-green-100 p-3 mb-3">
              <LockKeyhole className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-1 text-gray-900">
              Garansi Digital Anti Hilang
            </h3>
            <p className="text-gray-600">
              Bukti pembelian Anda kami jaga keamanannya di blockchain.
            </p>
          </div>

          {/* Kolom 3: Terverifikasi */}
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-green-100 p-3 mb-3">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-1 text-gray-900">
              Terverifikasi Blockchain
            </h3>
            <p className="text-gray-600">
              Teknologi tepercaya menjamin keabsahan garansi Anda.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}