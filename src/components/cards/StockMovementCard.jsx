import { LuBox } from "react-icons/lu";

export default function StockMovementCard({
  title = "",
  subtitle = "",
  units = "",
  time = "",
}) {
  


  return (
    <div className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-colors">
      <div className={`w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0`}>
        {<LuBox className="text-blue-500 text-lg" />}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{title}</p>
        <p className="text-xs text-gray-400 truncate">{subtitle}</p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className={`text-sm font-semibold text-blue-500`}>{units}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
}