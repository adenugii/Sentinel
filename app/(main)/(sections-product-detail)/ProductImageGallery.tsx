'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[]; // Daftar URL gambar
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="w-full">
      {/* Gambar Utama */}
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-3">
        <div className="relative w-full aspect-square">
          <Image
            src={mainImage}
            alt="Foto Produk Utama"
            layout="fill"
            objectFit="contain"
            className="p-4"
          />
        </div>
      </div>
      
      {/* Thumbnail */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`
              bg-gray-100 rounded-md overflow-hidden aspect-square
              relative ring-2 transition-all
              ${mainImage === img ? 'ring-blue-700' : 'ring-transparent'}
            `}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              layout="fill"
              objectFit="contain"
              className="p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}