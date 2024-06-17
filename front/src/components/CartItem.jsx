import { Button, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
// import { removeCartItem } from '../redux/cartRedux/action';
import { useNavigate } from 'react-router-dom';
import { removeCartItem } from '../redux-toolkit/cart-redux/cartSlice';


const CartItem = ({item}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdateCartItem = (num) => {
    // const data = {data:{quantity:item?.quantity+num}, cartItemId:item?.id}
    // dispatch(updateCartItem(data));
  }
  const handleRemoveCartItem = () => {
    console.log("id of remove cart item:", item?.id)
    dispatch(removeCartItem(item?.id)).then(()=>{alert('item removed successfully');navigate("/cart")});
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

                {/* <div className='flex items-center space-x-2'>

                    <IconButton onClick={()=>handleUpdateCartItem(-1)} disabled={item?.quantity<=1}>
                        copied from https://mui.com/material-ui/material-icons/?query=remove+ci&selected=RemoveCircleOutline
                        <RemoveCircleOutlineIcon />
                    </IconButton>

                    <span className='py-1 px-7 border rounded-sm'>{item?.quantity}</span>
                    <IconButton sx={{color:"RGB(145 85 253)"}} onClick={()=>handleUpdateCartItem(1)}>
                        copied from https://mui.com/material-ui/material-icons/?query=add+&selected=AddCircleOutline
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div> */}

                <div>
                    <Button onClick={handleRemoveCartItem} sx={{color:"RGB(145 85 253)"}}>remove</Button>
                </div>

            </div>
      
    </div>
  )
}

export default CartItem
