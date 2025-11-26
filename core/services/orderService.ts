// core/services/orderService.ts
import apiClient from '@/lib/apiClient';

// Tipe Item dalam Transaksi
export interface TransactionItem {
  product_name: string;
  product_image: string[]; // Array string
  product_sku: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
}

// Tipe Detail Transaksi (Sesuai Dokumentasi BE)
export interface OrderDetail {
  order_id: number;
  payment_ref: string;
  order_date: string;
  recipient_name: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'expire';
  order_status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  total_payment: number;
  shipping_address: string;
  estimated_delivery: string;
  midtrans_token: string;
  midtrans_redirect_url: string;
  items: TransactionItem[];
}

// Tipe Ringkasan untuk List (Biasanya mirip detail tapi lebih ringkas)
// Kita asumsi endpoint list mengembalikan struktur serupa
export interface OrderSummary extends OrderDetail {}

export const orderService = {
  // GET All Orders
  getMyOrders: async (): Promise<OrderSummary[]> => {
    try {
      const response = await apiClient.get<{ data: OrderSummary[] }>('/transactions');
      // Pastikan return array, jika backend bungkus dalam data.data
      return response.data.data || [];
    } catch (error) {
      console.error("Gagal mengambil riwayat pesanan:", error);
      return [];
    }
  },

  // GET Order Detail
  getOrderDetail: async (id: string): Promise<OrderDetail | null> => {
    try {
      const response = await apiClient.get<{ data: OrderDetail }>(`/transactions/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Gagal mengambil detail pesanan ${id}:`, error);
      return null;
    }
  }
};