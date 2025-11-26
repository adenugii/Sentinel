'use client';

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  // Fallback safe array
  const galleryImages = Array.isArray(images) && images.length > 0 
    ? images 
    : ["https://placehold.co/600x600?text=No+Image"];
    
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  return (
    <div className="flex flex-col gap-6 sticky top-6">
      {/* MAIN IMAGE */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center group">
        <Image
          src={activeImage}
          alt="Product View"
          fill
          className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
          priority
        />
      </div>

      {/* THUMBNAILS */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`
                relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200
                ${activeImage === img 
                  ? "border-blue-600 ring-2 ring-blue-50 opacity-100 scale-105" 
                  : "border-transparent bg-gray-50 opacity-60 hover:opacity-100 hover:border-gray-200"
                }
              `}
            >
              <Image 
                src={img} 
                alt={`Thumb ${idx}`} 
                fill 
                className="object-cover p-1" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}