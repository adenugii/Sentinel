import CheckoutClient from "../(sections-checkout)/CheckoutClient";
import ProtectedRoute from "@/components/layout/ProtectedRoute"; // <-- Import ini

export default async function CheckoutPage() {
  return (
    // Bungkus dengan ProtectedRoute
    <ProtectedRoute>
      <CheckoutClient />
    </ProtectedRoute>
  );
}