'use client';

import { useState } from 'react';

export interface VariantOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface VariantSelectorProps {
  options: VariantOption[];
  defaultValue?: string;
  onChange?: (value: string) => void; // <-- TAMBAHKAN INI
}

export default function VariantSelector({ options, defaultValue, onChange }: VariantSelectorProps) {
  const [selected, setSelected] = useState(defaultValue || (options[0]?.value ?? ''));

  const handleSelect = (value: string) => {
    setSelected(value);
    // Panggil onChange jika ada
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => !option.disabled && handleSelect(option.value)}
          disabled={option.disabled}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200
            ${
              selected === option.value
                ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }
            ${option.disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
          `}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}