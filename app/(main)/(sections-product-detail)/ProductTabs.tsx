'use client';

import { useState } from 'react';

interface ProductTabsProps {
  description?: string;
}

export default function ProductTabs({ description }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('deskripsi');

  const tabs = [
    { id: 'deskripsi', label: 'Deskripsi Produk' },
    { id: 'spesifikasi', label: 'Spesifikasi Teknis' },
  ];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                pb-4 text-base font-medium transition-all relative
                ${
                  activeTab === tab.id
                    ? 'text-blue-700 font-bold'
                    : 'text-gray-500 hover:text-gray-800'
                }
              `}
            >
              {tab.label}
              {/* Garis bawah animasi */}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 rounded-t-md" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
        {activeTab === 'deskripsi' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {description ? (
              <p className="whitespace-pre-line">{description}</p>
            ) : (
              <p className="italic text-gray-400">Belum ada deskripsi untuk produk ini.</p>
            )}
          </div>
        )}

        {activeTab === 'spesifikasi' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg text-yellow-800 text-sm">
              <p className="font-semibold">Info Spesifikasi</p>
              Saat ini data spesifikasi lengkap sedang diperbarui dari server. Silakan mengacu pada deskripsi produk.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}