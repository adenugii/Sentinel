import { Product } from "@/core/entities/product";
import { featuredProducts } from "@/data/mock/products";

// Helper delay untuk simulasi network
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
  // Mengambil semua produk (untuk halaman /products)
  getAllProducts: async (): Promise<Product[]> => {
    await delay(800); // Simulasi loading
    // Menggabungkan mock data agar terlihat banyak (seperti logika sebelumnya)
    const allProducts = [
      ...featuredProducts,
      ...featuredProducts.slice(0, 4)
    ]; 
    return allProducts;
  },

  // Mengambil produk unggulan (untuk Homepage)
  getFeaturedProducts: async (): Promise<Product[]> => {
    await delay(500);
    return featuredProducts;
  },

  // Mengambil detail produk berdasarkan ID (slug)
  getProductById: async (id: string): Promise<any | null> => {
    await delay(600);
    
    // Mencari produk di mock data (simulasi ID sederhana)
    // Di real app, ini akan mencari berdasarkan slug/ID yang sebenarnya
    const product = featuredProducts.find((p) => p.id === id) || featuredProducts[0]; 
    
    if (!product) return null;

    // Return data detail (simulasi penambahan gambar detail)
    return {
       ...product,
       images: [
        product.imageUrl,
        "/images/iphone-15-pro.png",
        "/images/macbook-pro-m3.png",
        "/images/apple-watch-ultra.png",
       ]
    };
  }
};