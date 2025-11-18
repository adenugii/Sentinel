import React from 'react';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  description?: string;
}

export default function Radio({ label, description, id, name, ...props }: RadioProps) {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        type="radio"
        className="h-4 w-4 text-blue-700 border-gray-300 focus:ring-blue-600"
        {...props}
      />
      <label htmlFor={id} className="ml-3 block text-sm">
        <span className="font-medium text-gray-900">{label}</span>
        {description && <span className="text-gray-500 ml-1">{description}</span>}
      </label>
    </div>
  );
}