import { format } from "date-fns"; // Optional, atau pakai native JS

// Helper Rupiah
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
};

// Status Badge
const StatusBadge = ({ status }: { status: string }) => {
  let style = "bg-gray-100 text-gray-700";
  let label = status;

  if (status === 'completed' || status === 'paid') { style = "bg-green-100 text-green-700"; label = "Selesai"; }
  else if (status === 'pending') { style = "bg-yellow-100 text-yellow-700"; label = "Menunggu Pembayaran"; }
  else if (status === 'cancelled') { style = "bg-red-100 text-red-700"; label = "Dibatalkan"; }

  return <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${style}`}>{label}</span>;
};

interface OrderDetailHeaderProps {
  orderId: string;
  orderDate: string;
  status: string;
  paymentStatus: string;
  totalPayment: number;
}

export default function OrderDetailHeader({ orderId, orderDate, status, paymentStatus, totalPayment }: OrderDetailHeaderProps) {
  // Gunakan status order, kecuali masih pending payment
  const displayStatus = paymentStatus === 'pending' ? 'pending' : status;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Order ID</p>
          <p className="font-semibold text-gray-900">#{orderId}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Tanggal Pesanan</p>
          <p className="font-semibold text-gray-900">{new Date(orderDate).toLocaleDateString('id-ID')}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <StatusBadge status={displayStatus} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Pembayaran</p>
          <p className="font-semibold text-blue-700 text-lg">{formatCurrency(totalPayment)}</p>
        </div>
      </div>
    </div>
  );
}