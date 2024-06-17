import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToOrder } from '../redux-toolkit/order-redux/orderSlice';

const AddressCard = ({item}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeliver = (item) => {
    dispatch(addToOrder())
    console.log("id of addrs:",item.id);
    navigate(`/order/checkout?addrsId=${item?.id}`)
  }
    
  return (
    <div>
        <div className='space-y-3' >
            {item && <p className='font-semibold'>{item?.name}</p>}
            {item && <p>{item?.streetName}, {item?.district}, {item?.state}, {item?.pincode}</p> }
            <div className='space-y-1'>
                {item && <p className='font-semibold'>Phone Number</p>}
                <p>{item?.phoneNumber}</p>
            </div>
            {item && <Button sx={{mt:2,bgcolor:'RGB(145 85 253'}}  size='small' variant='contained' onClick={()=>handleDeliver(item)}>Select to deliver here...</Button>}
        </div>
    </div>
  )
}

export default AddressCard
