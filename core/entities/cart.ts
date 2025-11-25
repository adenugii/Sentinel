// core/entities/cart.ts

export interface CartItem {
  id: number;
  product_id?: number;
  name: string;
  image: string | string[]; 
  price: string;
  color: string | string[];
  memory: string | string[];
  quantity: number;
}

export interface CartResponse {
  success: boolean;
  data: CartItem[];
}