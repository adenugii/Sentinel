'use client';

import { useState } from 'react';

export interface ColorOption {
  value: string;
  label: string;
}

interface ColorSelectorProps {
  options: ColorOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md'; // Tambahan prop size biar fleksibel
}

export default function ColorSelector({ options, defaultValue, onChange, size = 'md' }: ColorSelectorProps) {
  const [selected, setSelected] = useState(defaultValue || (options[0]?.value ?? ''));

  const handleSelect = (value: string) => {
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          className={`
            rounded-lg font-medium border transition-all duration-200 flex items-center justify-center
            ${size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}
            ${selected === option.value 
              ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' 
              : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }
          `}
          type="button"
        >
          {/* Tampilkan Label Teks Langsung */}
          {option.label}
        </button>
      ))}
    </div>
  );
}