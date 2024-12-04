import React from 'react';
import Label from '../elements/Label';

const FormField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  children,
  accept,
  error // Tambahkan prop error
}) => (
  <div className="mb-4">
    <Label>{label}</Label>
    {type === 'select' ? (
      <select
        className={`border border-gray-300 rounded-md p-2 w-full ${
          error ? 'border-red-500' : ''
        }`}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>
    ) : type === 'file' ? (
      <input
        type="file"
        accept={accept || 'image/*'} // Default hanya untuk file gambar
        onChange={onChange}
        className={`border border-gray-300 rounded-md p-2 w-full text-sm text-gray-700 cursor-pointer ${
          error ? 'border-red-500' : ''
        }`}
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 rounded-md p-2 w-full ${
          error ? 'border-red-500' : ''
        }`}
      />
    )}
    {/* Tampilkan pesan error jika ada */}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default FormField;
