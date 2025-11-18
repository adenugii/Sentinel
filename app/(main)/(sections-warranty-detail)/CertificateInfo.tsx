import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface CertificateInfoProps {
  product: {
    name: string;
    model: string;
    purchasedFrom: string;
    purchaseDate: string;
    warrantyPeriod: string; // Ex: "1 Year (Expires on 3 November 2026)"
    imageUrl: string;
  };
  transaction: {
    id: string;
    certificateId: string;
  };
}

export default function CertificateInfo({ product, transaction }: CertificateInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Badge Verifikasi */}
      <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
        <CheckCircle2 className="w-5 h-5 mr-2" />
        <span className="font-semibold text-sm">Terverifikasi oleh Sentinel</span>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
        {/* Gambar Produk */}
        <div className="flex-shrink-0">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={120}
            height={120}
            className="rounded-md object-contain"
          />
        </div>

        {/* Detail Produk & Garansi */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
            <p className="text-sm">
              <span className="font-medium">Model Produk:</span> {product.model}
            </p>
            <p className="text-sm">
              <span className="font-medium">Dibeli Dari:</span> {product.purchasedFrom}
            </p>
            <p className="text-sm">
              <span className="font-medium">Tanggal Pembelian:</span> {product.purchaseDate}
            </p>
            <p className="text-sm">
              <span className="font-medium">Periode Garansi:</span> {product.warrantyPeriod}
            </p>
          </div>
        </div>
      </div>

      {/* Detail Transaksi (di bawah produk) */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600">ID Transaksi</p>
            <p className="font-mono text-gray-900 font-semibold">{transaction.id}</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Terverifikasi di Blockchain
          </button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">ID Sertifikat</p>
          <p className="font-mono text-gray-900 font-semibold">{transaction.certificateId}</p>
        </div>
      </div>
    </div>
  );
}