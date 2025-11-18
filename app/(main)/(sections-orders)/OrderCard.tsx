import { Order, OrderStatus } from "@/core/entities/order";
import Link from "next/link";

// Fungsi helper untuk format Rupiah
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Fungsi helper untuk badge status
const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const S_STYLES = {
    Selesai: "bg-green-100 text-green-700",
    "Menunggu Pembayaran": "bg-yellow-100 text-yellow-700",
    "Sedang Diproses": "bg-blue-100 text-blue-700",
    Dibatalkan: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-semibold
        ${S_STYLES[status] || "bg-gray-100 text-gray-700"}
      `}
    >
      {status}
    </span>
  );
};

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Header Kartu */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">Order ID: {order.orderId}</h3>
        <StatusBadge status={order.status} />
      </div>

      {/* Detail Pesanan */}
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">Tanggal Pesanan:</span> {order.date}
        </p>
        <p>
          <span className="font-medium">Item:</span> {order.items}
        </p>
        <p className="text-base">
          <span className="font-medium">Total Pembayaran:</span>
          <span className="font-bold text-gray-900 ml-1">
            {formatCurrency(order.total)}
          </span>
        </p>
      </div>

      {/* Aksi */}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <Link
          href={`/account/orders/${order.id}`} // Rute dinamis untuk detail
          className="bg-white text-blue-700 border border-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-50"
        >
          Lihat Detail Pesanan
        </Link>
      </div>
    </div>
  );
}