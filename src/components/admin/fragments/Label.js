import React from 'react';

const Label = ({ children }) => {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
};

export default Label;
