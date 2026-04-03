const Input = ({ label, ...props }) => {
  return (
    <div className="mb-4">

      {label && (
        <label className="block text-sm text-gray-600 mb-1">
          {label}
        </label>
      )}

      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

    </div>
  );
};

export default Input;