'use client';

import Image from "next/image";
import { User } from "lucide-react";

interface ProfilePhotoUploadProps {
  currentImage: string | null | undefined;
}

export default function ProfilePhotoUpload({ currentImage }: ProfilePhotoUploadProps) {
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-100 border-4 border-white overflow-hidden shadow-sm flex items-center justify-center group">
      {currentImage ? (
        <Image
          src={currentImage}
          alt="Foto Profil"
          fill
          className="object-cover"
          onError={(e) => {
             e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        // Placeholder Default
        <div className="flex flex-col items-center justify-center text-gray-400 bg-gray-50 w-full h-full">
          <User className="w-16 h-16 md:w-20 md:h-20 text-gray-300" />
        </div>
      )}
    </div>
  );
}