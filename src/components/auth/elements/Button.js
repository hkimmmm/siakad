import React from 'react';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';

const variantStyles = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  purple: 'bg-purple-600 text-white hover:bg-purple-700',
  green: 'bg-green-500 text-white hover:bg-green-600'
};

const iconComponents = {
  edit: <FaEdit className="mr-2" />,
  delete: <FaTrash className="mr-2" />,
  detail: <FaInfoCircle className="mr-2" />
};

const Button = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  icon = null,
  className = '' // Menambahkan className sebagai properti
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center px-4 py-2 rounded ${
        variantStyles[variant]
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`} // Menambahkan justify-center dan items-center
    >
      {icon && iconComponents[icon]}
      {label}
    </button>
  );
};

export default Button;
