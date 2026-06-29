import { useEffect, useState } from "react";
import StockMovementCard from "./StockMovementCard";
import baseURL from "../../services/baseURL";
import axios from "axios";
import { Link } from "react-router";

export default function RecentStockMovements({
  title = "Recently Added Stock",
}) {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      let res = await axios.get(`${baseURL}/product/api/get-products`);
      if (res?.data?.status == "success") {
        let data = res?.data?.data;
        let latesData = [...data].reverse().slice(0, 5);
        setProducts(latesData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  } , [])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 w-full mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
        <button
          className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
        >
          <Link to="/stock">View All</Link>
        </button>
      </div>

      <div className="space-y-2">
        {products.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No recent movements</p>
        ) : (
          products.map((m) => (
            <StockMovementCard
              key={m.id}
              type={"stock update"}
              title={m.name}
              subtitle={"stock added successfully"}
              units={m.quantity}
              time={ m?.createdAt?.slice(11, 19) + " " + m?.createdAt?.replace("T", "")?.slice(0, 9)}
            />
          ))
        )}
      </div>
    </div>
  );
}