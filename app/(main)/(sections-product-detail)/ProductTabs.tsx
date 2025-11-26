'use client';

import { useState } from "react";

interface ProductTabsProps {
  description: string;
}

export default function ProductTabs({ description }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"deskripsi" | "spesifikasi">("deskripsi");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Tab Header */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("deskripsi")}
          className={`px-8 py-4 text-sm font-bold transition-colors border-b-2 ${
            activeTab === "deskripsi"
              ? "border-blue-700 text-blue-700 bg-blue-50/50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          Deskripsi Produk
        </button>
        <button
          onClick={() => setActiveTab("spesifikasi")}
          className={`px-8 py-4 text-sm font-bold transition-colors border-b-2 ${
            activeTab === "spesifikasi"
              ? "border-blue-700 text-blue-700 bg-blue-50/50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          Spesifikasi Teknis
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === "deskripsi" && (
          <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
            <p className="whitespace-pre-line">{description}</p>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-sm text-yellow-800">
              <strong>Info Penting:</strong> Pastikan Anda merekam video unboxing saat menerima paket untuk keperluan klaim garansi fisik jika terjadi kerusakan pengiriman.
            </div>
          </div>
        )}

        {activeTab === "spesifikasi" && (
          <div>
            <table className="w-full text-sm text-left">
              <tbody className="divide-y divide-gray-100">
                {/* Mock Data Spesifikasi (karena API belum kirim detail spek) */}
                {[
                  { label: "Kondisi", value: "Baru" },
                  { label: "Kategori", value: "Gadget & Elektronik" },
                  { label: "Berat", value: "500 gram" },
                  { label: "Garansi", value: "Resmi 1 Tahun (Sentinel)" },
                  { label: "Kelengkapan", value: "Unit, Charger, Buku Panduan" },
                ].map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"}>
                    <td className="py-3 px-4 font-medium text-gray-500 w-1/3">{item.label}</td>
                    <td className="py-3 px-4 text-gray-900">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}