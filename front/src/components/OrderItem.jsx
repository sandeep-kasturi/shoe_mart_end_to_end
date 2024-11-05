import { Button, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllOrder, removeOrderItem } from '../redux-toolkit/order-redux/orderSlice';
import { addToCart } from '../redux-toolkit/cart-redux/cartSlice';


const OrderItem = ({item, setCount}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveOrderItem = () => {
    console.log("id of remove cart item:", item?.id)
    dispatch(addToCart(item?.id));
    dispatch(removeOrderItem(item?.id)).then(()=>{
      setCount(c=>c+1);                                 //this count is increasing just to re-render the parent/OrderSummery component forcibly(for explanation refer OrderSummery's useState of count variable) 
      alert('item removed successfully');
    });
  }



  return (
      <div className='p-5 shadow-lg border rounded-md'>
        <div className='flex items-center'>
            <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] '>
                <img className='h-full w-full object-cover object-top' src={item?.image} alt="reload" />

            </div>

            <div className='ml-5 space-y-1'>
            
                <p className='font-semibold'>{item?.title}</p>
                <p className='opacity-70'>Size: {item?.size}, White</p>
                <p className='opacity-70 mt-2'> Seller: {item?.brand}</p>

                <div className='flex space-x-5 items-center text-gray-900 pt-6'>
                    <p className='font-semibold'>₹{item?.selling_price}</p>
                    <p className='opacity-50 line-through'>₹{item?.price}</p>
                    <p className='text-green-600 font-semibold'>{item?.discount}% Off</p>
                </div>

            </div>
        </div>

        <div className='lg:flex items-center lg:space-x-10 pt-4'>
                <div>
                    <Button onClick={handleRemoveOrderItem} sx={{color:"RGB(145 85 253)"}}>remove</Button>
                </div>

            </div>
      
    </div>
  )
}

export default OrderItem
