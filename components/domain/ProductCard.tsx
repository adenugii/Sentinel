// components/domain/ProductCard.tsx
'use client';

import { Product } from "@/core/entities/product";
import { ShoppingCart, Loader2, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cartService } from "@/core/services/cartService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const formatCurrency = (value: string | number) => {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { token } = useAuth();
  const router = useRouter();
  
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // LOGIKA GAMBAR BARU:
  // 1. Ambil gambar pertama dari array
  const firstImage = product.image && product.image.length > 0 ? product.image[0] : "";
  
  // 2. Validasi apakah string valid
  const isValidImage = typeof firstImage === 'string' && firstImage.trim() !== "";
  
  // 3. Set URL atau Placeholder
  const validImageUrl = isValidImage 
    ? firstImage 
    : "https://placehold.co/600x400?text=No+Image"; 

  const [imgSrc, setImgSrc] = useState(validImageUrl);

  // LOGIKA VARIAN UNTUK TAMPILAN KARTU:
  // Ambil item pertama dari array memory & color (jika ada)
  const displayMemory = product.memory && product.memory.length > 0 ? product.memory[0] : "-";
  const displayColor = product.color && product.color.length > 0 ? product.color[0] : "-";

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!token) {
      router.push('/login');
      return;
    }
    setIsAdding(true);
    try {
      await cartService.addToCart(product.id);
      setIsAdding(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error: any) {
      console.error(error);
      setIsAdding(false);
      alert("Gagal menambahkan ke keranjang");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.02] flex flex-col h-full group">
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-48 bg-gray-50">
          <Image
            src={imgSrc} 
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-4 transition-transform group-hover:scale-105 duration-300"
            onError={() => setImgSrc("https://placehold.co/600x400?text=Error")}
          />
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded z-10 shadow-sm">
            Garansi Sentinel
          </span>
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`} className="flex-grow">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {/* Tampilkan varian pertama */}
            {displayMemory} • {displayColor} 
            {/* Indikator jika ada lebih banyak varian */}
            {(product.color.length > 1 || product.memory.length > 1) && <span className="text-xs ml-1 text-gray-400">(+Varian)</span>}
          </p>
        </Link>
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <p className="text-lg font-bold text-blue-700">
            {formatCurrency(product.price)}
          </p>
          
          <button 
            onClick={handleAddToCart}
            disabled={isAdding || isSuccess}
            className={`
              p-2 rounded-full transition-all duration-300 flex-shrink-0 ml-2 text-white shadow-sm
              ${isSuccess 
                ? 'bg-green-500 hover:bg-green-600 scale-110 rotate-0' 
                : 'bg-blue-700 hover:bg-blue-800 rotate-0'
              }
              ${isAdding ? 'cursor-wait opacity-80' : ''}
            `}
            aria-label={isSuccess ? "Berhasil ditambahkan" : "Tambah ke keranjang"}
          >
            {isAdding ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isSuccess ? (
              <Check className="w-5 h-5 animate-in zoom-in duration-300" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;