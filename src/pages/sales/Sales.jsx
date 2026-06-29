import React, { useEffect, useState } from 'react'
import PrimaryLayout from '../../components/layout/PrimaryLayout'
import SalesTable from '../../components/table/SalesTable'
import TotalCard from '../../components/cards/TotalCard'
import axios from 'axios'
import baseURL from '../../services/baseURL'

const Sales = () => {
  const [invoices, setInvoices] = useState([]);

  const getInvoices = async () => {
    try {
      let res = await axios.get(`${baseURL}/order/api/get-invoices`);
      if (res?.data?.status == "success") {
        let invoices = res?.data?.data;
        setInvoices(invoices);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInvoices();
  }, [])

    const Total = invoices.reduce((accum, current) => {
      return accum + current.grandTotal;
    }, 0)


  return (
    <PrimaryLayout>      
      <div>
           <h2 className='font-medium text-3xl mb-2 '>Overview</h2>
          <p className='text-gray-500 text-sm'>Track and Manage Your Customers sales and outstanding dues..</p>
          <div className='mt-10'>
            <SalesTable invoices={invoices}></SalesTable>
          </div>
          <div className='flex justify-end mt-10 '>
              <TotalCard total={Total}></TotalCard>
            </div>
      </div>
    </PrimaryLayout>
  )
}

export default Sales