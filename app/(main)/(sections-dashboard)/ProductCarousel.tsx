'use client';

import { useState, useEffect } from "react";
import ProductCard from "@/components/domain/ProductCard";
import { Product } from "@/core/entities/product";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  // Jika produk kurang dari 4, duplikasi agar carousel tetap jalan (looping visual)
  const displayProducts = products.length < 4 ? [...products, ...products, ...products] : products;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4); // Default Desktop

  // Deteksi ukuran layar untuk responsivitas (Mobile: 1, Tablet: 2, Desktop: 4)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(4);
    };
    
    // Set awal & listen resize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto Slide setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); 
    return () => clearInterval(interval);
  }, [currentIndex, itemsPerView]);

  const maxIndex = displayProducts.length - itemsPerView;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="relative group">
      {/* Container Overflow Hidden */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out gap-6"
          style={{ 
            // Rumus geser: -(index * (100% / itemsPerView + gapAdjustment))
            // Karena gap-6 (24px) agak tricky di calc persentase murni, 
            // kita gunakan pendekatan flex-basis di itemnya.
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` 
          }}
        >
          {displayProducts.map((product, index) => (
            <div 
              key={`${product.id}-${index}`} 
              className="flex-shrink-0 box-border px-3" // Padding horizontal pengganti gap agar kalkulasi % akurat
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="h-full"> {/* Wrapper agar tinggi card sama */}
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigasi Manual (Muncul saat Hover) */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 hover:bg-blue-50 z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 hover:bg-blue-50 z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indikator Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}