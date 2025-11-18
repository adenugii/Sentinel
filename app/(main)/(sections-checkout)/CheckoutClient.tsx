'use client';

import Input from "@/components/ui/Input";
import Radio from "@/components/ui/Radio";
import Accordion from "@/components/ui/Accordion";
import { Landmark, CreditCard, Wallet, CheckCircle } from "lucide-react";
import OrderSummary from "./OrderSummary";

export default function CheckoutClient() {
  // Di aplikasi nyata, state form akan dikelola di sini
  // (misalnya menggunakan react-hook-form)

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
              {/* Di app nyata, form ini akan menjadi <form> */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-1">
                    <Input id="nama-lengkap" label="Nama Lengkap" placeholder="Masukkan nama lengkap" />
                  </div>
                  <div className="md:col-span-1">
                    <Input id="no-telepon" label="No. Telepon" placeholder="08xxxxxxxxxx" />
                  </div>
                  <div className="md:col-span-2">
                    <Input id="alamat-lengkap" label="Alamat Lengkap" placeholder="Masukkan alamat lengkap" />
                  </div>
                  <div className="md:col-span-1">
                    <Input id="kota" label="Kota" placeholder="Masukkan kota" />
                  </div>
                  <div className="md:col-span-1">
                    <Input id="kode-pos" label="Kode Pos" placeholder="12345" />
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Pilihan Pengiriman */}
            <section>
              <h2 className="text-xl font-semibold mb-4">2. Pilihan Pengiriman</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center">
                  <Radio 
                    id="regular" 
                    name="shipping" 
                    label="Reguler (3-5 hari kerja)"
                    description="Pengiriman standar"
                    defaultChecked 
                  />
                  <span className="font-semibold text-gray-900">Free</span>
                </div>
                {/* Anda bisa tambahkan opsi pengiriman lain di sini */}
              </div>
            </section>

            {/* 3. Metode Pembayaran */}
            <section>
              <h2 className="text-xl font-semibold mb-4">3. Metode Pembayaran</h2>
              <p className="text-sm text-gray-500 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-1.5" />
                Semua pembayaran aman dan diproses oleh Midtrans
              </p>
              <div className="space-y-3">
                <Accordion 
                  title={<><Landmark className="w-5 h-5 text-blue-700" /> <span className="font-semibold">Virtual Account</span></>}
                  defaultOpen // Dibuka secara default
                >
                  <p className="text-gray-600">Pilih bank Virtual Account Anda...</p>
                  {/* Tambahkan daftar bank di sini */}
                </Accordion>
                <Accordion 
                  title={<><CreditCard className="w-5 h-5 text-blue-700" /> <span className="font-semibold">Kartu Kredit</span></>}
                >
                  <p className="text-gray-600">Masukkan detail kartu kredit Anda...</p>
                  {/* Tambahkan form kartu kredit di sini */}
                </Accordion>
                <Accordion 
                  title={<><Wallet className="w-5 h-5 text-blue-700" /> <span className="font-semibold">E-Wallet</span></>}
                >
                  <p className="text-gray-600">Pilih E-Wallet Anda...</p>
                  {/* Tambahkan pilihan E-Wallet di sini */}
                </Accordion>
              </div>
            </section>

          </main>

          {/* === KOLOM KANAN: RINGKASAN === */}
          <OrderSummary />

        </div>
      </div>
    </div>
  );
}