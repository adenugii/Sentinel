'use client'; // Karena menggunakan QuantityStepper & tombol Hapus

import { CartItem } from "@/core/entities/cart";
import Image from "next/image";
import QuantityStepper from "@/components/ui/QuantityStepper";

// Fungsi helper untuk format Rupiah
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
  // onQuantityChange: (id: string, newQuantity: number) => void;
}

export default function CartItemCard({ item, onRemove }: CartItemCardProps) {
  // TODO: Hubungkan QuantityStepper dengan state di CartClient
  // Untuk saat ini, QuantityStepper me-manage state-nya sendiri

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Gambar */}
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={100}
          height={100}
          className="rounded-md bg-gray-100 object-contain self-center"
        />

        {/* Info Produk */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.details}</p>
          <p className="text-lg font-bold text-gray-800 mt-2 md:hidden">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>

        {/* Kuantitas & Harga (Desktop) */}
        <div className="flex flex-col md:items-end justify-between">
          <p className="text-xl font-bold text-gray-900 hidden md:block">
            {formatCurrency(item.price * item.quantity)}
          </p>
          <div className="flex items-center justify-between mt-4 md:mt-0">
            <QuantityStepper initialValue={item.quantity} />
            <button
              onClick={() => onRemove(item.id)}
              className="ml-4 text-sm font-medium text-red-600 hover:text-red-800"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}