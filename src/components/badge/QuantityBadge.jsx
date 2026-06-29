export default function QtyBadge({ qty, threshold = 60 }) {
  
  const isLow = qty <= threshold;
  return (
    <span
    className={`inline-flex items-center justify-center min-w-[40px] px-2 py-0.5 rounded text-xs font-bold
        ${isLow ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
    >
      {qty}
    </span>
  );
}
