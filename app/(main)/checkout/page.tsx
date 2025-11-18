import CheckoutClient from "../(sections-checkout)/CheckoutClient";

// Halaman ini tetap Server Component
// Di app nyata, Anda bisa fetch data user/alamat tersimpan di sini
export default async function CheckoutPage() {
  // const userAddress = await getUserAddress(); 
  
  return (
    // Layout (Navbar & Footer) sudah di-handle oleh app/layout.tsx
    // Kita passing data ke client component
    <CheckoutClient /> // Nanti: <CheckoutClient userAddress={userAddress} />
  );
}