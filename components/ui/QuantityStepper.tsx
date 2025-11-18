'use client';

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  initialValue?: number;
}

export default function QuantityStepper({ initialValue = 1 }: QuantityStepperProps) {
  const [quantity, setQuantity] = useState(initialValue);

  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increment = () => setQuantity((prev) => prev + 1);

  return (
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        onClick={decrement}
        className="px-2 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        disabled={quantity === 1}
      >
        <Minus className="w-4 h-4" />
      </button>
      <input
        type="text"
        value={quantity}
        readOnly
        className="w-10 text-center border-l border-r border-gray-300 py-1"
      />
      <button
        onClick={increment}
        className="px-2 py-1 text-gray-700 hover:bg-gray-100"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}