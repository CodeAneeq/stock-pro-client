import React, { useEffect } from 'react'
import PrimaryLayout from '../../components/layout/PrimaryLayout'
import StockTable from '../../components/table/StockTable'
import TextInput from "../../components/input/TextInput";
import Button from "../../components/button/PrimaryBtn";
import { useState } from "react";
import axios from 'axios';
import baseURL from '../../services/baseURL';


const StockManagement = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      let res = await axios.get(`${baseURL}/product/api/get-products`);
      let data = res?.data?.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  } , [])


  const addItem = async () => {
    try {
      let payload = {name, price, quantity};
      let res = await axios.post(`${baseURL}/product/api/add-product`, payload);
      if (res?.data?.status == "success") {
        alert("Product Added Successfully");
        setName("");
        setPrice(0);
        setQuantity(0);
        getProducts();
        setError("");
      }
    } catch (error) {
      console.log(error.response);
      setError(error?.response?.data?.message);
    }
  }

  return (
    <PrimaryLayout>      
      <div>
         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full p-5 border-b mb-10">
        <h2 className="text-base font-bold text-gray-800 mb-4">Add New Item</h2>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
          <TextInput
            label="Item Name"
            placeholder="e.g. Flour"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="sm:flex-[2]"
          />
          <TextInput
            label="Price per Item"
            placeholder="0.00"
            type="number"
            min="0"
            prefix="Rs."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            // error={errors.price}
            className="sm:flex-1"
          />
          <TextInput
            label="Available Quantity"
            placeholder="0"
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="sm:flex-1"
          />
          <div className="w-full sm:w-auto pb-0.5">
            <Button onClick={addItem} className="w-full sm:w-auto">
              Add Item
            </Button>
          </div>
        </div>
         {error && <p className='text-red-500 text-sm my-5'>{error}</p> } 
      </div>
      <StockTable products={products} refreshProducts={getProducts}/>
      </div>
    </PrimaryLayout>
  )
}

export default StockManagement