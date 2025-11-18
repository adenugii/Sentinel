import Image from "next/image";
import Link from "next/link";
import { Calendar, Shield } from "lucide-react";

interface WarrantyCardProps {
  product: {
    name: string;
    imageUrl: string;
    purchaseDate: string;
    expiryDate: string;
    detailUrl: string; // URL to the certificate detail page
  };
}

export default function WarrantyCard({ product }: WarrantyCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      {/* Image */}
      <div className="flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={100}
          height={100}
          className="rounded-md object-contain"
        />
      </div>
      
      {/* Info */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p className="flex items-center justify-center md:justify-start">
            <Calendar className="w-4 h-4 mr-2" />
            Dibeli pada: {product.purchaseDate} {/* <-- DIUBAH */}
          </p>
          <p className="flex items-center justify-center md:justify-start font-medium text-green-600">
            <Shield className="w-4 h-4 mr-2" />
            Garansi Aktif hingga: {product.expiryDate} {/* <-- DIUBAH */}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex-shrink-0">
        <Link
          href={product.detailUrl}
          className="bg-white text-blue-700 border border-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-50"
        >
          Lihat Detail Sertifikat {/* <-- DIUBAH */}
        </Link>
      </div>
    </div>
  );
}