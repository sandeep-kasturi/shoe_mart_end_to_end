import React from 'react'
import { useNavigate } from 'react-router-dom'

const CardSectionForHomePage = ({items,index}) => {

  const navigate = useNavigate();

  const handleOnclcik = (id) => {
    navigate(`/productOverview/${id}`);
  }

  return (
    <div  className=' rounded-md shadow-lg  mx-2 w-[15rem] cursor-pointer' onClick={()=>{handleOnclcik(items.id)}}>
      <div className='flex flex-col w-48 p-2'>
          <div className='flex flex-col overflow-hidden'>
            <div className='h-[13rem] w-[14rem]'>
                <img className='object-cover object-bottom rounded-md w-full h-full' src={items.image} alt="reload" />
            </div>
            <div className='font-semibold'>
              {items.brand}
            </div>
            <div>
              {items.title.substring(0,12)}...
            </div>
          </div>
          <div className='flex flex-row text-xs font-medium'>
            <div>
              ₹{items.selling_price}
            </div>
            <div className='line-through ml-2 text-xs font-medium'>
              ₹{items.price}
            </div>
            <div className='text-green-600 ml-2 text-xs font-medium'>
              {items.discount} % Off 
            </div>
          </div>
      </div>
    </div>
  )
}

export default CardSectionForHomePage
