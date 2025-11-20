import CartClient from "../(sections-cart)/CartClient";
import { cartService } from "@/services/cartService"; // <-- Import Service

export default async function CartPage() {
  // PANGGIL SERVICE
  const items = await cartService.getCartItems();
  
  return (
    <CartClient initialItems={items} />
  );
}