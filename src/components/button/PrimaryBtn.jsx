import { FaSpinner } from "react-icons/fa";

export default function PrimaryBtn({
  children,
  onClick,
  disabled = false,
  loading = false,
  className = "",
}) {

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold border
        transition-all duration-150 whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white border-transparent shadow-sm px-5 py-2.5 text-sm rounded-lg
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : "active:scale-95"}
        ${className}`}
    >
      {loading ? (
        <FaSpinner className="animate-spin w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
}