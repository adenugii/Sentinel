export interface CartItem {
  id: string; // ID unik untuk item keranjang (bisa jadi ID produk + varian)
  productId: string;
  name: string;
  details: string; // Misal: "256GB, Hitam"
  imageUrl: string;
  price: number;
  quantity: number;
}