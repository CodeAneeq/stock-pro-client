export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  prefix,
  className = "",
  disabled = false,
  error = "",
  ...rest
}) {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label className="text-xs font-medium text-gray-500">{label}</label>
      )}
      <div
        className={`flex items-center border rounded-lg bg-white overflow-hidden transition-all
          ${error ? "border-red-400 focus-within:ring-1 focus-within:ring-red-400"
                  : "border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"}
          ${disabled ? "bg-gray-50 opacity-60 cursor-not-allowed" : ""}`}
      >
        {prefix && (
          <span className="pl-3 pr-1 text-sm text-gray-400 select-none whitespace-nowrap">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none w-full disabled:cursor-not-allowed"
          {...rest}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}