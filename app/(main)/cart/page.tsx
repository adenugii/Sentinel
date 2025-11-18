import { mockCartItems } from "@/data/mock/cart";
import CartClient from "../(sections-cart)/CartClient";

// Simulasi pengambilan data
const getCartItems = async () => {
  // Di dunia nyata, ini adalah 'await fetch(...)' atau 'cookies().get(...)'
  return mockCartItems;
};

export default async function CartPage() {
  const items = await getCartItems();
  
  return (
    // Layout (Navbar & Footer) sudah di-handle oleh app/layout.tsx
    <CartClient initialItems={items} />
  );
}