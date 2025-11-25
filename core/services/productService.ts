import { Product, ProductResponse, ProductDetailResponse } from '../entities/product';

// Definisikan URL manual atau ambil dari ENV (tanpa lewat proxy next.js karena ini jalan di server)
// Saat di Server Component, request langsung ke Backend Vercel lebih aman daripada ke localhost
const API_URL = "https://sentinel-api-ochre.vercel.app/api";

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_URL}/products/`, {
        method: 'GET',
        cache: 'no-store', 
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const json: ProductResponse = await response.json();
      
      // PERBAIKAN UTAMA DISINI:
      // Ambil dari .products, bukan .data
      return json.products || []; 
      
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return []; 
    }
  },

  getProductById: async (id: string | number): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'GET',
        cache: 'no-store',
      });
      
      if (!response.ok) {
        return null;
      }
      
      const json: ProductDetailResponse = await response.json();
      
      // PERBAIKAN DISINI: Ambil 'product', bukan 'data'
      return json.product || null; 
      
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      return null;
    }
  }
};