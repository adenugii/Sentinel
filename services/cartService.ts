import { CartItem } from "@/core/entities/cart";
import { mockCartItems } from "@/data/mock/cart";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const cartService = {
  // Mengambil item keranjang
  getCartItems: async (): Promise<CartItem[]> => {
    await delay(500);
    return mockCartItems;
  },

  // Simulasi menambah item (belum persist ke DB)
  addToCart: async (item: CartItem): Promise<boolean> => {
    await delay(300);
    console.log("Added to cart:", item);
    return true;
  },

  // Simulasi menghapus item
  removeFromCart: async (id: string): Promise<boolean> => {
    await delay(300);
    console.log("Removed from cart:", id);
    return true;
  }
};