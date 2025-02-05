import { useEffect, useState } from 'react';
import Cards from './Cards';
import './Trending.css'; 
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';



const sortedProducts3 = [
  {
    id: 1,
    name: "Women's Stretch Fit Yoga Pants",
    brand: "Zara",
    price: 339,
    originalPrice: 1699,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/61eKiq9-GRL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61bjsr7osFL._SX569_.jpg",
    ],
  },

  {
    id: 2,
    name: "Leriya Fashion Women Dress|One Piece",
    brand: "Zara",
    price: 399,
    originalPrice: 1999,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/61MAkgcofoL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61KyhIgr90L._SX679_.jpg",
    ],
  },

  {
    id: 3,
    name: "Long Sleeve Bodycon Dress for Women",
    brand: "Zara",
    price: 668,
    originalPrice: 1995,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/5139O6VD4EL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/51fOzOUgcAL._SY741_.jpg",
    ],
  },
  {
    id: 1,
    name: "Maybelline New York Matte Lipstick",
    brand: "Zara",
    price: 230,
    originalPrice: 299,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/51DCQFw6oXL._SX522_.jpg",
      "https://m.media-amazon.com/images/I/61vZS5wJa-L._SX522_.jpg",
    ],
  },

 
];


const Trending = () => {
  const { addToWishlist } = useWishlist();
  
  const handleAddToWishlist = (product) => {
    const wishlistItem = {
      id: product.id,
      image1: product.images[0],
      image2: product.images[1],
      title: product.name,
      price: product.price,
    };

    addToWishlist(wishlistItem);
    
  };
   const {cart,addtoCart} = useCart()
        const [cartProducts,setCartProducts] = useState([])
  
        const handleClick =  (product)=>{
          addtoCart(product);
          console.log(`Added to Cart ${product.name}`)
      }


          useEffect(()=>{
        //check products existence in localstorage and set in setCartProducts
        
        
            for (const it of sortedProducts3) {
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
        <div className='w2-trending-header'>
        <h1>Trending </h1>
        </div>
    <div className="card-container">

    <div className="w1-cards-container">
        {sortedProducts3.map((product, index) => (
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
    
    </div>
    </>
    
  );
};

export default Trending;