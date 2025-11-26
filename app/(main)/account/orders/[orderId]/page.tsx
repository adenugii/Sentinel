'use client';

import { useEffect, useState } from "react";
import OrderDetailHeader from "@/app/(main)/(sections-order-detail)/OrderDetailHeader";
import PurchasedItemCard from "@/app/(main)/(sections-order-detail)/PurchasedItemCard";
import ShippingDetailsCard from "@/app/(main)/(sections-order-detail)/ShippingDetailsCard";
import PaymentDetailsCard from "@/app/(main)/(sections-order-detail)/PaymentDetailsCard";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { orderService, OrderDetail } from "@/core/services/orderService";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if(orderId) {
        try {
          const data = await orderService.getOrderDetail(orderId);
          setOrder(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchDetail();
  }, [orderId]);

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-700"/></div>;
  }

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold">Pesanan tidak ditemukan.</h1>
        <Link href="/account/orders" className="text-blue-600 hover:underline mt-4 block">
          Kembali ke Riwayat Pesanan
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <Link
        href="/account/orders"
        className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Riwayat Pesanan
      </Link>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Detail Pesanan</h1>
      </div>

      <OrderDetailHeader
        orderId={order.order_id.toString()}
        orderDate={order.order_date}
        status={order.order_status}
        paymentStatus={order.payment_status}
        totalPayment={order.total_payment}
      />

      {/* List Barang */}
      <div className="space-y-4">
        {order.items.map((item, index) => (
          <PurchasedItemCard key={index} item={item} />
        ))}
      </div>

      <ShippingDetailsCard
        recipientName={order.recipient_name}
        shippingAddress={order.shipping_address}
        estimatedDelivery={order.estimated_delivery}
      />

      <PaymentDetailsCard
        paymentMethod="Midtrans (Virtual Account / QRIS)"
        paymentStatus={order.payment_status}
        transactionRefId={order.payment_ref}
        redirectUrl={order.midtrans_redirect_url} // Kirim link bayar
      />
    </div>
  );
}