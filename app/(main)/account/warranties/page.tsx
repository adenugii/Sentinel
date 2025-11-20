import EmptyState from "@/app/(main)/(sections-warranties)/EmptyState";
import WarrantyCard from "@/app/(main)/(sections-warranties)/WarrantyCard";
import { warrantyService } from "@/services/warrantyService"; // <-- Import Service

export default async function WarrantiesPage() {
  // PANGGIL SERVICE
  const warranties = await warrantyService.getMyWarranties();
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