import React, { useEffect, useState } from 'react'
import PrimaryLayout from '../../components/layout/PrimaryLayout'
import InvoiceCard from '../../components/cards/InvoiceCard'
import axios from 'axios';
import baseURL from '../../services/baseURL';
import { useParams } from 'react-router';

const Invoice = () => {
  const [invoice, setInvoice] = useState({});
  let {id} = useParams();  

  const getInvoice = async () => {
    try {
      let res = await axios.get(`${baseURL}/order/api/get-invoice/${id}`);
      if (res?.data?.status == "success") {
        let data = res?.data?.data
        setInvoice(data);        
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInvoice()  
  }, [])

  return (
    <PrimaryLayout>      
       <nav className="text-sm text-gray-500 flex items-center gap-1">
        <button
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Orders
        </button>
        <span className="text-gray-400">›</span>
        <span className="text-gray-700 font-medium">Invoice {invoice?._id}</span>
      </nav>
      <div>
        <InvoiceCard invoice={invoice}/>
      </div>
    </PrimaryLayout>
  )
}

export default Invoice