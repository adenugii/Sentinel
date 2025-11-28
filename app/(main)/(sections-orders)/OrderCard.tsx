import { OrderSummary } from "@/core/services/orderService";
import Link from "next/link";
import Image from "next/image";
import { Package, ChevronRight, Clock, CheckCircle, AlertCircle } from "lucide-react";

// Helper Format
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
};

// Helper Status Badge dengan Icon
const StatusBadge = ({ status }: { status: string }) => {
  let style = "bg-gray-100 text-gray-600";
  let label = status;
  let Icon = Package;

  if (status === 'paid' || status === 'completed') { 
      style = "bg-green-100 text-green-700 border-green-200"; 
      label = "Selesai"; 
      Icon = CheckCircle;
  } else if (status === 'pending') { 
      style = "bg-yellow-50 text-yellow-700 border-yellow-200"; 
      label = "Menunggu Bayar"; 
      Icon = Clock;
  } else if (status === 'failed' || status === 'cancelled') { 
      style = "bg-red-50 text-red-700 border-red-200"; 
      label = "Dibatalkan"; 
      Icon = AlertCircle;
  }

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${style}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
};

interface OrderCardProps {
  order: OrderSummary;
}

export default function OrderCard({ order }: OrderCardProps) {
  // Ambil produk pertama untuk thumbnail
  const firstItem = order.items[0];
  const otherItemsCount = order.items.length - 1;
  
  // Logic Gambar Aman
  const thumbUrl = Array.isArray(firstItem?.product_image) 
    ? firstItem.product_image[0] 
    : (typeof firstItem?.product_image === 'string' ? firstItem.product_image : "https://placehold.co/100x100");

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200 group">
      
      {/* HEADER: Tanggal & Status */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-sm font-bold text-gray-900">Order #{order.order_id}</span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="text-xs text-gray-500">{formatDate(order.order_date)}</span>
        </div>
        <StatusBadge status={order.payment_status === 'paid' ? order.order_status : order.payment_status} />
      </div>

      {/* BODY: Thumbnail & Info Utama */}
      <div className="flex gap-4 items-start">
        {/* Thumbnail Produk Utama */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
            <Image 
                src={thumbUrl} 
                alt="Product Thumb" 
                fill 
                className="object-contain p-1"
            />
        </div>

        {/* Info Text */}
        <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {firstItem?.product_name || "Produk"}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
                {firstItem?.quantity} x {formatCurrency(firstItem?.unit_price)} 
                {otherItemsCount > 0 && <span className="text-gray-400 ml-1">(+{otherItemsCount} barang lain)</span>}
            </p>
            
            {/* Total Harga Mobile */}
            <div className="mt-2 sm:hidden">
                <span className="text-xs text-gray-500">Total: </span>
                <span className="font-bold text-blue-700">{formatCurrency(order.total_payment)}</span>
            </div>
        </div>

        {/* Total Harga Desktop & Aksi */}
        <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-xs text-gray-500">Total Belanja</span>
            <span className="font-bold text-blue-700 text-lg">{formatCurrency(order.total_payment)}</span>
        </div>
      </div>

      {/* FOOTER: Tombol Aksi */}
      <div className="mt-5 flex justify-end gap-3 pt-2">
        {order.payment_status === 'pending' && order.midtrans_redirect_url && (
           <a 
             href={order.midtrans_redirect_url} 
             target="_blank"
             rel="noopener noreferrer"
             className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm hover:shadow transition-all"
           >
             Bayar Sekarang
           </a>
        )}
        <Link
          href={`/account/orders/${order.order_id}`}
          className="flex items-center text-gray-700 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          Detail Pesanan
        </Link>
      </div>

    </div>
  );
}