import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import baseURL from "../../services/baseURL";
import QtyBadge from "../badge/QuantityBadge";

export default function StockTable({
  onDel,
  products = [],
  refreshProducts,
  lowThreshold = 60,
}) {
  const [error, setErrors] = useState("");

   const delItem = async (id) => {
    try {
      let res = await axios.delete(`${baseURL}/product/api/del-product/${id}`);
      console.log(res);
      if (res?.data?.status == "success") {
        alert("product deleted successfully");
        refreshProducts();
      }
    } catch (error) {
      console.log(error);
      setErrors(error?.message);
    }
  }
  

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full">

      <ul className="divide-y divide-gray-100 md:hidden">
        {products.length === 0 ? (
          <li className="text-center py-10 text-gray-400 text-sm">
            No items yet — add one above.
          </li>
        ) : (
          products.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Rs. {Number(item.price).toLocaleString()}
                </p>
              </div>

              <QtyBadge qty={item.quantity} threshold={lowThreshold} />

              <button
                onClick={() => onDel?.(item)}
                className="text-red-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50 flex-shrink-0"
                aria-label={`Delete ${item.name}`}
              >
                <MdDelete className="text-lg"  onClick={() => delItem(item._id)} />
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-200 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <th className="text-left px-6 py-3">Item</th>
              <th className="text-left px-6 py-3">Price</th>
              <th className="text-left px-6 py-3">Quantity</th>
              <th className="text-right px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400 text-sm">
                  No items yet — add one above.
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 text-gray-600">Rs. {Number(item.price).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <QtyBadge qty={item.quantity} threshold={lowThreshold} />
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