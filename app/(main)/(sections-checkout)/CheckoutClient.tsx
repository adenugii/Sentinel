'use client';

import Input from "@/components/ui/Input";
import { MapPin, Truck, CreditCard, CheckCircle, Loader2 } from "lucide-react";
import OrderSummary from "@/app/(main)/(sections-checkout)/OrderSummary";
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

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });

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

  const handlePayment = async () => {
    if (!formData.address || !formData.city || !formData.fullName || !formData.phone) {
      alert("Mohon lengkapi data alamat pengiriman.");
      return;
    }

    setIsProcessing(true);

    try {
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.zipCode} (Penerima: ${formData.fullName}, ${formData.phone})`;

      const payload = {
        items: items.map(item => ({
          productId: item.product_id || item.id, 
          quantity: item.quantity
        })),
        shipping_address: fullAddress,
        payment_method: "midtrans"
      };

      const response = await transactionService.createTransaction(payload);

      if (response.data && response.data.redirect_url) {
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
      <div className="min-h-screen flex justify-center items-center bg-[#FAFAFA]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700"/>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Sederhana */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-500 mt-1">Lengkapi data pengiriman dan pembayaran Anda.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {/* === KOLOM KIRI: FORM === */}
          <main className="lg:col-span-2 space-y-8">
            
            {/* 1. Alamat Pengiriman */}
            <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <MapPin className="w-4 h-4" />
                 </div>
                 <h2 className="text-lg font-bold text-gray-900">Alamat Pengiriman</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <Input id="fullName" label="Nama Penerima" placeholder="Nama Lengkap" value={formData.fullName} onChange={handleInputChange} />
                </div>
                <div className="md:col-span-1">
                  <Input id="phone" label="No. Telepon / WA" placeholder="08xxxxxxxxxx" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="md:col-span-2">
                  <Input id="address" label="Alamat Lengkap" placeholder="Nama Jalan, Gedung, No. Rumah" value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="md:col-span-1">
                  <Input id="city" label="Kota / Kabupaten" placeholder="Contoh: Jakarta Selatan" value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="md:col-span-1">
                  <Input id="zipCode" label="Kode Pos" placeholder="xxxxx" value={formData.zipCode} onChange={handleInputChange} />
                </div>
              </div>
            </section>

            {/* 2. Pilihan Pengiriman */}
            <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Truck className="w-4 h-4" />
                 </div>
                 <h2 className="text-lg font-bold text-gray-900">Metode Pengiriman</h2>
              </div>

              {/* Card Pilihan */}
              <div className="border-2 border-blue-600 bg-blue-50/50 p-4 rounded-xl flex justify-between items-center cursor-default">
                <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full border-[6px] border-blue-600 bg-white"></div>
                    <div>
                        <p className="font-bold text-gray-900">Reguler (Sentinel Express)</p>
                        <p className="text-sm text-gray-500">Estimasi tiba 3-5 hari kerja</p>
                    </div>
                </div>
                <span className="font-bold text-green-600">Gratis</span>
              </div>
            </section>

            {/* 3. Metode Pembayaran */}
            <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <CreditCard className="w-4 h-4" />
                 </div>
                 <h2 className="text-lg font-bold text-gray-900">Pembayaran</h2>
              </div>

              <div className="space-y-4">
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Midtrans Payment Gateway
                    </div>
                    {/* BAGIAN LOGO KOTAK KOTAK DIHAPUS */}
                    <p className="text-xs text-gray-500 leading-relaxed">
                       Anda akan diarahkan ke halaman pembayaran aman Midtrans untuk menyelesaikan transaksi. Mendukung Transfer Bank (BCA, Mandiri, BRI, dll), E-Wallet (GoPay, OVO), dan QRIS.
                    </p>
                 </div>
              </div>
            </section>

          </main>

          {/* === KOLOM KANAN: RINGKASAN === */}
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