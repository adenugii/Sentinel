'use client';

import { Shield, Lock, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { CartItem } from "@/core/entities/cart";

// Helper Format Rupiah
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
  
  // Hitung Subtotal (Pastikan price di-parse jadi float)
  const subtotal = items.reduce((acc, item) => {
    return acc + (parseFloat(item.price) * item.quantity);
  }, 0);

  // Perhitungan sederhana
  const shipping = 0; 
  const tax = subtotal * 0.11; // PPN 11%
  const total = subtotal + shipping + tax;

  return (
    <aside className="lg:col-span-1">
      <div className="bg-gray-100 p-6 rounded-lg sticky top-24">
        <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
        
        {/* List Item */}
        <div className="space-y-4 max-h-60 overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-gray-300">
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-3 text-sm">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {/* Tampilkan varian jika berupa array atau string */}
                  {Array.isArray(item.memory) ? item.memory[0] : item.memory} • {item.quantity}x
                </p>
              </div>
              <span className="font-medium text-gray-700 whitespace-nowrap">
                {formatCurrency(parseFloat(item.price) * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Kalkulasi Harga */}
        <div className="border-t border-gray-300 pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Biaya Pengiriman</span>
            <span className="text-green-600 font-medium">Gratis</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Pajak (11%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          
          <div className="border-t border-gray-300 pt-3 mt-2">
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Tombol Bayar */}
        <div className="mt-6">
          <Button 
            variant="primary" 
            className="w-full text-lg py-3 flex justify-center items-center gap-2 shadow-lg shadow-blue-700/20"
            onClick={onPay}
            disabled={isLoading || items.length === 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" /> Bayar Sekarang
              </>
            )}
          </Button>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
             <Shield className="w-3 h-3" />
             <span>Enkripsi 256-bit SSL Aman</span>
          </div>
        </div>
      </div>
    </aside>
  );
}