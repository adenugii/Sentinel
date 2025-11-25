// core/services/transactionService.ts
import apiClient from '@/lib/apiClient';

interface TransactionItem {
  productId: number;
  quantity: number;
}

interface TransactionPayload {
  items: TransactionItem[];
  shipping_address: string;
  payment_method: string;
}

export interface TransactionResponse {
  message: string;
  data: {
    id: number;
    total_amount: string;
    payment_status: string;
    created_at: string;
    payment_gateway_references: string;
    midtrans_token: string;
    redirect_url: string; // <-- Kita butuh ini untuk redirect
  };
}

export const transactionService = {
  createTransaction: async (payload: TransactionPayload): Promise<TransactionResponse> => {
    try {
      const response = await apiClient.post<TransactionResponse>('/transactions/', payload);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Gagal membuat transaksi');
    }
  }
};