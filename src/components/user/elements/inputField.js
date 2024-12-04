import React from 'react';

const InputField = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border px-2 py-1 rounded w-full"
  />
);

export default InputField;
