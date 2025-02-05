import React, { useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { useParams } from 'react-router-dom'

import bottomData from '../../assets/bottomData/bottomData'
import dressesData from '../../assets/dressData/dressData'
// import heelsData from '../../assets/dressData/heels'
// import sportsData from '../../assets/dressData/sports'
// import eyeshadowData from '../../assets/eyeshadowData/eyeshadowData'
import formalshoesData from '../../assets/FormalshoesData/formalshoesData'
// import lipsticksData from '../../assets/lipsticksData/lipsticksData'
import SneakersData from '../../assets/shoesData/sneakerData'
import summerData from '../../assets/summerData/summerData'
import topsData from '../../assets/topData/topData'
// import travelBagData from '../../assets/travelbagData/travelbagData'
import winterData from '../../assets/winterData/winterData'
import CardsDesign from '../cardsDesign/CardsDesign'
import eyeshadowData from '../../assets/eyeshadowData/eyeshadowData'
import lipstickData from '../../assets/lipstickData/lipstickData'
import heelsData from '../../assets/dressData/heels'
import sportsData from '../../assets/dressData/sports'
import mascaraData from '../../assets/mascaraData/mascaraData'
import blushData from '../../assets/blushData/blushData'
import foundationData from '../../assets/foundationData/foundationData'


const Scrollcarousel = () => {

    const {seasonwear,id} = useParams()

    const {cart,addtoCart} = useCart()
    
    let products = [];
    console.log(id)
    
    switch (seasonwear) {
      case 'winterwear':
        // Filter products for winterwear season
        products = winterData.filter(
          (item) => item.id !== id
        );
        break;
      case 'summerwear':
        // Filter products for summerwear season
        products = summerData.filter(
          (item) => item.id != id
        );
        break;
      case 'sneakers':
        // Filter products for sneaker season
        products = SneakersData.filter(
          (item) => item.id !== id
        );
        break;
      case 'eyeshadow':
        // Filter products for sneaker season
        products = eyeshadowData.filter(
          (item) => item.id !== id
        );
        break;
      case 'heels':
        // Filter products for sneaker season
        products = heelsData.filter(
          (item) => item.id !== id
        );
        break;
      case 'bottomwear':
        // Filter products for bottomwear season
        products = bottomData.filter(
          (item) => item.id != id
        );
        break;
      case 'dresses':
        // Filter products for dresses season
        products = dressesData.filter(
          (item) => item.id != id
        );
        break;
      case 'lipstick':
        // Filter products for lipstick season
        products = lipstickData.filter(
          (item) => item.id != id
        );
        break;
      case 'formals':
        // Filter products for dresses season
        products = formalshoesData.filter(
          (item) => item.id != id
        );
        break;
      case 'tops':
        // Filter products for tops season
        products = topsData.filter(
          (item) => item.id != id
        );
        break;
      case 'sports':
        // Filter products for tops season
        products = sportsData.filter(
          (item) => item.id != id
        );
        break;
      case 'mascara':
        // Filter products for tops season
        products = mascaraData.filter(
          (item) => item.id != id
        );
        break;
      case 'blush':
        // Filter products for tops season
        products = blushData.filter(
          (item) => item.id != id
        );
        break;
      case 'foundation':
        // Filter products for tops season
        products = foundationData.filter(
          (item) => item.id != id
        );
        break;
      default:
        console.log('Invalid seasonwear');
        break;
    }
    
    const handleClick =  (product)=>{
        addtoCart(product);
        console.log(`Added to Cart ${product.name}`)
    }
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [id]);

  return (
    
    <div>

    
    {/* <!-- Carousel wrapper --> */}
    <div className='w-full py-2 overflow-auto scroll-smooth hide-scrollbar rounded-lg flex items-center gap-4'>
        <div className='flex gap-2 items-end justify-between'>
        {
            products.map((item,index)=>(
                <CardsDesign
                key={index}
            id={item.id}
              image1={item?.images[0] || item?.imgSrc1}
              image2={item.images[1] || item?.imgSrc2}
              title={item.name}
              price={item.price}
              onClick={() => handleClick(item)}
            />
              
            ))
        }
        </div>
    </div>
    </div>

  )
}

export default Scrollcarousel