import { Order, OrderDetail } from "@/core/entities/order";
import { mockOrders, mockOrderDetailData } from "@/data/mock/orders";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const orderService = {
  // Mengambil daftar riwayat pesanan user
  getMyOrders: async (): Promise<Order[]> => {
    await delay(1000); // Simulasi loading agak lama
    return mockOrders;
  },

  // Mengambil detail satu pesanan
  getOrderDetail: async (orderId: string): Promise<OrderDetail | null> => {
    await delay(800);
    return mockOrderDetailData[orderId] || null;
  }
};