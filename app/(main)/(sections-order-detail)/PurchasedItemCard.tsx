import { TransactionItem } from "@/core/services/orderService";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
};

interface PurchasedItemCardProps {
  item: TransactionItem;
}

export default function PurchasedItemCard({ item }: PurchasedItemCardProps) {
  // Ambil gambar pertama dari array
  const imageSrc = (item.product_image && item.product_image.length > 0) 
    ? item.product_image[0] 
    : "https://placehold.co/100x100";

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center">
        {/* Gambar & Info */}
        <div className="flex items-center space-x-4 flex-1 mb-4 md:mb-0">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={imageSrc}
              alt={item.product_name}
              fill
              className="rounded-md bg-gray-50 object-contain border border-gray-100"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{item.product_name}</h3>
            <p className="text-xs text-gray-500">{item.product_sku}</p>
            {/* Hardcode logic garansi sentinel (biasanya semua produk di sini eligible) */}
            <span className="flex items-center text-xs text-green-600 font-medium mt-1">
               <CheckCircle className="w-3 h-3 mr-1" />
               Dilindungi Garansi Sentinel
            </span>
          </div>
        </div>

        {/* Detail Harga */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-right md:text-left">
          <div>
            <p className="text-gray-500 mb-1">Harga Unit</p>
            <p className="font-medium text-gray-900">{formatCurrency(item.unit_price)}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Jumlah</p>
            <p className="font-medium text-gray-900">x{item.quantity}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 mb-1">Subtotal</p>
            <p className="font-bold text-gray-900">{formatCurrency(item.subtotal)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}