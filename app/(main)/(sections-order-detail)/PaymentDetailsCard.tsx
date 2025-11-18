import { PaymentStatus } from "@/core/entities/order";
import { Landmark, CheckCircle } from "lucide-react";

// Helper untuk Badge Status Pembayaran
const PaymentStatusBadge = ({ status }: { status: PaymentStatus }) => {
  const S_STYLES = {
    Lunas: "bg-green-100 text-green-700",
    Menunggu: "bg-yellow-100 text-yellow-700",
    Gagal: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        ${S_STYLES[status] || "bg-gray-100 text-gray-700"}
      `}
    >
      <CheckCircle className="w-4 h-4 mr-1.5" />
      {status}
    </span>
  );
};

interface PaymentDetailsCardProps {
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  transactionRefId: string;
}

export default function PaymentDetailsCard({ 
  paymentMethod, paymentStatus, transactionRefId 
}: PaymentDetailsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Detail Pembayaran</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500 mb-1">Metode Pembayaran</p>
          <p className="font-medium text-gray-900 flex items-center">
            <Landmark className="w-4 h-4 mr-2 text-blue-700" />
            {paymentMethod}
          </p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Status Pembayaran</p>
          <PaymentStatusBadge status={paymentStatus} />
        </div>
        <div>
          <p className="text-gray-500 mb-1">ID Referensi Transaksi</p>
          <p className="font-mono text-gray-900">{transactionRefId}</p>
        </div>
      </div>
    </div>
  );
}