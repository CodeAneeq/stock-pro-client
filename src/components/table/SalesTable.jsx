import { MdDelete } from "react-icons/md";
import TotalCard from "../cards/TotalCard";
import axios from "axios";
import baseURL from "../../services/baseURL";

export default function SalesTable({
  invoices,
  refreshInvoices
}) {
      
     const delItem = async (id) => {
      try {
        let res = await axios.delete(`${baseURL}/order/api/del-order/${id}`);
        console.log(res);
        if (res?.data?.status == "success") {
          alert("order deleted successfully");
          refreshInvoices();
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full">

      <ul className="divide-y divide-gray-100 md:hidden">
        {invoices.length === 0 ? (
          <li className="text-center py-10 text-gray-400 text-sm">No orders yet.</li>
        ) : (
          invoices.map((item) => (
            <li key={item._id} className="flex items-center gap-3 px-4 py-3.5">

              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center shrink-0 uppercase">
                {item.customerName.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.customerName}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-semibold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded max-[430px]:text-[6px]">
                    {item._id}
                  </span>
                  <span className="text-xs text-gray-400 max-[340px]:text-[10px]">{item?.createdAt?.replace("T", "")?.slice(0, 9)}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-800 max-[340px]:text-[10px]">
                  Rs. {Number(item.grandTotal).toLocaleString()}
                </p>
              </div>

            </li>
          ))
        )}
      </ul>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-200 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <th className="text-left px-6 py-3">Invoice Number</th>
              <th className="text-left px-6 py-3">Customer Name</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-right px-6 py-3">Amount</th>
              <th className="text-right px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400 text-sm">
                  No orders yet.
                </td>
              </tr>
            ) : (
              invoices.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-blue-600">{item._id}</td>
                  <td className="px-6 py-4 text-gray-800 font-normal">{item.customerName}</td>
                  <td className="px-6 py-4 text-gray-400">{item?.createdAt?.replace("T", "")?.slice(0, 9)}</td>
                  <td className="px-6 py-4 text-gray-600 text-right">
                    Rs. {Number(item.grandTotal).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onDel?.(item)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-lg hover:bg-red-50 cursor-pointer"
                      aria-label={`Delete ${item.name}`}
                    >
                      <MdDelete className="text-lg" onClick={() => delItem(item._id)} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>

  );
}