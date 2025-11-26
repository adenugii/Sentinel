'use client';

import Button from "@/components/ui/Button";
import ColorSelector from "@/components/ui/ColorSelector";
import VariantSelector from "@/components/ui/VariantSelector";
import { ShieldCheck, Truck, RotateCcw, ShoppingCart, Check, Loader2 } from "lucide-react";
import { Product } from "@/core/entities/product";
import { cartService } from "@/core/services/cartService";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Helper Format Rupiah
const formatCurrency = (value: string | number) => {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface ProductPurchaseInfoProps {
  product: Product;
}

export default function ProductPurchaseInfo({ product }: ProductPurchaseInfoProps) {
  const { token } = useAuth();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Default selection
  const [selectedColor, setSelectedColor] = useState(product.color?.[0] || "");
  const [selectedMemory, setSelectedMemory] = useState(product.memory?.[0] || "");

  const handleAddToCart = async () => {
    if (!token) {
      router.push('/login');
      return;
    }
    setIsAdding(true);
    try {
      await cartService.addToCart(product.id, {
        color: selectedColor,
        memory: selectedMemory
      });
      
      setIsAdding(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error: any) {
      console.error(error);
      setIsAdding(false);
      alert(error.message || "Gagal menambahkan ke keranjang");
    }
  };

  // --- PERUBAHAN DISINI: Mapping Data Sederhana ---
  
  // Opsi Warna (Langsung pakai string namanya)
  const dynamicColorOptions = product.color && product.color.length > 0 
    ? product.color.map((c) => ({ value: c, label: c }))
    : [{ value: 'Default', label: 'Default' }];

  // Opsi Memori
  const dynamicMemoryOptions = product.memory && product.memory.length > 0
    ? product.memory.map((m) => ({ value: m, label: m }))
    : [{ value: 'Standard', label: 'Standard' }];

  return (
    <div className="flex flex-col h-full">
      
      {/* HEADER INFO */}
      <div className="border-b border-gray-100 pb-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                Official Store
            </span>
            {product.sku && <span className="text-xs text-gray-400">SKU: {product.sku}</span>}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">
          {product.name}
        </h1>
        <div className="mt-4">
          <p className="text-3xl font-bold text-blue-700 tracking-tight">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>

      {/* VARIANT SELECTION */}
      <div className="space-y-6 mb-8">
        {/* Warna (Sekarang Tampil sebagai Text Chips) */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Pilih Warna: <span className="text-gray-500 font-normal">{selectedColor}</span>
          </h3>
          <ColorSelector 
            options={dynamicColorOptions} 
            defaultValue={selectedColor}
            onChange={(val: string) => setSelectedColor(val)} 
          />
        </div>

        {/* Memori */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Kapasitas: <span className="text-gray-500 font-normal">{selectedMemory}</span>
          </h3>
          <VariantSelector 
            options={dynamicMemoryOptions} 
            defaultValue={selectedMemory}
            onChange={(val: string) => setSelectedMemory(val)}
          />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mt-auto">
        <Button variant="secondary" className="flex-1 py-3 text-base font-medium border-gray-300">
           Beli Langsung
        </Button>
        <button
          onClick={handleAddToCart}
          disabled={isAdding || isSuccess}
          className={`
            flex-[2] py-3 rounded-lg font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-700/20
            ${isSuccess 
                ? "bg-green-600 text-white hover:bg-green-700" 
                : "bg-blue-700 text-white hover:bg-blue-800"
            }
            ${isAdding ? "opacity-80 cursor-wait" : ""}
          `}
        >
          {isAdding ? (
             <><Loader2 className="w-5 h-5 animate-spin" /> Proses...</>
          ) : isSuccess ? (
             <><Check className="w-5 h-5" /> Masuk Keranjang</>
          ) : (
             <><ShoppingCart className="w-5 h-5" /> + Keranjang</>
          )}
        </button>
      </div>

      {/* VALUE PROPOSITION */}
      <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-start gap-3">
           <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
           <div>
              <p className="text-sm font-semibold text-gray-900">Garansi Sentinel</p>
              <p className="text-xs text-gray-500 leading-snug mt-0.5">
                Otomatis terdaftar di Blockchain (NFT).
              </p>
           </div>
        </div>
        <div className="flex items-start gap-3">
           <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
           <div>
              <p className="text-sm font-semibold text-gray-900">Pengiriman Aman</p>
              <p className="text-xs text-gray-500 leading-snug mt-0.5">
                Asuransi pengiriman hingga 100%.
              </p>
           </div>
        </div>
      </div>

    </div>
  );
}