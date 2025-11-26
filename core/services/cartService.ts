// core/services/cartService.ts
import apiClient from '@/lib/apiClient';
import { CartItem, CartResponse } from '../entities/cart';

export const cartService = {
  getCartItems: async (): Promise<CartItem[]> => {
    try {
      const response = await apiClient.get<CartResponse>('/cart/');
      // Sesuaikan dengan struktur response backend Anda
      return response.data.data || [];
    } catch (error) {
      console.error("Gagal mengambil keranjang:", error);
      return [];
    }
  },

  // PERBAIKAN: Tambahkan parameter 'variant' di sini
  addToCart: async (productId: number | string, variant?: { color: string; memory: string }) => {
    try {
      const payload = { 
        productId: Number(productId),
        color: variant?.color,   // Kirim warna yang dipilih
        memory: variant?.memory  // Kirim memori yang dipilih
      };
      
      const response = await apiClient.post('/cart/add', payload);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Gagal menambahkan ke keranjang');
    }
  },

  increaseItem: async (id: number | string) => {
    const response = await apiClient.post('/cart/increase', { productId: Number(id) });
    return response.data;
  },

  decreaseItem: async (id: number | string) => {
    const response = await apiClient.post('/cart/decrease', { productId: Number(id) });
    return response.data;
  },

  removeItem: async (id: number | string) => {
    const response = await apiClient.delete(`/cart/${id}`);
    return response.data;
  }
};