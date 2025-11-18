import { OrderStatus } from "@/core/entities/order";

// Helper untuk Badge Status
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

// Helper untuk format Rupiah
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

interface OrderDetailHeaderProps {
  orderId: string;
  orderDate: string;
  status: OrderStatus;
  totalPayment: number;
}

export default function OrderDetailHeader({ 
  orderId, orderDate, status, totalPayment 
}: OrderDetailHeaderProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Order ID</p>
          <p className="font-semibold text-gray-900">{orderId}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Tanggal Pesanan</p>
          <p className="font-semibold text-gray-900">{orderDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Status Pesanan</p>
          <StatusBadge status={status} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Pembayaran</p>
          <p className="font-semibold text-gray-900">
            {formatCurrency(totalPayment)}
          </p>
        </div>
      </div>
    </div>
  );
}