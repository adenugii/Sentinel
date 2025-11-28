'use client';

import { ShieldCheck, Lock, Loader2 } from "lucide-react";
import Image from "next/image";
import { CartItem } from "@/core/entities/cart";

const formatCurrency = (value: number | string) => {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface OrderSummaryProps {
  items: CartItem[];
  onPay: () => void;
  isLoading: boolean;
}

export default function OrderSummary({ items, onPay, isLoading }: OrderSummaryProps) {
  
  const subtotal = items.reduce((acc, item) => {
    return acc + (parseFloat(item.price) * item.quantity);
  }, 0);

  const shipping = 0; 
  const total = subtotal + shipping;

  return (
    <aside className="lg:col-span-1">
      {/* Sticky Container */}
      <div className="sticky top-24 space-y-6">
        
        {/* CARD RINGKASAN */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Ringkasan Pesanan
          </h2>
          
          {/* List Item dengan Gambar */}
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 mb-6">
            {items.map((item) => {
                // Logic gambar aman
                const imgUrl = Array.isArray(item.image) && item.image.length > 0 
                    ? item.image[0] 
                    : (typeof item.image === 'string' ? item.image : "https://placehold.co/100x100");

                return (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-14 h-14 bg-gray-50 rounded-md overflow-hidden border border-gray-100 flex-shrink-0">
                        <Image 
                            src={imgUrl} 
                            alt={item.name} 
                            fill 
                            className="object-contain p-1"
                        />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                          {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.quantity} x {formatCurrency(item.price)}
                      </p>
                      {/* VARIAN DIHAPUS DARI SINI */}
                    </div>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                        {formatCurrency(parseFloat(item.price) * item.quantity)}
                    </div>
                  </div>
                );
            })}
          </div>

          {/* Rincian Biaya */}
          <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal Produk</span>
              <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Biaya Pengiriman</span>
              <span className="text-green-600 font-bold">Gratis</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Biaya Layanan</span>
              <span className="text-gray-900">Rp 0</span>
            </div>
          </div>

          {/* Total Akhir */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
            <span className="text-base font-bold text-gray-900">Total Pembayaran</span>
            <span className="text-xl font-bold text-blue-700">{formatCurrency(total)}</span>
          </div>

          {/* Tombol Bayar */}
          <button 
            className={`
                mt-6 w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-700/20
                ${isLoading ? 'bg-blue-400 cursor-wait' : 'bg-blue-700 hover:bg-blue-800'}
            `}
            onClick={onPay}
            disabled={isLoading || items.length === 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" /> Bayar Sekarang
              </>
            )}
          </button>
        </div>

        {/* Jaminan Keamanan */}
        <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3 text-blue-800 border border-blue-100">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <p className="text-xs leading-snug">
                <strong>Pembayaran Aman & Terenkripsi.</strong> Data Anda dilindungi oleh sistem keamanan standar perbankan.
            </p>
        </div>

      </div>
    </aside>
  );
}