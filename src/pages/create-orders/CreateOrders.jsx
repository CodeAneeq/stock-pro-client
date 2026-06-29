import { useEffect, useState } from "react";
import axios from "axios";

import { MdReceiptLong, MdAdd, MdDelete } from "react-icons/md";
import { HiOutlineSelector } from "react-icons/hi";
import { FiUser } from "react-icons/fi";

import TextInput from "../../components/input/TextInput";
import PrimaryLayout from "../../components/layout/PrimaryLayout";
import baseURL from "../../services/baseURL";
import { useNavigate } from "react-router";

const createEmptyRow = () => ({
  id: Date.now() + Math.random(),
  productId: "",
  name: "",
  price: 0,
  quantity: 1,
});

const CreateOrders = () => {
  const [customerName, setCustomerName] = useState("");
  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState([createEmptyRow()]);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/product/api/get-products`
      );

      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRow = (rowId, updatedFields) => {
    setRows((previousRows) =>
      previousRows.map((row) =>
        row.id === rowId
          ? { ...row, ...updatedFields }
          : row
      )
    );
  };

  const addRow = () => {
    setRows((previousRows) => [
      ...previousRows,
      createEmptyRow(),
    ]);
  };

  const removeRow = (rowId) => {
    setRows((previousRows) =>
      previousRows.filter((row) => row.id !== rowId)
    );
  };

  const handleProductChange = (rowId, productId) => {
    const selectedProduct = products.find(
      (product) => product._id === productId
    );

    if (!selectedProduct) return;

    updateRow(rowId, {
      productId: selectedProduct._id,
      name: selectedProduct.name,
      price: selectedProduct.price,
    });
  };

  const handleQuantityChange = (rowId, quantity) => {
    updateRow(rowId, {
      quantity: Number(quantity) || 1,
    });
  };

  const grandTotal = rows.reduce(
    (total, row) => total + row.price * row.quantity,
    0
  );

  const handleGenerate = async () => {
    const payload = {
      customerName,

      products: rows.map((row) => ({
        productId: row.productId,
        name: row.name,
        price: row.price,
        qty: row.quantity,
        total: row.price * row.quantity,
      })),

      grandTotal,
    };
    try {
      
      const response = await axios.post(
        `${baseURL}/order/api/create-order`,
        payload
      );

      let data = response?.data?.data;

      if (response?.data?.status == "success") {
        navigate(`/invoice/${data._id}`)
        setError("");
      }

      console.log(response.data);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <PrimaryLayout>
<div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full max-w-lg mx-auto p-6 flex flex-col gap-5">

  <div className="text-center">
    <h2 className="text-lg font-bold text-gray-900">
      Order Details
    </h2>

    <p className="text-xs text-gray-400 mt-1">
      Generate a new inventory dispatch order
    </p>
  </div>


  <TextInput
    label="Customer Name"
    placeholder="e.g. Ahmed Ali"
    value={customerName}
    onChange={(e) => setCustomerName(e.target.value)}
    prefix={<FiUser className="text-gray-400 text-sm" />}
  />


  <div className="flex flex-col gap-3">

    <label className="text-xs font-medium text-gray-500">
      Products
    </label>

    {rows.map((row, index) => {

      const subtotal = row.price * row.quantity;

      return (

        <div
          key={row.id}
          className="flex flex-col gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100"
        >


          <div className="flex items-center justify-between">

            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
              Item {index + 1}
            </span>

            {rows.length > 1 && (
              <button
                onClick={() => removeRow(row.id)}
                className="text-red-500 hover:text-red-700"
              >
                <MdDelete size={18} />
              </button>
            )}

          </div>


          <div className="flex items-center border rounded-lg bg-white overflow-hidden">

            <span className="pl-3 text-gray-400">
              <MdReceiptLong />
            </span>

            <select
              value={row.productId}
              onChange={(e) =>
                handleProductChange(
                  row.id,
                  e.target.value
                )
              }
              className="flex-1 px-3 py-2 bg-transparent outline-none appearance-none"
            >
              <option value="">
                Select Product
              </option>

              {products.map((product) => (

                <option
                  key={product._id}
                  value={product._id}
                >
                  {product.name} — Rs.{" "}
                  {product.price.toLocaleString()}
                </option>

              ))}

            </select>

            <span className="pr-3 text-gray-400">
              <HiOutlineSelector />
            </span>

          </div>


          <div className="flex gap-2 items-end">

            <TextInput
              label="Price"
              value={row.price}
              prefix="Rs."
              disabled
              className="flex-1"
            />

            <TextInput
              label="Qty"
              type="number"
              min={1}
              value={row.quantity}
              onChange={(e) =>
                handleQuantityChange(
                  row.id,
                  e.target.value
                )
              }
              className="w-20"
            />

            <div className="w-28">

              <label className="text-xs font-medium text-gray-500">
                Total
              </label>

              <div className="border rounded-lg px-3 py-2 bg-gray-100 font-semibold text-blue-600">

                Rs. {subtotal.toLocaleString()}

              </div>

            </div>

          </div>

        </div>

      );

    })}


    <button
      onClick={addRow}
      className="flex items-center justify-center gap-2 border border-dashed border-blue-400 rounded-xl py-3 text-blue-600 hover:bg-blue-50"
    >
      <MdAdd />
      Add Another Product
    </button>

  </div>


  <div className="bg-blue-50 rounded-xl p-5 text-center">

    <p className="text-xs uppercase tracking-widest text-blue-400">
      Grand Total
    </p>

    <h2 className="text-3xl font-bold text-blue-600 mt-1">
      Rs. {grandTotal.toLocaleString()}
    </h2>

  </div>

         {error && <p className='text-red-500 text-sm my-1'>{error}</p> } 


  <button
    onClick={handleGenerate}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-2"
  >
    <MdReceiptLong />
    Generate Invoice
  </button>

</div>

</PrimaryLayout>
  );
};

export default CreateOrders;