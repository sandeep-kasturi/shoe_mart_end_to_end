import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { getCart, getCartPrice } from '../redux/cartRedux/action'
import CartItem from './CartItem'
// import { addToOrder } from '../redux/orderRedux/action'
import { getCart, getCartPrice } from '../redux-toolkit/cart-redux/cartSlice'
import { addToOrder } from '../redux-toolkit/order-redux/orderSlice'
// import { useHistory } from 'react-router-dom';



const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listOfCartItems = useSelector(store=>store.cartRedux.listOfCartItems);
    const price = useSelector(store=>store.cartRedux.price);
    const msg = useSelector(store=>store.cartRedux.msg)

    const handleCheckout=()=>{
        // dispatch(addToOrder()).then(()=>{navigate('/cart/checkout?step=2');});
        navigate('/cart/checkout?step=2');
        // navigate("/checkout?step=2")
    }

    useEffect(() => {
        dispatch(getCart());
        dispatch(getCartPrice());
    }, [listOfCartItems?.length, msg]);


  return (
    <div>
        {listOfCartItems?.length>0 &&<div className='lg:grid grid-cols-3 lg:px-16 relative'>
            <div className='col-span-2'>
                {listOfCartItems?.map((item, index)=><CartItem key={index} item={item} />)}
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
                            <span className=' text-green-600'>free</span>
                        </div>
                        <div className='flex justify-between pt-3 font-bold'>
                            <span>Total Amount</span>
                            <span className=' text-green-600'>₹{price?.totalPrice}</span>
                        </div>
                    </div>

                    <Button onClick={handleCheckout} variant='contained' className='w-full mt-5' sx={{px:'2.5rem',py:'.7rem',bgcolor:'#9155fd'}}>
                        Checkout_cart_comp
                    </Button>
                </div>
            </div>
        </div>}
    </div>
  )
}

export default Cart
