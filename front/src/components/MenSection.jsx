import React, { useContext, useEffect, useState } from 'react'
import CardSectionForHomePage from './CardSectionForHomePage'
// import { PumaData } from '../data/PumaData'
import { MyContext } from './HomePage';
import { getAllProducts } from '../redux-toolkit/product-redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';


const MenSection = () => {
    const [activeIndex, setactiveIndex] = useState(0);
    const slidePrev=()=>setactiveIndex(activeIndex-1);
    const slideNext=()=>setactiveIndex(activeIndex+1);

    const dispatch = useDispatch();
    const listOfProducts = useSelector(store=>store.productRedux.listOfProducts);


  useEffect(() => {
    dispatch(getAllProducts());
  }, [listOfProducts?.length]);

  return (
    <div className=' my-24 mx-2 border-green-400 flex flex-col space-y-4'>
        <div className='mx-2 font-bold text-2xl'>
            Mens Shoes
        </div>
        <div className='flex flex-row'>
            {listOfProducts?.slice(activeIndex,activeIndex+6).map((items,index) => <CardSectionForHomePage key={items.id} items={items}  />)}
        </div>
        <div className='flex justify-center'>
            <div className='flex flex-row gap-x-40'>
                {activeIndex!=0 ? <div onClick={slidePrev} className='cursor-pointer font-bold'>{`<<Prev`}</div> : <div className='cursor-pointer font-bold opacity-15'>{`<<Prev`}</div>}
                { activeIndex !== listOfProducts?.length -6 ? <div onClick={slideNext} className='cursor-pointer font-bold'>{`Next>>`}</div> : <div className='cursor-pointer font-bold opacity-15'>{`Next>>`}</div>}
            </div>
        </div>
    </div>
  )
}

export default MenSection
