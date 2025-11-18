// Import from the new section folder name
import EmptyState from "@/app/(main)/(sections-warranties)/EmptyState";
import WarrantyCard from "@/app/(main)/(sections-warranties)/WarrantyCard";

// Mock Data (remains the same, just for demo)
const mockWarrantyData = [
  {
    id: "1",
    name: "Samsung Galaxy S25 Ultra",
    imageUrl: "/images/galaxy-s24-ultra.png", 
    purchaseDate: "3 November 2025", // <-- DIUBAH (Format Tanggal)
    expiryDate: "3 November 2026", // <-- DIUBAH (Format Tanggal)
    detailUrl: "/account/certificate/1",
  },
  {
    id: "2",
    name: "Apple iPhone 15 Pro Max",
    imageUrl: "/images/iphone-15-pro.png", 
    purchaseDate: "15 September 2025", // <-- DIUBAH (Format Tanggal)
    expiryDate: "15 September 2026", // <-- DIUBAH (Format Tanggal)
    detailUrl: "/account/certificate/2",
  },
];

export default function WarrantiesPage() {
  const warranties = mockWarrantyData; 
  const hasWarranties = warranties && warranties.length > 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Gawai & Garansi Saya {/* <-- DIUBAH */}
      </h1>
      <p className="text-gray-600">
        Berikut adalah daftar gawai Anda yang garansinya terdaftar dan diamankan oleh Sentinel. {/* <-- DIUBAH */}
      </p>

      {/* List of Warranty Cards */}
      <div className="space-y-4">
        {hasWarranties && warranties.map((item) => (
          <WarrantyCard key={item.id} product={item} />
        ))}
      </div>
      
      {/* Empty State / Add New */}
      <EmptyState />
    </div>
  );
}