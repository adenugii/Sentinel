'use client';

import Input from "@/components/ui/Input";
import Radio from "@/components/ui/Radio";
import Accordion from "@/components/ui/Accordion";
import { Landmark, CreditCard, Wallet, CheckCircle, Loader2 } from "lucide-react";
import OrderSummary from "./OrderSummary";
import { useState, useEffect } from "react";
import { cartService } from "@/core/services/cartService";
import { transactionService } from "@/core/services/transactionService";
import { CartItem } from "@/core/entities/cart";
import { useRouter } from "next/navigation";

export default function CheckoutClient() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // State Form Alamat
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });

  // Load Cart Data Real
  useEffect(() => {
    const loadData = async () => {
      try {
        const cartData = await cartService.getCartItems();
        setItems(cartData);
      } catch (error) {
        console.error("Gagal load cart", error);
      } finally {
        setIsLoadingCart(false);
      }
    };
    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // LOGIKA PEMBAYARAN (CONNECT KE BACKEND)
  const handlePayment = async () => {
    // 1. Validasi Input
    if (!formData.address || !formData.city || !formData.fullName || !formData.phone) {
      alert("Mohon lengkapi data alamat pengiriman.");
      return;
    }

    setIsProcessing(true);

    try {
      // 2. Siapkan Payload (Format JSON Backend)
      // Backend minta string shipping_address, jadi kita gabungkan input user
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.zipCode} (Penerima: ${formData.fullName}, ${formData.phone})`;

      const payload = {
        items: items.map(item => ({
          // Gunakan product_id (dari cart) sebagai productId
          productId: item.product_id || item.id, 
          quantity: item.quantity
        })),
        shipping_address: fullAddress,
        payment_method: "midtrans" // Default value (Midtrans Snap akan handle pilihan bank nanti)
      };

      // 3. Panggil API Transactions
      const response = await transactionService.createTransaction(payload);

      // 4. Redirect ke Halaman Pembayaran Midtrans
      if (response.data && response.data.redirect_url) {
        // Buka URL Midtrans di tab yang sama
        window.location.href = response.data.redirect_url;
      } else {
        alert("Gagal mendapatkan link pembayaran.");
      }

    } catch (error: any) {
      console.error("Transaction Error:", error);
      alert(error.message || "Gagal memproses transaksi.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoadingCart) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700"/>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* === KOLOM KIRI: FORM === */}
          <main className="lg:col-span-2 space-y-8">
            
            {/* 1. Alamat Pengiriman */}
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Alamat Pengiriman</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-1">
                    <Input id="fullName" label="Nama Lengkap" placeholder="Masukkan nama lengkap" value={formData.fullName} onChange={handleInputChange} />
                  </div>
                  <div className="md:col-span-1">
                    <Input id="phone" label="No. Telepon" placeholder="08xxxxxxxxxx" value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="md:col-span-2">
                    <Input id="address" label="Alamat Lengkap" placeholder="Jalan, No. Rumah, RT/RW" value={formData.address} onChange={handleInputChange} />
                  </div>
                  <div className="md:col-span-1">
                    <Input id="city" label="Kota" placeholder="Contoh: Malang" value={formData.city} onChange={handleInputChange} />
                  </div>
                  <div className="md:col-span-1">
                    <Input id="zipCode" label="Kode Pos" placeholder="12345" value={formData.zipCode} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Pilihan Pengiriman (Static) */}
            <section>
              <h2 className="text-xl font-semibold mb-4">2. Pilihan Pengiriman</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center">
                  <Radio 
                    id="regular" 
                    name="shipping" 
                    label="Reguler (3-5 hari kerja)"
                    description="Pengiriman standar Sentinel"
                    defaultChecked 
                  />
                  <span className="font-semibold text-gray-900">Gratis</span>
                </div>
              </div>
            </section>

            {/* 3. Metode Pembayaran (Info Only) */}
            <section>
              <h2 className="text-xl font-semibold mb-4">3. Metode Pembayaran</h2>
              <p className="text-sm text-gray-500 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-1.5" />
                Semua pembayaran aman dan diproses otomatis oleh Midtrans
              </p>
              <div className="space-y-3">
                 <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg text-blue-800 text-sm">
                    <strong>Info Pembayaran:</strong> Anda akan diarahkan ke halaman pembayaran aman Midtrans setelah menekan tombol "Bayar Sekarang". Anda bisa memilih BCA, Mandiri, BRI, QRIS, GoPay, dll di sana.
                 </div>
              </div>
            </section>

          </main>

          {/* === KOLOM KANAN: RINGKASAN === */}
          {/* Gunakan OrderSummary yang sudah kita buat sebelumnya */}
          <OrderSummary 
            items={items} 
            onPay={handlePayment} 
            isLoading={isProcessing} 
          />

        </div>
      </div>
    </div>
  );
}