// components/domain/ProductCard.tsx
'use client';

import { Product } from "@/core/entities/product";
import { ShoppingCart, Loader2, Check, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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

  // --- LOGIKA SLIDESHOW ---
  // 1. Pastikan images selalu dalam bentuk Array
  const rawImages = product.image;
  const images = Array.isArray(rawImages) 
    ? (rawImages.length > 0 ? rawImages : ["https://placehold.co/600x400?text=No+Image"]) 
    : [typeof rawImages === 'string' && rawImages ? rawImages : "https://placehold.co/600x400?text=No+Image"];

  // 2. State untuk index gambar aktif & status hover
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 3. Efek Berganti Gambar (Interval)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Hanya jalankan slideshow jika di-hover DAN punya lebih dari 1 gambar
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1200); // Ganti gambar setiap 1.2 detik (sesuaikan kecepatan di sini)
    } else {
      // Jika mouse keluar, reset ke gambar pertama
      setActiveImageIndex(0);
    }

    return () => clearInterval(interval);
  }, [isHovered, images.length]);


  // --- LOGIKA LAINNYA ---
  const displayMemory = product.memory && product.memory.length > 0 ? product.memory[0] : null;
  const displayColor = product.color && product.color.length > 0 ? product.color[0] : null;
  const hasMoreVariants = (product.color?.length || 0) > 1 || (product.memory?.length || 0) > 1;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
    <div 
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
      // Trigger Hover di Container Utama
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      <Link href={`/product/${product.id}`} className="flex flex-col h-full">
        
        {/* === BAGIAN GAMBAR (SLIDESHOW) === */}
        <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden flex items-center justify-center p-6">
          
          {/* Badge Garansi */}
          <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm border border-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center shadow-sm">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Sentinel Verified
          </div>

          {/* Render Gambar Aktif */}
          <Image
            key={activeImageIndex} // Key penting agar React me-render ulang animasi saat src berubah
            src={images[activeImageIndex]} 
            alt={`${product.name} view ${activeImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-contain transition-all duration-500 ease-in-out ${isHovered ? 'scale-105' : 'scale-100'}`}
            onError={(e) => {
               // Fallback sederhana jika error
               e.currentTarget.srcset = "https://placehold.co/600x400?text=Error";
            }}
          />

          {/* Indikator Dots (Hanya muncul jika hover & ada > 1 gambar) */}
          {images.length > 1 && (
            <div className={`absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeImageIndex ? 'w-4 bg-blue-600' : 'w-1.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}

        </div>
        
        {/* === BAGIAN KONTEN === */}
        <div className="p-5 flex flex-col flex-grow">
          
          {/* Tags Varian */}
          <div className="flex flex-wrap gap-2 mb-3">
            {displayMemory && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                {displayMemory}
              </span>
            )}
            {displayColor && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                {displayColor}
              </span>
            )}
            {hasMoreVariants && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium text-blue-600 bg-blue-50">
                +{images.length > 1 ? images.length : 1} Pic
              </span>
            )}
          </div>

          <h3 className="text-gray-900 font-bold text-base leading-snug line-clamp-2 mb-1 group-hover:text-blue-700 transition-colors">
            {product.name}
          </h3>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Harga Terbaik</p>
              <p className="text-lg font-bold text-blue-700">
                {formatCurrency(product.price)}
              </p>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={isAdding || isSuccess}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md
                ${isSuccess 
                  ? 'bg-green-500 text-white hover:bg-green-600 scale-110 ring-2 ring-green-200' 
                  : 'bg-white text-blue-700 border border-gray-200 hover:bg-blue-700 hover:text-white hover:border-blue-700'
                }
                ${isAdding ? 'opacity-70 cursor-wait' : ''}
              `}
            >
              {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : isSuccess ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;