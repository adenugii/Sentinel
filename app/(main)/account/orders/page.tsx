'use client';

import { useEffect, useState } from "react";
import OrderHistoryClient from "@/app/(main)/(sections-orders)/OrderHistoryClient";
import { orderService, OrderSummary } from "@/core/services/orderService";
import { Loader2 } from "lucide-react";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getMyOrders();
        // Urutkan dari yang terbaru (opsional, jika BE belum urut)
        const sortedData = data.sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime());
        setOrders(sortedData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
      </div>
    );
  }

  return (
    <OrderHistoryClient orders={orders} />
  );
}