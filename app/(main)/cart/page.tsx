import CartClient from "../(sections-cart)/CartClient";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function CartPage() {
  // Tidak perlu fetch data di sini lagi karena CartClient sudah melakukannya sendiri via useEffect
  
  return (
    <ProtectedRoute>
      {/* Hapus prop initialItems */}
      <CartClient />
    </ProtectedRoute>
  );
}