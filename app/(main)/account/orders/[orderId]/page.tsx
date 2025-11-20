// HAPUS import/data mock lokal
import { OrderDetail } from "@/core/entities/order";
import OrderDetailHeader from "@/app/(main)/(sections-order-detail)/OrderDetailHeader";
import PurchasedItemCard from "@/app/(main)/(sections-order-detail)/PurchasedItemCard";
import ShippingDetailsCard from "@/app/(main)/(sections-order-detail)/ShippingDetailsCard";
import PaymentDetailsCard from "@/app/(main)/(sections-order-detail)/PaymentDetailsCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { orderService } from "@/services/orderService"; // <-- Import Service

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId: currentOrderId } = await params;

  // PANGGIL SERVICE
  const order = await orderService.getOrderDetail(currentOrderId);

  if (!order) {
    return (
      <div>
        <h1 className="text-xl font-bold">Pesanan tidak ditemukan.</h1>
        <p>Tidak ada data untuk ID: {currentOrderId}</p>
        <Link href="/account/orders" className="text-blue-600 hover:underline mt-2 block">
          Kembali ke Riwayat Pesanan
        </Link>
      </div>
    );
  }

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