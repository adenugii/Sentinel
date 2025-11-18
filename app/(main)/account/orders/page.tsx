import { mockOrders } from "@/data/mock/orders";
import OrderHistoryClient from "@/app/(main)/(sections-orders)/OrderHistoryClient";

// Simulasi pengambilan data
const getOrders = async () => {
  // Di dunia nyata, ini adalah 'await fetch(...)'
  return mockOrders;
};

export default async function OrderHistoryPage() {
  const orders = await getOrders();

  return (
    // Layout 2 kolom (Sidebar + Konten)
    // sudah di-handle oleh app/account/layout.tsx
    <OrderHistoryClient orders={orders} />
  );
}