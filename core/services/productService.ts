// core/services/productService.ts
import apiClient from '@/lib/apiClient';
import { Product } from '../entities/product';

// URL API Eksternal (Untuk Server Side)
const API_EXTERNAL_URL = "https://sentinel-api-ochre.vercel.app/api";

interface ProductResponse {
  products: Product[];
}

interface ProductDetailResponse {
  product: Product;
}

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      // Cek environment: Apakah kita di Server (Node.js) atau Client (Browser)?
      const isServer = typeof window === 'undefined';

      if (isServer) {
        // --- LOGIKA SERVER (Dashboard/Home) ---
        // Gunakan fetch native dengan Full URL.
        // Server tidak kena masalah CORS, jadi aman tembak langsung.
        const res = await fetch(`${API_EXTERNAL_URL}/products/`, { 
          method: 'GET',
          cache: 'no-store' // Selalu ambil data terbaru
        });
        
        if (!res.ok) return [];
        const json = await res.json();
        return json.products || [];

      } else {
        // --- LOGIKA CLIENT (Halaman Products) ---
        // Gunakan apiClient (Axios) yang mengarah ke /api/proxy
        // Ini wajib untuk menghindari error CORS di browser.
        const response = await apiClient.get<ProductResponse>('/products/');
        return response.data.products || [];
      }

    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  },

  getProductById: async (id: string | number): Promise<Product | null> => {
    try {
      const isServer = typeof window === 'undefined';

      if (isServer) {
        // Server Side Fetch
        const res = await fetch(`${API_EXTERNAL_URL}/products/${id}`, { 
          cache: 'no-store' 
        });
        
        if (!res.ok) return null;
        const json = await res.json();
        // Handle format response backend (kadang {product: ...} atau {data: ...})
        return (json as any).product || (json as any).data || null;

      } else {
        // Client Side Fetch (via Proxy)
        const response = await apiClient.get<ProductDetailResponse>(`/products/${id}`);
        return response.data.product || null;
      }

    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      return null;
    }
  }
};