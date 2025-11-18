'use client';

import { useState } from "react";
import { Order, OrderStatus } from "@/core/entities/order";
import OrderCard from "./OrderCard"; // Kita akan buat ini selanjutnya

interface OrderHistoryClientProps {
  orders: Order[];
}

const TABS: { label: string; status: OrderStatus | "Semua" }[] = [
  { label: "Semua", status: "Semua" },
  { label: "Menunggu Pembayaran", status: "Menunggu Pembayaran" },
  { label: "Sedang Diproses", status: "Sedang Diproses" },
  { label: "Selesai", status: "Selesai" },
  { label: "Dibatalkan", status: "Dibatalkan" },
];

export default function OrderHistoryClient({ orders }: OrderHistoryClientProps) {
  const [activeTab, setActiveTab] = useState<OrderStatus | "Semua">("Semua");

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Semua") return true;
    return order.status === activeTab;
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
              onClick={() => setActiveTab(tab.status)}
              className={`
                pb-3 px-1 text-sm font-medium whitespace-nowrap
                ${
                  activeTab === tab.status
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
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            Tidak ada pesanan dengan status "{activeTab}".
          </p>
        )}
      </div>
    </div>
  );
}