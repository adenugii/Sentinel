'use client';

import { useEffect, useState } from "react";
import EmptyState from "@/app/(main)/(sections-warranties)/EmptyState";
import WarrantyCard from "@/app/(main)/(sections-warranties)/WarrantyCard";
import { warrantyService, WarrantyItem } from "@/core/services/warrantyService";
import { Loader2 } from "lucide-react";

export default function WarrantiesPage() {
  const [warranties, setWarranties] = useState<WarrantyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await warrantyService.getMyWarranties();
        setWarranties(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
      </div>
    );
  }

  const hasWarranties = warranties && warranties.length > 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Gawai & Garansi Saya
      </h1>
      <p className="text-gray-600">
        Berikut adalah daftar gawai Anda yang garansinya terdaftar dan diamankan oleh Sentinel.
      </p>

      {/* Daftar Kartu Garansi */}
      <div className="space-y-4">
        {hasWarranties && warranties.map((item) => (
          <WarrantyCard key={item.id} product={item} />
        ))}
      </div>
      
      {/* Empty State */}
      {!hasWarranties && <EmptyState />}
    </div>
  );
}