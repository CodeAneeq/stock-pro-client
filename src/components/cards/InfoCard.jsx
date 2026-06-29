export default function InfoCard({
  icon,
  iconBg,
  label,
  labelCol,
  className,
  value,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 max-[370px]:h-35 max-[350px]:px-4">
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-5 shadow-sm`}>
        <span className={`${labelCol}`}>
        {icon}
        </span>
      </div>
 
      <p className="text-sm font-semibold text-gray-500 mb-1 max-[630px]:text-[6px]">{label}</p>
 
      <p className={`text-3xl font-bold text-gray-800 tracking-tight mb-4 max-[700px]:text-xl max-[570px]:text-[15px] ${className}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );
}