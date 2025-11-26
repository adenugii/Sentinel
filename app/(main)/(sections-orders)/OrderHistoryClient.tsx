'use client';

import { useState } from "react";
import { OrderSummary } from "@/core/services/orderService";
import OrderCard from "./OrderCard";

interface OrderHistoryClientProps {
  orders: OrderSummary[];
}

// Mapping Tab ke Status Backend
// Kita pakai Payment Status sebagai acuan utama untuk Tab Sederhana
const TABS = [
  { label: "Semua", value: "all" },
  { label: "Menunggu Pembayaran", value: "pending" },
  { label: "Selesai", value: "paid" }, // Asumsi paid = selesai/diproses
];

export default function OrderHistoryClient({ orders }: OrderHistoryClientProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    // Filter berdasarkan payment_status dari API
    return order.payment_status === activeTab;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Riwayat Pesanan Saya</h1>

      {/* Tabs Navigasi */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.value)}
              className={`
                pb-3 px-1 text-sm font-medium whitespace-nowrap transition-colors
                ${
                  activeTab === tab.value
                    ? "text-blue-700 border-b-2 border-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Daftar Kartu Pesanan */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.order_id} order={order} />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
             <p className="text-gray-500">Tidak ada pesanan di kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}