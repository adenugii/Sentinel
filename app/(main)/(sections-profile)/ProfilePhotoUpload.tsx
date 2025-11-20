'use client';

import Image from "next/image";
import Button from "@/components/ui/Button"; 
import { useState } from "react";

export default function ProfilePhotoUpload() {
  // Mock image
  const [image, setImage] = useState("/images/avatar-placeholder.png");

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-6">
          <Image
            src={image}
            alt="Foto Profil"
            layout="fill"
            objectFit="cover"
            className="rounded-full border-4 border-gray-100"
          />
        </div>
        
        <Button variant="secondary" className="w-full mb-4 border-gray-300">
          Pilih Foto
        </Button>

        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Besar file: maksimum 10.000.000 bytes (10 Megabytes). 
          Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
        </p>
      </div>
    </div>
  );
}