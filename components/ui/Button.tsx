import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "primary", 
  className, 
  ...props 
}) => {
  const baseStyle = "w-full py-2 px-4 rounded-md font-semibold transition-colors";
  
  const variantStyles = {
    primary: "bg-green-500 text-white hover:bg-green-600",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;