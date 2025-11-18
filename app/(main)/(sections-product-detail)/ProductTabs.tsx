'use client';

import { useState } from 'react';

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('deskripsi');

  const tabs = [
    { id: 'deskripsi', label: 'Deskripsi' },
    { id: 'spesifikasi', label: 'Spesifikasi' },
  ];

  // Konten mock
  const content = {
    deskripsi: (
      <>
        <p className="mb-4">
          Samsung Galaxy S25 Ultra menghadirkan inovasi terdepan dalam teknologi smartphone. Dengan desain premium yang elegan dan performa yang tak tertandingi, perangkat ini dirancang untuk memenuhi kebutuhan pengguna yang menginginkan yang terbaik.
        </p>
        <p>
          Dilengkapi dengan layar Dynamic AMOLED 2X berukuran 6.8 inci yang memberikan pengalaman visual yang memukau. Kamera utama 200MP dengan teknologi AI terbaru memungkinkan Anda mengabadikan momen dengan detail yang luar biasa, bahkan dalam kondisi cahaya rendah.
        </p>
      </>
    ),
    spesifikasi: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Layar: 6.8" Dynamic AMOLED 2X, 144Hz</li>
        <li>Prosesor: Snapdragon 8 Gen 4 (Contoh)</li>
        <li>Kamera Utama: 200MP Wide, 50MP Periscope, 12MP Ultrawide</li>
        <li>Baterai: 5000mAh dengan 45W fast charging</li>
        <li>OS: Android 15, One UI 7</li>
      </ul>
    ),
  };

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                pb-3 text-base font-medium
                ${
                  activeTab === tab.id
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="prose max-w-none text-gray-700">
        {activeTab === 'deskripsi' && content.deskripsi}
        {activeTab === 'spesifikasi' && content.spesifikasi}
      </div>
    </div>
  );
}