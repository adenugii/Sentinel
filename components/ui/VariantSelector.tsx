'use client';

import { useState } from 'react';

type Option = {
  value: string;
  label: string;
};

interface VariantSelectorProps {
  options: Option[];
  defaultValue?: string;
}

export default function VariantSelector({ options, defaultValue }: VariantSelectorProps) {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);

  return (
    <div className="flex space-x-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setSelected(option.value)}
          className={`
            px-6 py-2 rounded-md border text-sm font-medium
            ${
              selected === option.value
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}