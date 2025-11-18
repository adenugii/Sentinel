import { OrderItem } from "@/core/entities/order";
import { CheckCircle } from "lucide-react"; // Ganti jika icon tidak ada, misal 'CheckCircle'
import Image from "next/image";

// Helper untuk format Rupiah
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

interface PurchasedItemCardProps {
  item: OrderItem;
}

export default function PurchasedItemCard({ item }: PurchasedItemCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Barang yang Dibeli</h2>
      
      <div className="flex flex-col md:flex-row md:items-center">
        {/* Gambar & Info Produk */}
        <div className="flex items-center space-x-4 flex-1 mb-4 md:mb-0">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={64}
            height={64}
            className="rounded-md bg-gray-100 object-contain"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            {item.isEligible && (
              <span className="flex items-center text-xs text-blue-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-1" /> {/* Ganti ikon jika perlu */}
                Memenuhi Syarat Garansi Digital Sentinel
              </span>
            )}
          </div>
        </div>

        {/* Detail (Model, Qty, Harga) - Buat responsif */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Model</p>
            <p className="font-medium text-gray-900">{item.model}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Kuantitas</p>
            <p className="font-medium text-gray-900">{item.quantity}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Harga Unit</p>
            <p className="font-medium text-gray-900">{formatCurrency(item.unitPrice)}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Subtotal</p>
            <p className="font-medium text-gray-900">{formatCurrency(item.subtotal)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}