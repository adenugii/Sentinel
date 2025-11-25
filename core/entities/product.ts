// core/entities/product.ts

export interface Product {
  id: number;
  // UPDATE: Sekarang Array of string
  image: string[]; 
  name: string;
  // UPDATE: Sekarang Array of string
  memory: string[];
  // UPDATE: Sekarang Array of string
  color: string[];
  price: string;
  description?: string;
}

export interface ProductDetailResponse {
  product: Product;
}

export interface ProductResponse {
  products: Product[];
}