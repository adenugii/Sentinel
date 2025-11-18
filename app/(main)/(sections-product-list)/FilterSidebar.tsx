import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";

export default function FilterSidebar() {
  return (
    <aside className="w-full md:w-64 lg:w-72">
      <h2 className="text-2xl font-bold mb-4">Filter</h2>
      
      {/* Filter Brand */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Brand</h3>
        <div className="space-y-2">
          <Checkbox id="brand-samsung" label="Samsung" name="brand" />
          <Checkbox id="brand-apple" label="Apple" name="brand" />
          <Checkbox id="brand-xiaomi" label="Xiaomi" name="brand" />
          <Checkbox id="brand-pixel" label="Google Pixel" name="brand" />
        </div>
      </div>

      {/* Filter Harga */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Kisaran Harga</h3>
        <div className="space-y-3">
          <Input id="harga-min" label="Harga Minimum" placeholder="Rp 0" type="number" />
          <Input id="harga-max" label="Harga Maksimum" placeholder="Rp 50.000.000" type="number" />
        </div>
      </div>

      {/* Filter Penyimpanan */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Penyimpanan Internal</h3>
        <div className="space-y-2">
          <Checkbox id="storage-128" label="128GB" name="storage" />
          <Checkbox id="storage-256" label="256GB" name="storage" />
          <Checkbox id="storage-512" label="512GB" name="storage" />
          <Checkbox id="storage-1tb" label="1TB" name="storage" />
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="space-y-2">
        <Button variant="primary">Terapkan Filter</Button>
        <Button variant="secondary">Reset Filter</Button>
      </div>
    </aside>
  );
}