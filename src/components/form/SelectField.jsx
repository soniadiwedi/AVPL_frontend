import React from 'react';

const SelectField = ({ label, name, value, onChange, options = [], required = false }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="block text-sm font-semibold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        <option value="" disabled>Select {label}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
