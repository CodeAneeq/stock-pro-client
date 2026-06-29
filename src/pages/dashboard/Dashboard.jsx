import React, { useEffect, useState } from 'react'
import PrimaryLayout from '../../components/layout/PrimaryLayout'
import InfoCard from '../../components/cards/InfoCard'
import { PiMoneyDuotone } from "react-icons/pi";
import axios from 'axios';
import { LuBox } from "react-icons/lu";
import { MdInventory2 } from 'react-icons/md'
import RecentStockMovements from '../../components/cards/RecentStockMovementCard';
import baseURL from '../../services/baseURL';

const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [invoices, setInvoices] = useState(0);
  const [sales, setSales] = useState(0);

  const getProducts = async () => {
    try {
      let res = await axios.get(`${baseURL}/product/api/get-products`);
      let data = res?.data?.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getInvoices = async () => {
    try {
      let res = await axios.get(`${baseURL}/order/api/get-invoices`);
      let data = res?.data?.data;
      setInvoices(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts()
    getInvoices();
  } , [])

  useEffect(() => {
  if (products.length === 0) return;

  try {
    let totalQuantity = products.reduce((accumulator, currentItem) => {
      return accumulator + (currentItem.quantity || 0); 
    }, 0);
    setQuantity(totalQuantity);
  } catch (error) {
    console.log(error);
  }
}, [products]);

  useEffect(() => {
  if (invoices.length === 0) return;

  try {
    let totalSales = invoices.reduce((accumulator, currentItem) => {
      return accumulator + (currentItem.grandTotal || 0); 
    }, 0);
    setSales(totalSales);
  } catch (error) {
    console.log(error);
  }
}, [invoices]);

  return (
    <PrimaryLayout>
        <div>
          <h2 className='font-medium text-3xl mb-2 '>Overview</h2>
          <p className='text-gray-500 text-sm'>Keep track of your warehouse operations at a glance.</p>
          <div className='flex gap-10 mt-10 max-[480px]:gap-5'>
            <div className='w-full'>
            <InfoCard   icon={<MdInventory2 className="text-blue-500 text-xl"></MdInventory2>} iconBg='bg-blue-200' label='Total Products' value={products?.length}></InfoCard>
            </div>
            <div className='w-full'>
                    <InfoCard
          icon={<LuBox  className="text-purple-500 text-xl" />}
          iconBg="bg-purple-200"
          label="Stock Remaining"
          value={quantity}
        />
            </div>
            <div className='w-full'>
                <InfoCard
          icon={<PiMoneyDuotone className="text-green-500 text-xl" />}
          iconBg="bg-green-200"
          label="Total Sales"
          value={"Rs " + sales}
          className={"max-[450px]:text-[12px]"}
        />
            </div>
          </div>
          <div className='mt-10'>
            <RecentStockMovements></RecentStockMovements>
          </div>
        </div>
    </PrimaryLayout>
  )
}

export default Dashboard