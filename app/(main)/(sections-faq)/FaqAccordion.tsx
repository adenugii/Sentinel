'use client';

import { useState } from 'react';
import { FaqItem } from '@/core/entities/faq';
import { Plus, Minus } from 'lucide-react';

interface FaqAccordionProps {
  items: FaqItem[];
}

// Komponen untuk satu item Accordion
function AccordionItem({ item }: { item: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      {/* Tombol Pertanyaan */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-5"
      >
        <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
        {isOpen ? (
          <Minus className="w-5 h-5 text-blue-700" />
        ) : (
          <Plus className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {/* Konten Jawaban */}
      {isOpen && (
        <div className="pb-5 pr-10">
          <p className="text-gray-600">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

// Komponen utama yang me-render list
export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </div>
  );
}