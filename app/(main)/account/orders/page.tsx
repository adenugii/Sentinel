import OrderHistoryClient from "@/app/(main)/(sections-orders)/OrderHistoryClient";
import { orderService } from "@/core/services/orderService"; // <-- Import Service

export default async function OrderHistoryPage() {
  // PANGGIL SERVICE
  const orders = await orderService.getMyOrders();

  return (
    <OrderHistoryClient orders={orders} />
  );
}