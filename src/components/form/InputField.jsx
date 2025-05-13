const InputField = ({ label, type, name, value, onChange, required = false }) => {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        required={required}
        aria-required={required}
      />
    </div>
  );
};

export default InputField;
