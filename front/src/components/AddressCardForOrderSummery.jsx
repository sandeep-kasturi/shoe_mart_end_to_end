import React, { createContext } from 'react'

const AddressCardForOrderSummery = ({item}) => {
    
  return (
    <div>
        <div className='space-y-3' >
            {item && <p className='font-semibold'>{item?.name}</p>}
            {item && <p>{item?.streetName}, {item?.district}, {item?.state}, {item?.pincode}</p> }
            <div className='space-y-1'>
                {item && <p className='font-semibold'>Phone Number</p>}
                <p>{item?.phoneNumber}</p>
            </div>
        </div>
    </div>
  )
}

export default AddressCardForOrderSummery
