import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import AddressCard from './AddressCard'
// import { getAddressById } from '../redux/addressRedux/action'
// import { getAllOrder, getOrderPrice } from '../redux/orderRedux/action'
import OrderItem from './OrderItem'
import { getAllOrder, getOrderPrice } from '../redux-toolkit/order-redux/orderSlice'
import { getAddressById } from '../redux-toolkit/address-redux/addressSlice'
import AddressCardForOrderSummery from './AddressCardForOrderSummery'
import { createPayment } from '../redux-toolkit/payment-redux/paymentSlice'


const OrderSummery = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const addrsId = searchParams.get("addrsId");
    
  const listOfOrderItems = useSelector(store=>store.orderRedux.listOfOrderItems);
  const msg = useSelector(store=>store.orderRedux.msg);
  // console.log("order data in orderSummery:",order)
  const address = useSelector(store=>store.addressRedux.address);
  const price = useSelector(store=>store.orderRedux.price);

  useEffect(() => {
    dispatch(getAddressById(addrsId));
  }, []);


  const [count, setCount] = useState(0);       // this count state is defined just to pass to OrderItem comp, cause whenver we delete an item from order we increase count, so whenever the count changes this useEffect will trigger(will get the new list of order) 

  useEffect(() => {
    dispatch(getAllOrder());   
    dispatch(getOrderPrice());
  }, [listOfOrderItems?.length, count]);


  const handleCheckout = () => {
    dispatch(createPayment(addrsId));
  }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-s-md border'>
        <AddressCardForOrderSummery item={address} />
      </div>

      <div>
        <div className='lg:grid grid-cols-3  relative'>
            <div className='col-span-2'>
                {listOfOrderItems?.map((item) => <OrderItem key={item.id} item={item} count={count} setCount={setCount} />)}
                {/* {[1,1,1].map(() => <OrderItem />)} */}
            </div>
            <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                <div className='border'>
                    <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
                    <hr/>
                    <div className='space-y-3 font font-semibold mb-10'>
                        <div className='flex justify-between pt-3 text-black'>
                            <span>Price</span>
                            <span>₹{price?.price_without_discount}</span>
                        </div>
                        <div className='flex justify-between pt-3'>
                            <span>Discount</span>
                            <span className=' text-green-600'>-₹{price?.discounted_price}</span>
                        </div>
                        <div className='flex justify-between pt-3 '>
                            <span>Delivery Charge</span>
                            <span className=' text-green-600'>Free</span>
                        </div>
                        <div className='flex justify-between pt-3 font-bold'>
                            <span>Total Amount</span>
                            <span className=' text-green-600'>₹{price?.totalPrice}</span>
                        </div>
                    </div>

                    <Button variant='contained' className='w-full mt-5' sx={{px:'2.5rem',py:'.7rem',bgcolor:'#9155fd'}} onClick={handleCheckout}>
                        Checkout_OrderItems
                    </Button>
                </div>
            </div>
        </div>
    </div>

    </div>
  )
}

export default OrderSummery
