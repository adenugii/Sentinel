// core/services/cartService.ts
import apiClient from '@/lib/apiClient';
import { CartItem, CartResponse } from '../entities/cart';

export const cartService = {
  // Mengambil list keranjang
  getCartItems: async (): Promise<CartItem[]> => {
    try {
      const response = await apiClient.get<CartResponse>('/cart/');
      return response.data.data || [];
    } catch (error) {
      console.error("Gagal mengambil keranjang:", error);
      return [];
    }
  },

  // [BARU] Add to Cart (Untuk tombol di Product Card / Detail)
  addToCart: async (id: number | string) => {
    try {
      const payload = { productId: Number(id) }; // Pastikan Number & key 'productId'
      const response = await apiClient.post('/cart/add', payload);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Gagal menambahkan ke keranjang');
    }
  },

  // Increase (Hanya dipakai di halaman Cart untuk +1)
  increaseItem: async (id: number | string) => {
    const payload = { productId: Number(id) };
    const response = await apiClient.post('/cart/increase', payload);
    return response.data;
  },

  // Decrease (Hanya dipakai di halaman Cart untuk -1)
  decreaseItem: async (id: number | string) => {
    const payload = { productId: Number(id) };
    const response = await apiClient.post('/cart/decrease', payload);
    return response.data;
  },

  // Remove
  removeItem: async (id: number | string) => {
    const response = await apiClient.delete(`/cart/${id}`);
    return response.data;
  }
};