export type OrderStatus = "Selesai" | "Menunggu Pembayaran" | "Sedang Diproses" | "Dibatalkan";
export type PaymentStatus = "Lunas" | "Menunggu" | "Gagal";

export interface OrderItem {
  id: string;
  name: string;
  imageUrl: string;
  model: string;
  isEligible: boolean;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string; // ID unik (misal: "1", "2")
  orderId: string; // ID yang dilihat user (misal: "SEN-123456")
  date: string;
  items: string; // Deskripsi singkat (untuk daftar)
  total: number;
  status: OrderStatus;
}

// Tipe data detail untuk halaman ini
export interface OrderDetail extends Omit<Order, 'items' | 'total'> {
  totalPayment: number;
  purchasedItems: OrderItem[];
  shippingDetails: {
    recipientName: string;
    shippingAddress: string;
    estimatedDelivery: string;
  };
  paymentDetails: {
    paymentMethod: string;
    paymentStatus: PaymentStatus;
    transactionRefId: string;
  };
}