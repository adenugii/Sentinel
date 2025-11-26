import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { WarrantyDetail } from "@/core/services/warrantyService";

// Helper Date
const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric"
  });
};

interface CertificateInfoProps {
  detail: WarrantyDetail;
}

export default function CertificateInfo({ detail }: CertificateInfoProps) {
  
  // Handle image jika string atau array
  const imageUrl = Array.isArray(detail.product_image) 
    ? (detail.product_image[0] || "https://placehold.co/200x200") 
    : (detail.product_image || "https://placehold.co/200x200");

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Badge Verifikasi */}
      <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6 w-fit">
        <CheckCircle2 className="w-5 h-5 mr-2" />
        <span className="font-semibold text-sm">Terverifikasi oleh Sentinel</span>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* Gambar Produk */}
        <div className="flex-shrink-0 relative w-32 h-32 bg-gray-50 rounded-md border border-gray-100">
          <Image
            src={imageUrl}
            alt={detail.product_name}
            fill
            className="rounded-md object-contain p-2"
          />
        </div>

        {/* Detail Produk & Garansi */}
        <div className="flex-1 text-center md:text-left w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{detail.product_name}</h2>
          <p className="text-gray-500 text-sm mb-4 italic">{detail.product_desc}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-gray-700">
            <p className="text-sm border-b border-gray-100 pb-2">
              <span className="font-medium block text-gray-500 text-xs uppercase tracking-wide">Model / SKU</span> 
              {detail.product_sku}
            </p>
            <p className="text-sm border-b border-gray-100 pb-2">
              <span className="font-medium block text-gray-500 text-xs uppercase tracking-wide">Pemilik</span> 
              {detail.owner_name}
            </p>
            <p className="text-sm border-b border-gray-100 pb-2">
              <span className="font-medium block text-gray-500 text-xs uppercase tracking-wide">Tanggal Pembelian</span> 
              {formatDate(detail.purchase_timestamp)}
            </p>
            <p className="text-sm border-b border-gray-100 pb-2">
              <span className="font-medium block text-gray-500 text-xs uppercase tracking-wide">Masa Berlaku</span> 
              {detail.warranty_period_months} Bulan (Hingga {formatDate(detail.expiry_date)})
            </p>
          </div>
        </div>
      </div>

      {/* Detail Transaksi */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">ID Transaksi Sentinel</p>
            <p className="font-mono text-gray-900 font-semibold text-lg">#{detail.transaction_id}</p>
          </div>
          <div>
             <p className="text-xs text-gray-500 uppercase tracking-wide">ID Garansi</p>
             <p className="font-mono text-gray-900 font-semibold text-lg">WARRANTY-{detail.id}</p>
          </div>
          
          <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold flex items-center">
             Sisa Waktu: {detail.days_remaining} Hari
          </div>
        </div>
      </div>
    </div>
  );
}