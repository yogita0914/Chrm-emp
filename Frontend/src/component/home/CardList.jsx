import Cards from './Cards';
import './CardList.css'
import { useCart } from '../../context/CartContext';
import { useEffect, useState } from 'react';
import { useWishlist } from '../../context/WishlistContext';
const sortedProducts = [
  {
    id: 1,
    name: "WINTER RINK Women's Skirt",
    brand: "Zara",
    price: 1559,
    originalPrice: 2999,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/620855/01/mod02/fnd/IND/fmt/png/WINTER-RINK-Women's-Skirt",
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/620855/01/mod01/fnd/IND/fmt/png/WINTER-RINK-Women's-Skirt",
    ],
  },

  {
    id: 2,
    name: "Women's Sleeveless Dress",
    brand: "Zara",
    price: 1349,
    originalPrice: 2999,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/538079/42/mod01/fnd/IND/fmt/png/CLASSICS-Women's-Sleeveless-Dress",
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/538079/42/mod03/fnd/IND/fmt/png/CLASSICS-Women's-Sleeveless-Dress",
    ],
  },

  {
    id: 3,
    name: "Women's Slim Fit Ribbed Dress",
    brand: "Zara",
    price: 1799,
    originalPrice: 2999,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/626628/44/mod01/fnd/IND/fmt/png/CLASSICS-Women's-Slim-Fit-Ribbed-Dress",
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/626628/44/mod03/fnd/IND/fmt/png/CLASSICS-Women's-Slim-Fit-Ribbed-Dress",
    ],
  },
  {
    id: 1,
    name: "Running Crop Tank Top",
    brand: "Zara",
    price: 1919,
    originalPrice: 3499,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/524062/33/mod01/fnd/IND/fmt/png/Ultraspun-Women's-Running-Crop-Tank-Top",
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/524062/33/mod02/fnd/IND/fmt/png/Ultraspun-Women's-Running-Crop-Tank-Top",
    ],
  },

  {
    id: 2,
    name: "Luxe Matte Lipstick",
    brand: "Zara",
    price: 489.00,
    originalPrice: 600,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/713ubQ94uIL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61ucXRstK-L._SL1000_.jpg",
    ],
  },

    
];

const CardList = () => {


  const {cart,addtoCart} = useCart()
  const [cartProducts,setCartProducts] = useState([])
  const { addToWishlist } = useWishlist();
  const handleAddToWishlist = (product) => {
    const wishlistItem = {
      id: product.id,
      image1: product.images[0],
      image2: product.images[1],
      title: product.name,
      price: product.price,
    };

    addToWishlist(product);
  }

  const handleClick =  (product)=>{
      addtoCart(product);
      console.log(`Added to Cart ${product.name}`)
  }

  

  useEffect(()=>{
//check products existence in localstorage and set in setCartProducts


    for (const it of sortedProducts) {
      const itemExists = JSON.parse(localStorage.getItem("cart"))?.find((prod) => prod.name === it.name)
      if (itemExists) {
        setCartProducts((prevValues) => ([
          ...prevValues,
           { name: itemExists.name, addedToCart: true },
        ]));
        
      }
      
    }
  },[cart])
  

  return (
    <>
      <div className="w1-cards-container">
        {sortedProducts.map((product, index) => (
          
            <Cards
            key={index}
              image1={product.images[0]}
              image2={product.images[1]}
              title={product.name}
              price={product.price}
              onClick1={() => handleAddToWishlist(product)}
              onClick={() => handleClick(product)}
              cartProducts = {cartProducts}
            />
          
        ))}
      </div>
      
    </>
  )
}
export default CardList;