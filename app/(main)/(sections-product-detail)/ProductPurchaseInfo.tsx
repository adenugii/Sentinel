'use client';

import Button from "@/components/ui/Button";
import ColorSelector from "@/components/ui/ColorSelector";
import VariantSelector from "@/components/ui/VariantSelector";
import { ShieldCheck, Truck, RotateCcw, Check, ShoppingCart, Loader2 } from "lucide-react"; // Tambah Icon
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

// Helper Mapping Warna (Dari diskusi sebelumnya)
const getColorClass = (colorName: string) => {
  const name = colorName.toLowerCase();
  if (name.includes('black') || name.includes('graphite') || name.includes('obsidian') || name.includes('grey') || name.includes('gray')) return 'bg-gray-900';
  if (name.includes('silver') || name.includes('white') || name.includes('starlight') || name.includes('porcelain') || name.includes('cream') || name.includes('snowy')) return 'bg-gray-100 border border-gray-300';
  if (name.includes('blue') || name.includes('sky') || name.includes('alpine')) return 'bg-blue-500';
  if (name.includes('green') || name.includes('mint') || name.includes('meadow') || name.includes('volt')) return 'bg-green-500';
  if (name.includes('purple') || name.includes('lavender') || name.includes('violet')) return 'bg-purple-500';
  if (name.includes('red') || name.includes('rose') || name.includes('pink')) return 'bg-pink-500';
  if (name.includes('yellow') || name.includes('gold') || name.includes('orange') || name.includes('sunset')) return 'bg-yellow-500';
  if (name.includes('titanium')) return 'bg-gray-500';
  return 'bg-gray-400';
};

interface ProductPurchaseInfoProps {
  product: Product;
}

export default function ProductPurchaseInfo({ product }: ProductPurchaseInfoProps) {
  const { token } = useAuth();
  const router = useRouter();
  
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // State untuk animasi sukses

  // Default Value
  const [selectedColor, setSelectedColor] = useState(product.color?.[0] || "");
  const [selectedMemory, setSelectedMemory] = useState(product.memory?.[0] || "");

  const handleAddToCart = async () => {
    if (!token) {
      router.push('/login');
      return;
    }
    
    setIsAdding(true);
    try {
      await cartService.addToCart(product.id);
      
      // LOGIKA ANIMASI SUKSES:
      setIsAdding(false);
      setIsSuccess(true);
      
      // Reset tombol setelah 2.5 detik
      setTimeout(() => {
        setIsSuccess(false);
      }, 2500);

    } catch (error: any) {
      console.error(error);
      setIsAdding(false);
      alert(error.message || "Gagal menambahkan ke keranjang");
    }
  };

  // Setup Options
  const dynamicColorOptions = product.color && product.color.length > 0 
    ? product.color.map((c) => ({
        value: c,
        label: c,
        tailwindColor: getColorClass(c)
      }))
    : [{ value: 'default', tailwindColor: 'bg-gray-500' }];

  const dynamicMemoryOptions = product.memory && product.memory.length > 0
    ? product.memory.map((m) => ({
        value: m,
        label: m
      }))
    : [{ value: 'default', label: 'Standard' }];

  return (
    <div className="w-full flex flex-col h-full">
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
        <div className="flex items-end gap-3">
          <p className="text-4xl font-bold text-blue-700">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>

      {/* Varian Warna */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Warna: <span className="font-bold text-gray-900">{selectedColor}</span>
        </label>
        <ColorSelector 
          options={dynamicColorOptions} 
          defaultValue={selectedColor}
          onChange={(val: string) => setSelectedColor(val)} 
        />
      </div>

      {/* Varian Memori */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Kapasitas Memori: <span className="font-bold text-gray-900">{selectedMemory}</span>
        </label>
        <VariantSelector 
          options={dynamicMemoryOptions} 
          defaultValue={selectedMemory}
          onChange={(val: string) => setSelectedMemory(val)}
        />
      </div>

      {/* Tombol Aksi */}
      <div className="space-y-3 mb-8">
        <Button variant="primary" className="w-full py-4 text-lg shadow-lg shadow-blue-700/20">
          Beli Sekarang
        </Button>
        
        {/* TOMBOL KERANJANG DENGAN ANIMASI */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || isSuccess}
          className={`
            w-full py-4 text-lg font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2
            ${isSuccess
              ? "bg-green-600 text-white shadow-green-200 shadow-lg scale-[1.02]" // State Sukses (Hijau & Besar dikit)
              : "bg-white border-2 border-blue-700 text-blue-700 hover:bg-blue-50" // State Normal (Secondary style)
            }
            ${isAdding ? "opacity-70 cursor-wait" : ""}
          `}
        >
          {isAdding ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Menambahkan...
            </>
          ) : isSuccess ? (
            <>
              <Check className="w-6 h-6 animate-in zoom-in duration-300" />
              Berhasil Masuk Keranjang
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Tambah ke Keranjang
            </>
          )}
        </button>
      </div>

      {/* Sentinel Trust Guarantee */}
      <div className="mt-auto space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start space-x-3 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-green-800 text-sm uppercase tracking-wide mb-1">Sentinel Trust Guarantee</h4>
            <p className="text-sm text-green-700 leading-relaxed">
              Setiap pembelian otomatis mendapatkan 
              <span className="font-bold"> Sertifikat Garansi Digital (NFT)</span> di blockchain.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Gratis Ongkir se-Indonesia</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            <span>7 Hari Pengembalian</span>
          </div>
        </div>
      </div>
    </div>
  );
}