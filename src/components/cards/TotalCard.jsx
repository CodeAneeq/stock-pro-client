export default function TotalCard({ total = 4250 }) {
  return (
    <div className="inline-flex flex-col gap-1 border-2 border-blue-500 rounded-xl px-5 py-3 bg-white">
      <p className="text-xs font-medium text-gray-500 whitespace-nowrap">
        Total Sales (Money Due)
      </p>
      <p className="text-2xl font-bold text-blue-600">
        Rs. {Number(total).toLocaleString()}
      </p>
    </div>
  );
}