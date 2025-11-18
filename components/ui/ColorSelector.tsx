'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

type ColorOption = {
  value: string;
  tailwindColor: string; // e.g., "bg-black", "bg-gray-300"
};

interface ColorSelectorProps {
  options: ColorOption[];
  defaultValue?: string;
}

export default function ColorSelector({ options, defaultValue }: ColorSelectorProps) {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);

  return (
    <div className="flex space-x-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setSelected(option.value)}
          title={option.value}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ring-2 ring-offset-2 transition-all
            ${option.tailwindColor}
            ${
              selected === option.value
                ? 'ring-blue-700'
                : 'ring-transparent'
            }
          `}
        >
          {selected === option.value && (
            <Check className="w-5 h-5 text-white mix-blend-difference" />
          )}
        </button>
      ))}
    </div>
  );
}