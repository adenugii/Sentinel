'use client';

import { useState, useEffect } from "react";
import { CartItem } from "@/core/entities/cart";
import CartItemCard from "./CartItemCard";
import Link from "next/link";
import { cartService } from "@/core/services/cartService";
import { ShoppingCart, ArrowRight, ShieldCheck, Home, ChevronRight, Loader2 } from "lucide-react";

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

  const handleRemove = async (id: number) => {
    const previousItems = [...items];
    setItems((prev) => prev.filter((item) => (item.product_id || item.id) !== id));

    try {
      await cartService.removeItem(id);
      await loadCart(true);
    } catch (error) {
      console.error("Gagal menghapus item:", error);
      setItems(previousItems);
      alert("Gagal menghapus item. Coba lagi.");
    }
  };

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

  // --- BREADCRUMBS COMPONENT (Inline) ---
  const Breadcrumbs = () => (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm lg:static lg:shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-700 flex items-center transition-colors">
              <Home className="w-4 h-4 mr-1" />
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="text-gray-900 font-medium">
              Keranjang Belanja
            </span>
          </nav>
        </div>
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20">
      
      {/* Tampilkan Breadcrumbs di atas (selalu muncul) */}
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Title Halaman */}
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Keranjang Saya</h1>
            {!isLoading && <span className="text-sm text-gray-500 font-medium">{items.length} Barang</span>}
        </div>

        {/* Content Logic: Loading vs Empty vs Data */}
        {isLoading ? (
          // SKELETON LOADING
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                  {[1, 2].map((i) => (
                      <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
              </div>
              <div className="lg:col-span-1">
                  <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
          </div>
        ) : items.length === 0 ? (
          // EMPTY STATE
          <div className="bg-white p-16 text-center rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center">
            <div className="bg-blue-50 p-6 rounded-full mb-6">
                <ShoppingCart className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Anda Kosong</h2>
            <p className="text-gray-500 max-w-md mb-8">
              Sepertinya Anda belum menemukan gawai impian. Yuk jelajahi katalog kami sekarang!
            </p>
            <Link
              href="/products"
              className="bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-700/20 flex items-center"
            >
              Mulai Belanja <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        ) : (
          // REAL CART CONTENT
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            
            {/* LIST BARANG */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={() => handleRemove(item.product_id || item.id)}
                  onUpdateQuantity={(type) => handleUpdateQuantity(item, type)}
                  disabled={isUpdating}
                />
              ))}
            </div>

            {/* RINGKASAN (STICKY) */}
            <aside className="lg:col-span-1 sticky top-24">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Ringkasan Pesanan</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Total Harga ({items.length} barang)</span>
                    <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Biaya Pengiriman</span>
                    <span className="text-green-600 font-bold">Gratis</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="text-base font-bold text-gray-900">Total Belanja</span>
                    <span className="text-xl font-bold text-blue-700">{formatCurrency(subtotal)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-blue-700 text-white text-center font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-700/20 block"
                >
                  Beli ({items.length})
                </Link>

                {/* Trust Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 py-2 rounded-lg">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>Jaminan Transaksi Aman</span>
                </div>
              </div>
            </aside>

          </div>
        )}
      </div>
    </div>
  );
}