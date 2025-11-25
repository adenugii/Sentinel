'use client';

import { CartItem } from "@/core/entities/cart";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";

const formatCurrency = (value: number | string) => {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: number) => void;
  onUpdateQuantity: (type: 'increase' | 'decrease') => void;
  disabled: boolean;
}

export default function CartItemCard({ item, onRemove, onUpdateQuantity, disabled }: CartItemCardProps) {
  
  // LOGIKA VALIDASI GAMBAR YANG ROBUST
  const getValidImage = (img: string | string[] | undefined) => {
    // 1. Jika Array (Format Baru), ambil yang pertama
    if (Array.isArray(img)) {
      return img.length > 0 ? img[0] : "";
    }
    // 2. Jika String (Format Lama), kembalikan langsung
    if (typeof img === 'string') {
      return img;
    }
    // 3. Default kosong
    return "";
  };

  const rawImage = getValidImage(item.image);
  const isValidUrl = rawImage && rawImage.trim() !== "";
  
  // Gunakan Placeholder jika URL tidak valid
  const finalImage = isValidUrl ? rawImage : "https://placehold.co/200x200?text=No+Image";

  const [imgSrc, setImgSrc] = useState(finalImage);

  // Pastikan state gambar terupdate jika props item berubah
  useEffect(() => {
    setImgSrc(finalImage);
  }, [finalImage]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
        
        {/* Gambar */}
        <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden border border-gray-100">
          <Image
            src={imgSrc} 
            alt={item.name}
            fill
            className="object-contain p-2"
            sizes="96px"
            // Fallback jika gambar gagal dimuat (404)
            onError={() => setImgSrc("https://placehold.co/200x200?text=Error")}
          />
        </div>

        {/* Info Produk */}
        <div className="flex-1 text-center sm:text-left w-full">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
          
          {/* Tampilkan varian jika berupa array (ambil pertama) atau string */}
          <p className="text-sm text-gray-500 mt-1">
            {Array.isArray(item.memory) ? item.memory[0] : item.memory} • 
            {Array.isArray(item.color) ? item.color[0] : item.color}
          </p>
          
          <p className="text-blue-700 font-bold mt-2 sm:hidden">
             {formatCurrency(parseFloat(item.price) * item.quantity)}
          </p>
        </div>

        {/* Controls (Qty & Remove) */}
        <div className="flex flex-col items-center sm:items-end justify-between gap-4 w-full sm:w-auto">
          {/* Harga Desktop */}
          <p className="text-lg font-bold text-gray-900 hidden sm:block">
             {formatCurrency(parseFloat(item.price) * item.quantity)}
          </p>

          <div className="flex items-center gap-4">
            {/* Stepper Manual */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => onUpdateQuantity('decrease')}
                disabled={disabled || item.quantity <= 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="w-10 text-center text-sm font-medium text-gray-900 select-none">
                {item.quantity}
              </span>
              
              <button
                onClick={() => onUpdateQuantity('increase')}
                disabled={disabled}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 text-gray-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Tombol Hapus */}
            <button
              onClick={() => onRemove(item.id)}
              disabled={disabled}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
              title="Hapus item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}