import Button from "@/components/ui/Button";
import ColorSelector from "@/components/ui/ColorSelector";
import VariantSelector from "@/components/ui/VariantSelector";
import { ShieldCheck } from "lucide-react";

// Mock data untuk Varian (ini akan datang dari 'props' di app nyata)
const colorOptions = [
  { value: "black", tailwindColor: "bg-black" },
  { value: "gray", tailwindColor: "bg-gray-400" },
  { value: "blue", tailwindColor: "bg-blue-600" },
  { value: "purple", tailwindColor: "bg-purple-600" },
];

const memoryOptions = [
  { value: "256gb", label: "256GB" },
  { value: "512gb", label: "512GB" },
  { value: "1tb", label: "1TB" },
];

// Fungsi helper untuk format Rupiah
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function ProductPurchaseInfo() {
  // Di app nyata, 'product' akan di-pass sebagai props
  const product = {
    name: "Samsung Galaxy S25 Ultra",
    price: 21999000,
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
      <p className="text-3xl font-bold text-blue-800 mb-6">
        {formatCurrency(product.price)}
      </p>

      {/* Varian Warna */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Warna</label>
        <ColorSelector options={colorOptions} defaultValue="black" />
      </div>

      {/* Varian Memori */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Memori</label>
        <VariantSelector options={memoryOptions} defaultValue="256gb" />
      </div>

      {/* Tombol Aksi */}
      <div className="space-y-3 mb-6">
        <Button variant="secondary">Tambah ke Keranjang</Button>
        <Button variant="primary">Beli Sekarang</Button>
      </div>

      {/* Sentinel Trust Guarantee */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-4 flex items-start space-x-3">
        <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-green-800">Sentinel Trust Guarantee</h4>
          <p className="text-sm text-green-700">
            Setiap pembelian di Sentinel otomatis mendapatkan 
            <span className="font-bold"> Sertifikat Garansi Digital</span> 
            blockchain. Anti hilang, anti palsu.
          </p>
        </div>
      </div>
    </div>
  );
}