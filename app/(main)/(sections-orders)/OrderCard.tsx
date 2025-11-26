import { OrderSummary } from "@/core/services/orderService";
import Link from "next/link";

// Helper Rupiah
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Helper Status Badge
const StatusBadge = ({ status }: { status: string }) => {
  let style = "bg-gray-100 text-gray-700";
  let label = status;

  if (status === 'paid' || status === 'completed') {
    style = "bg-green-100 text-green-700";
    label = "Selesai";
  } else if (status === 'pending') {
    style = "bg-yellow-100 text-yellow-700";
    label = "Menunggu Pembayaran";
  } else if (status === 'failed' || status === 'cancelled') {
    style = "bg-red-100 text-red-700";
    label = "Dibatalkan";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${style}`}>
      {label}
    </span>
  );
};

// Helper Tanggal
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric"
  });
};

interface OrderCardProps {
  order: OrderSummary;
}

export default function OrderCard({ order }: OrderCardProps) {
  // Hitung total item
  const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* Header Kartu */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">Order ID: {order.order_id}</h3>
        <StatusBadge status={order.payment_status === 'paid' ? order.order_status : order.payment_status} />
      </div>

      {/* Detail Pesanan */}
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">Tanggal Pesanan:</span> {formatDate(order.order_date)}
        </p>
        <p>
          <span className="font-medium">Total Barang:</span> {totalItems} Item
        </p>
        <p className="text-base mt-2">
          <span className="font-medium">Total Pembayaran:</span>
          <span className="font-bold text-blue-700 ml-2">
            {formatCurrency(order.total_payment)}
          </span>
        </p>
      </div>

      {/* Aksi */}
      <div className="mt-6 border-t border-gray-200 pt-4 flex justify-end gap-3">
        {order.payment_status === 'pending' && order.midtrans_redirect_url && (
           <a 
             href={order.midtrans_redirect_url} 
             target="_blank"
             rel="noopener noreferrer"
             className="bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-800"
           >
             Bayar Sekarang
           </a>
        )}
        <Link
          href={`/account/orders/${order.order_id}`}
          className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-50"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}