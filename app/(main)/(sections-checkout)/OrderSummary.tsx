import { mockOrderSummary } from "@/data/mock/checkout";
import { Shield, Lock } from "lucide-react";
import Button from "@/components/ui/Button"; // Asumsi Anda punya Button.tsx

// Fungsi helper untuk format Rupiah
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Pemetaan Ikon
const iconMap = {
  shield: <Shield className="w-5 h-5 text-blue-700" />,
  lock: <Lock className="w-5 h-5 text-blue-700" />,
};

export default function OrderSummary() {
  const summary = mockOrderSummary; // Di app nyata, ini datang dari props

  return (
    <aside className="lg:col-span-1">
      <div className="bg-gray-100 p-6 rounded-lg sticky top-24">
        <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
        
        {/* Daftar Item */}
        <div className="space-y-4">
          {summary.items.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <div className="bg-white p-2 rounded-full border border-gray-200">
                {iconMap[item.icon]}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">{item.details} (Qty: {item.quantity})</p>
              </div>
              <span className="font-semibold">{formatCurrency(item.price)}</span>
            </div>
          ))}
        </div>

        {/* Kalkulasi Total */}
        <div className="border-t border-gray-300 mt-6 pt-6 space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>{formatCurrency(summary.subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Biaya Pengiriman</span>
            <span>{formatCurrency(summary.shipping)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Pajak (11%)</span>
            <span>{formatCurrency(summary.tax)}</span>
          </div>
          <div className="border-t border-gray-300 pt-3 mt-3">
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>{formatCurrency(summary.total)}</span>
            </div>
          </div>
        </div>

        {/* Tombol Bayar */}
        <div className="mt-6">
          <Button variant="primary" className="w-full text-lg py-3">
            Bayar Sekarang
          </Button>
        </div>
      </div>
    </aside>
  );
}