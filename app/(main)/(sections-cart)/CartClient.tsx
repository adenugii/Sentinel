'use client';

import { useState } from "react";
import { CartItem } from "@/core/entities/cart";
import CartItemCard from "./CartItemCard";
import Link from "next/link";

// Fungsi helper untuk format Rupiah
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

interface CartClientProps {
  initialItems: CartItem[];
}

export default function CartClient({ initialItems }: CartClientProps) {
  const [items, setItems] = useState(initialItems);

  const handleRemove = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // TODO: handleQuantityChange

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 0; // Sesuai desain
  const total = subtotal - discount;

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Keranjang Saya</h1>
        
        {items.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold">Keranjang Anda Kosong</h2>
            <p className="text-gray-600 mt-2 mb-6">
              Sepertinya Anda belum menambahkan gawai apapun ke keranjang.
            </p>
            <Link
              href="/smartphones"
              className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-800"
            >
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Kolom Kiri: Daftar Item */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Kolom Kanan: Ringkasan Pesanan */}
            <aside className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Diskon</span>
                    <span>{formatCurrency(discount)}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Biaya pengiriman akan dihitung saat checkout.
                  </p>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg text-gray-900">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 block w-full bg-green-500 text-white text-center font-semibold py-3 rounded-full hover:bg-green-600 transition-colors"
                >
                  Lanjut ke Checkout
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}