'use client';

import { useState } from "react";
import { Search, Plus, Minus, MessageCircle, Mail, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";

// Sesuaikan tipe data dengan service Anda
interface FaqItem {
  id: number | string;
  question: string;
  answer: string;
  category?: string; // Opsional jika ada
}

interface FaqClientProps {
  initialFaqs: FaqItem[];
}

export default function FaqClient({ initialFaqs }: FaqClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<number | string | null>(null);

  // Logic Search Real-time
  const filteredFaqs = initialFaqs.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (id: number | string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div>
      {/* 1. HERO SECTION DENGAN SEARCH */}
      <section className="relative bg-[#0E182D] text-white py-20 px-4 overflow-hidden">
        {/* Ornamen Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-green-500/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Bagaimana kami bisa membantu?
          </h1>
          <p className="text-gray-300 text-lg">
            Cari jawaban seputar garansi, blockchain, dan layanan Sentinel.
          </p>

          {/* Search Bar Besar */}
          <div className="relative max-w-xl mx-auto mt-8">
            <input
              type="text"
              placeholder="Ketik kata kunci (misal: klaim garansi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-lg transition-all text-base"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </section>

      {/* 2. FAQ LIST SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {filteredFaqs.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="group">
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className={`w-full flex items-center justify-between p-6 text-left transition-all duration-200 hover:bg-gray-50 ${openId === faq.id ? 'bg-blue-50/50' : ''}`}
                  >
                    <span className={`font-semibold text-lg ${openId === faq.id ? 'text-blue-700' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>
                    <span className={`ml-4 flex-shrink-0 p-1 rounded-full border transition-all duration-200 ${openId === faq.id ? 'bg-blue-600 border-blue-600 text-white rotate-180' : 'border-gray-200 text-gray-400 group-hover:border-gray-300'}`}>
                      {openId === faq.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  
                  {/* Content Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openId === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-transparent">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Tidak ditemukan</h3>
              <p className="text-gray-500 mt-2">Coba gunakan kata kunci lain.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. CONTACT SUPPORT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Masih butuh bantuan?</h2>
          <p className="text-gray-600 mt-2">Tim support kami siap melayani Anda 24/7.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Live Chat */}
          <Link href="#" className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Live Chat</h3>
            <p className="text-sm text-gray-500 mb-4">Bicara langsung dengan agen kami.</p>
            <span className="text-blue-700 text-sm font-semibold flex items-center justify-center">
              Mulai Chat <ChevronRight className="w-4 h-4 ml-1" />
            </span>
          </Link>

          {/* Card 2: Email */}
          <Link href="mailto:support@sentinel.id" className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-green-200 transition-all text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Email Support</h3>
            <p className="text-sm text-gray-500 mb-4">Respon dalam 1x24 jam kerja.</p>
            <span className="text-green-700 text-sm font-semibold flex items-center justify-center">
              Kirim Email <ChevronRight className="w-4 h-4 ml-1" />
            </span>
          </Link>

          {/* Card 3: WhatsApp */}
          <Link href="#" className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-emerald-200 transition-all text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
            <p className="text-sm text-gray-500 mb-4">Fast response via WhatsApp resmi.</p>
            <span className="text-emerald-700 text-sm font-semibold flex items-center justify-center">
              Chat WA <ChevronRight className="w-4 h-4 ml-1" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}