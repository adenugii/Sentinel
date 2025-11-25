'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

export interface ColorOption {
  value: string;
  label?: string; // Optional, untuk tooltip
  tailwindColor: string;
}

interface ColorSelectorProps {
  options: ColorOption[];
  defaultValue?: string;
  onChange?: (value: string) => void; // <-- TAMBAHKAN INI
}

export default function ColorSelector({ options, defaultValue, onChange }: ColorSelectorProps) {
  const [selected, setSelected] = useState(defaultValue || (options[0]?.value ?? ''));

  const handleSelect = (value: string) => {
    setSelected(value);
    // Panggil onChange jika ada (untuk memberitahu parent)
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
            w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-200 shadow-sm
            ${option.tailwindColor} 
            ${selected === option.value 
              ? 'ring-2 ring-offset-2 ring-blue-600 scale-110' 
              : 'hover:scale-105 ring-1 ring-black/5'
            }
          `}
          title={option.label || option.value}
          type="button"
        >
          {selected === option.value && (
            <Check className="w-5 h-5 text-white drop-shadow-md" strokeWidth={3} />
          )}
        </button>
      ))}
    </div>
  );
}