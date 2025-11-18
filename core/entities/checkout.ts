export interface CheckoutItem {
  id: string;
  name: string;
  details: string;
  quantity: number;
  price: number;
  icon: 'shield' | 'lock'; // Untuk memetakan ikon
}

export interface OrderSummaryData {
  items: CheckoutItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}