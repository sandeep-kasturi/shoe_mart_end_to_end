import React, { useContext, useState } from 'react'
import { PumaData } from '../data/PumaData';
import CardSectionForHomePage from './CardSectionForHomePage';
import { MyContext } from './HomePage';

const CasualShoe = () => {
    const [activeIndex, setactiveIndex] = useState(0);
    const slidePrev=()=>setactiveIndex(activeIndex-1);
    const slideNext=()=>setactiveIndex(activeIndex+1);

    const listOfProducts = useContext(MyContext);

  return (
    <div className=' my-10 mx-2 border-green-400 flex flex-col space-y-4'>
        <div className='mx-2 font-bold text-2xl'>
            Casual Shoes
        </div>
        <div className='flex flex-row'>
            {listOfProducts?.slice(activeIndex,activeIndex+6).map((items,index) => <CardSectionForHomePage key={items.id} items={items} />)}
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

export default CasualShoe
