import React from 'react';

const AuthForm = ({
  title,
  fields,
  onSubmit,
  buttonText,
  buttonVariant,
  children
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {' '}
      {/* Reduced space between fields */}
      <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>{' '}
      {/* Adjusted margin-bottom for title */}
      {fields.map((field, index) => {
        if (field.type === 'select') {
          return (
            <div key={index} className="mb-2">
              {' '}
              {/* Reduced margin-bottom */}
              <label
                htmlFor={field.label}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <select
                id={field.label}
                name={field.label}
                value={field.value}
                onChange={field.onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              >
                <option value="">Select a role</option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return (
          <div key={index} className="mb-2">
            {' '}
            {/* Reduced margin-bottom */}
            <label
              htmlFor={field.label}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <input
              id={field.label}
              type={field.type}
              value={field.value}
              onChange={field.onChange}
              placeholder={field.placeholder}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        );
      })}
      {children}
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md ${
          buttonVariant === 'primary'
            ? 'bg-green-500 text-white'
            : 'bg-gray-500 text-white'
        } hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none`}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
