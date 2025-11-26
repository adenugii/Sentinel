import Image from "next/image";
import Link from "next/link";
import { Calendar, Shield } from "lucide-react";
import { WarrantyItem } from "@/core/services/warrantyService";
import { format } from "date-fns"; // Opsional: jika mau format tanggal cantik, atau pakai Intl

// Helper Format Tanggal Indonesia
const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric"
  });
};

interface WarrantyCardProps {
  product: WarrantyItem;
}

export default function WarrantyCard({ product }: WarrantyCardProps) {
  // Logic Gambar: Ambil index 0 jika array
  const imageUrl = Array.isArray(product.product_image) && product.product_image.length > 0
    ? product.product_image[0]
    : "https://placehold.co/200x200?text=No+Image";

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 border border-gray-100 hover:border-blue-200 transition-colors">
      {/* Image */}
      <div className="flex-shrink-0 relative w-24 h-24">
        <Image
          src={imageUrl}
          alt={product.product_name}
          fill
          className="rounded-md object-contain"
        />
      </div>
      
      {/* Info */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl font-semibold text-gray-900">{product.product_name}</h3>
        
        {/* Status Badge Kecil */}
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 mb-2 ${
          product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {product.status === 'active' ? 'Active' : 'Expired'}
        </span>

        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p className="flex items-center justify-center md:justify-start">
            <Calendar className="w-4 h-4 mr-2" />
            Dibeli pada: {formatDate(product.purchase_timestamp)}
          </p>
          <p className="flex items-center justify-center md:justify-start font-medium text-green-600">
            <Shield className="w-4 h-4 mr-2" />
            Garansi Aktif hingga: {formatDate(product.expiry_date)}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex-shrink-0">
        <Link
          href={`/account/warranties/${product.id}`}
          className="bg-white text-blue-700 border border-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors inline-block"
        >
          Lihat Detail Sertifikat
        </Link>
      </div>
    </div>
  );
}