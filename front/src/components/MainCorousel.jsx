import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {ShoeForCorousel} from '../data/ShoeForCorousel'; 


const items = ShoeForCorousel.map((items)=><img className='' src={items.image}></img>)

const MainCorousel = () => (
  <div className="">
    <AliceCarousel
      autoPlay
      autoPlayInterval={1500}
      infinite
      disableButtonsControls
      items={items}
    />
  </div>
  
);

export default MainCorousel
