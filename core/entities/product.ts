// core/entities/product.ts

export interface Product {
  id: number | string;
  name: string;
  price: string | number;
  image: string[]; // Pastikan ini array string
  description: string;
  
  // Tambahkan properti ini:
  sku?: string; // Opsional (?) karena mungkin data lama tidak punya SKU
  color?: string[];
  memory?: string[];
  
  // Properti lain yang mungkin ada dari API
  category?: string;
  stock?: number;
}

export interface ProductDetailResponse {
  product: Product;
}

export interface ProductResponse {
  products: Product[];
}