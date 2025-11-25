'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ProductImageGalleryProps {
  images: string[]; // Daftar URL gambar
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  // Safety check: Jika images kosong/undefined, gunakan array kosong atau placeholder
  const safeImages = images && images.length > 0 ? images : ['/placeholder.png'];
  
  const [mainImage, setMainImage] = useState(safeImages[0]);

  // Update mainImage jika props images berubah (penting saat navigasi antar produk)
  useEffect(() => {
    setMainImage(safeImages[0]);
  }, [images]);

  return (
    <div className="w-full">
      {/* Gambar Utama */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden mb-4 relative group">
        <div className="relative w-full aspect-square">
          <Image
            src={mainImage}
            alt="Foto Produk Utama"
            fill
            className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      
      {/* Thumbnail */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`
                bg-gray-50 rounded-lg overflow-hidden aspect-square
                relative ring-2 transition-all duration-200
                ${mainImage === img ? 'ring-blue-600 ring-offset-1' : 'ring-transparent hover:ring-gray-300'}
              `}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-contain p-2"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}