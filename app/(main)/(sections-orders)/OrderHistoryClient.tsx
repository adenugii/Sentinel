'use client';

import { useState } from "react";
import { OrderSummary } from "@/core/services/orderService";
import OrderCard from "./OrderCard";
import { Search } from "lucide-react";

interface OrderHistoryClientProps {
  orders: OrderSummary[];
}

const TABS = [
  { label: "Semua", value: "all" },
  { label: "Menunggu Pembayaran", value: "pending" },
  { label: "Selesai", value: "paid" },
];

export default function OrderHistoryClient({ orders }: OrderHistoryClientProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState(""); // Fitur tambahan: Search

  // Filter gabungan: Tab + Search
  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "all" || order.payment_status === activeTab;
    const matchesSearch = order.order_id.toString().includes(searchQuery) || 
                          order.items.some(item => item.product_name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Riwayat Pesanan</h1>
        
        {/* Search Bar Kecil */}
        <div className="relative w-full md:w-64">
            <input 
                type="text" 
                placeholder="Cari ID Pesanan atau Produk..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Tabs Navigasi (Pill Style) */}
      <div className="border-b border-gray-100">
        <nav className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.value)}
              className={`
                px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap
                ${
                  activeTab === tab.value
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
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
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
             <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
             </div>
             <h3 className="text-gray-900 font-semibold mb-1">Tidak ada pesanan ditemukan</h3>
             <p className="text-gray-500 text-sm">Coba ubah filter atau kata kunci pencarian Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}