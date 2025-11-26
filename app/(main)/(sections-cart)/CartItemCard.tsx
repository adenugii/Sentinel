'use client';

import { CartItem } from "@/core/entities/cart";
import Image from "next/image";
import { Trash2, Minus, Plus, CheckCircle } from "lucide-react"; // Tambah icon CheckCircle
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
  
  const getValidImage = (img: string | string[] | undefined) => {
    if (Array.isArray(img)) return img.length > 0 ? img[0] : "";
    if (typeof img === 'string') return img;
    return "";
  };

  const rawImage = getValidImage(item.image);
  const isValidUrl = rawImage && rawImage.trim() !== "";
  const finalImage = isValidUrl ? rawImage : "https://placehold.co/200x200?text=No+Image";

  const [imgSrc, setImgSrc] = useState(finalImage);

  useEffect(() => {
    setImgSrc(finalImage);
  }, [finalImage]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex gap-4 sm:gap-6 group hover:border-blue-200 transition-colors">
      
      {/* Gambar */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
        <Image
          src={imgSrc} 
          alt={item.name}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 112px, 144px"
          onError={() => setImgSrc("https://placehold.co/200x200?text=Error")}
        />
      </div>

      {/* Konten Kanan */}
      <div className="flex-1 flex flex-col justify-between py-1">
        
        {/* Header Info (Lebih Berisi) */}
        <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 leading-snug">
                {item.name}
            </h3>

            {/* TAMBAHAN: SKU & Status Stok untuk mengisi ruang kosong */}
            <div className="flex items-center gap-3 text-xs">
                <span className="text-gray-500">SKU: PRD-{item.product_id || item.id}</span>
                <span className="text-gray-300">•</span>
                <span className="text-green-600 flex items-center gap-1 font-medium">
                    <CheckCircle className="w-3 h-3" /> Stok Tersedia
                </span>
            </div>

            {/* Varian Chips */}
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 pt-1">
                {(item.memory || item.color) ? (
                  <>
                    {item.memory && (
                      <span className="bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                          {Array.isArray(item.memory) ? item.memory[0] : item.memory}
                      </span>
                    )}
                    {item.color && (
                      <span className="bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200 flex items-center gap-1.5">
                          {/* Indikator warna kecil (opsional, bisa dihapus jika tidak ada mapping warna) */}
                          <span className={`w-2 h-2 rounded-full bg-gray-400`}></span> 
                          {Array.isArray(item.color) ? item.color[0] : item.color}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400 italic">Varian standar</span>
                )}
            </div>
        </div>

        {/* Footer Action (Harga & Controls) */}
        <div className="flex items-end justify-between border-t border-gray-50">
            <div>
                <p className="text-lg font-bold text-blue-700">
                    {formatCurrency(parseFloat(item.price) * item.quantity)}
                </p>
                {/* Tampilkan harga satuan jika qty > 1 */}
                {item.quantity > 1 && (
                    <p className="text-xs text-gray-500 mt-0.5">
                        {formatCurrency(item.price)} / barang
                    </p>
                )}
            </div>

            <div className="flex items-center gap-4">
                {/* Tombol Hapus */}
                <button
                    onClick={() => onRemove(item.id)}
                    disabled={disabled}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus dari keranjang"
                >
                    <Trash2 className="w-5 h-5" />
                </button>

                {/* Stepper */}
                <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm">
                    <button
                        onClick={() => onUpdateQuantity('decrease')}
                        disabled={disabled || item.quantity <= 1}
                        className="p-1.5 hover:bg-gray-100 rounded-l-lg disabled:opacity-30 text-gray-600 transition-all m-0.5 border-r border-gray-200"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-gray-900 select-none">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => onUpdateQuantity('increase')}
                        disabled={disabled}
                        className="p-1.5 hover:bg-gray-100 rounded-r-lg disabled:opacity-30 text-gray-600 transition-all m-0.5 border-l border-gray-200"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}