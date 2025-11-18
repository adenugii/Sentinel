// HAPUS import 'mockOrderDetailData' dari data/mock/orders
import { mockOrderDetailData } from "@/data/mock/orders"; // <-- IMPORT KEMBALI

// TAMBAHKAN import OrderDetail (Jika Anda belum memilikinya, meskipun tidak wajib)
// import { OrderDetail } from "@/core/entities/order"; 

// Import-import untuk section (sudah ada)
import OrderDetailHeader from "@/app/(sections-order-detail)/OrderDetailHeader";
import PurchasedItemCard from "@/app/(sections-order-detail)/PurchasedItemCard";
import ShippingDetailsCard from "@/app/(sections-order-detail)/ShippingDetailsCard";
import PaymentDetailsCard from "@/app/(sections-order-detail)/PaymentDetailsCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// --- DATA MOCK SUDAH DIHAPUS DARI SINI ---

// Fungsi pengambil data (sekarang menggunakan data yang di-import)
const getOrderDetail = async (orderId: string) => {
  return mockOrderDetailData[orderId] || null;
};

// Komponen Halaman
export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  // 🔥 Perubahan penting: tunggu params diselesaikan
  const { orderId: currentOrderId } = await params;

  const order = await getOrderDetail(currentOrderId);

  // Jika 'order' null, tampilkan blok ini
  if (!order) {
    return (
      <div>
        <h1 className="text-xl font-bold">Pesanan tidak ditemukan.</h1>
        <p>Data mock tidak ditemukan untuk ID: {currentOrderId}</p>
        <Link href="/account/orders" className="text-blue-600">
          Kembali ke Riwayat Pesanan
        </Link>
      </div>
    );
  }

  // Jika 'order' DITEMUKAN, tampilkan ini
  return (
    <div className="space-y-6">
      <Link
        href="/account/orders"
        className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Riwayat Pesanan
      </Link>

      <h1 className="text-3xl font-bold text-gray-900">Detail Pesanan</h1>

      <OrderDetailHeader
        orderId={order.orderId}
        orderDate={order.date}
        status={order.status}
        totalPayment={order.totalPayment}
      />

      {order.purchasedItems.map((item) => (
        <PurchasedItemCard key={item.id} item={item} />
      ))}

      <ShippingDetailsCard
        recipientName={order.shippingDetails.recipientName}
        shippingAddress={order.shippingDetails.shippingAddress}
        estimatedDelivery={order.shippingDetails.estimatedDelivery}
      />

      <PaymentDetailsCard
        paymentMethod={order.paymentDetails.paymentMethod}
        paymentStatus={order.paymentDetails.paymentStatus}
        transactionRefId={order.paymentDetails.transactionRefId}
      />
    </div>
  );
}