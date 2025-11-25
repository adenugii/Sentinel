// app/(main)/cart/page.tsx
import CartClient from "../(sections-cart)/CartClient";

export default function CartPage() {
  // Fetching dipindahkan ke Client Component (CartClient)
  // karena butuh akses Token di browser cookies.
  return (
    <CartClient />
  );
}