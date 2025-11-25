'use client';

import { useState, useEffect } from "react";
import { CartItem } from "@/core/entities/cart";
import CartItemCard from "./CartItemCard";
import Link from "next/link";
import { cartService } from "@/core/services/cartService";
import { Loader2 } from "lucide-react";

const formatCurrency = (value: number | string) => {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function CartClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadCart(false);
  }, []);

  const loadCart = async (isBackground = false) => {
    try {
      if (!isBackground) setIsLoading(true);
      const data = await cartService.getCartItems();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      if (!isBackground) setIsLoading(false);
    }
  };

  // LOGIKA HAPUS
  const handleRemove = async (id: number) => {
    const previousItems = [...items];

    // Optimistic Update: Hapus dari UI dengan ID yang cocok
    // (Kita filter berdasarkan product_id atau id, tergantung mana yang dikirim)
    setItems((prev) => prev.filter((item) => (item.product_id || item.id) !== id));

    try {
      // Panggil API dengan ID Produk
      await cartService.removeItem(id);
      
      // Silent Refresh
      await loadCart(true);
    } catch (error) {
      console.error("Gagal menghapus item:", error);
      setItems(previousItems); // Rollback
      alert("Gagal menghapus item. Coba lagi.");
    }
  };

  // LOGIKA QUANTITY
  const handleUpdateQuantity = async (item: CartItem, type: 'increase' | 'decrease') => {
    if (isUpdating) return;
    if (type === 'decrease' && item.quantity <= 1) return;

    const previousItems = [...items];

    setItems((prevItems) => 
      prevItems.map((i) => {
        if (i.id === item.id) {
          return {
            ...i,
            quantity: type === 'increase' ? i.quantity + 1 : i.quantity - 1
          };
        }
        return i;
      })
    );

    try {
      const targetId = item.product_id || item.id; 

      if (type === 'increase') {
        await cartService.increaseItem(targetId);
      } else {
        await cartService.decreaseItem(targetId);
      }
      
      await loadCart(true); 
    } catch (error) {
      console.error("Gagal update quantity", error);
      setItems(previousItems);
    }
  };

  const subtotal = items.reduce((acc, item) => {
    const price = parseFloat(item.price);
    return acc + (price * item.quantity);
  }, 0);

  const total = subtotal;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Keranjang Saya</h1>
        
        {items.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold">Keranjang Anda Kosong</h2>
            <p className="text-gray-600 mt-2 mb-6">
              Sepertinya Anda belum menambahkan gawai apapun ke keranjang.
            </p>
            <Link
              href="/products"
              className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-800 inline-block"
            >
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  
                  // PERBAIKAN DISINI:
                  // Kirim product_id (jika ada) sebagai prioritas utama
                  onRemove={() => handleRemove(item.product_id || item.id)}
                  
                  onUpdateQuantity={(type) => handleUpdateQuantity(item, type)}
                  disabled={isUpdating}
                />
              ))}
            </div>

            <aside className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg text-gray-900">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 block w-full bg-green-600 text-white text-center font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
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