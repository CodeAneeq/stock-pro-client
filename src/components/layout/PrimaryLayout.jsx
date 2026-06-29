import React from 'react'
import Sidebar from '../sidebar/Sidebar'

const PrimaryLayout = ({children}) => {
  return (
    <div className='flex gap-10 max-[1020px]:mt-8 max-[1020px]:ml-10 mr-10 max-[430px]:ml-2 max-[430px]:mr-5'>
        <Sidebar/>
        <div className='mt-10 flex-1'>
        {children}
        </div>
    </div>
  )
}

export default PrimaryLayout