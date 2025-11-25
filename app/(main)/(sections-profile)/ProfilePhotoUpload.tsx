// app/(main)/(sections-profile)/ProfilePhotoUpload.tsx
'use client';

import Image from "next/image";
import Button from "@/components/ui/Button"; 
import { useState, useEffect } from "react";

interface ProfilePhotoUploadProps {
  currentImage: string | null | undefined;
}

export default function ProfilePhotoUpload({ currentImage }: ProfilePhotoUploadProps) {
  // Gunakan foto dari API atau placeholder
  const [image, setImage] = useState("/images/avatar-placeholder.png");

  useEffect(() => {
    if (currentImage) {
      setImage(currentImage);
    }
  }, [currentImage]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-6">
          <Image
            src={image}
            alt="Foto Profil"
            fill
            className="rounded-full border-4 border-gray-100 object-cover"
            // Handle error jika link foto mati
            onError={() => setImage("https://placehold.co/200x200?text=Avatar")}
          />
        </div>
        
        {/* Disable tombol upload karena API belum support edit foto */}
        <Button variant="secondary" className="w-full mb-4 border-gray-300 opacity-50 cursor-not-allowed">
          Pilih Foto
        </Button>

        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Saat ini foto profil belum dapat diubah.
        </p>
      </div>
    </div>
  );
}