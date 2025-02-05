
import './Bestseller.css'
import { useEffect, useState } from 'react';
import Cards from './Cards';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
  
const sortedProducts1 = [
  {
    id: 1,
    name: "GRECIILOOKS Tailored Trousers",
    brand: "Zara",
    price: 479,
    originalPrice: 1999,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/61h8fKHybFL._SY879_.jpg",
      "https://m.media-amazon.com/images/I/816Sn6WquqL._SY741_.jpg",
    ],
  },

  {
    id: 3,
    name: "KANISYA Winter Cap for Women",
    brand: "Zara",
    price: 449,
    originalPrice: 999,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/51mupvFZV8L.jpg",
      "https://m.media-amazon.com/images/I/61+ISiPTDDL._SX679_.jpg",
    ],
  },
  {
    id: 1,
    name: "RENEE Very Matte Lipsticks",
    brand: "Zara",
    price: 497,
    originalPrice: 599,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/413saW0jwKL._SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/81tUaCKsxBL._SX522_.jpg",
    ],
  },

  {
    id: 2,
    name: "INSIGHT Cosmetics Lip and Cheek Tint",
    brand: "Zara",
    price: 99,
    originalPrice: 110,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/41wcbpqVTlL._SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/618Y2y00Z3L._SY679_.jpg",
    ],
  },

  {
    id: 3,
    name: "LAKMÉ Xtraordin-Airy Mattreal Mousse",
    brand: "Zara",
    price: 604,
    originalPrice: 875,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/41yTVMm1DoL._SX522_.jpg",
      "https://m.media-amazon.com/images/I/51ims2vHo9L._SX522_.jpg",
    ],
  },


];

const sortedProducts2 = [
  {
    id: 1,
    name: "Leriya Fashion Women's Rayon Midi ",
    brand: "Zara",
    price: 379,
    originalPrice: 1999,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/71FnJpw5J2L._SY879_.jpg",
      "https://m.media-amazon.com/images/I/81zeY8lh1iL._SY741_.jpg",
    ],
  },

  {
    id: 2,
    name: "Istyle Can Plain Round Neck Rib Knit",
    brand: "Zara",
    price: 345,
    originalPrice: 1999,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/61BBlDNERFL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/51isRMxaAnL._SX679_.jpg",
    ],
  },

  {
    id: 3,
    name: "SELBRO Women's Stylish Fashionable High-heeled",
    brand: "Zara",
    price: 739,
    originalPrice: 999,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/71yG3SP4YFL._SY695_.jpg",
      "https://m.media-amazon.com/images/I/71l3LoagSgL._SY695_.jpg",
    ],
  },
  {
    id: 4,
    name: "Swiss Beauty Ultimate 9 Pigmented Colors Eyeshadow",
    brand: "Zara",
    price: 247,
    originalPrice: 329,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://m.media-amazon.com/images/I/41TKsp27ntL._SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/71ugPxeVbhL._SX522_.jpg",
    ],
  },
];

export default function Bestseller() {
  
    const [activeDiv, setActiveDiv] = useState(1); // 1 for Div1, 2 for Div2

    
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
    
        addToWishlist(wishlistItem);
      }
      const handleClick =  (product)=>{
        addtoCart(product);
        console.log(`Added to Cart ${product.name}`)
    }

      
        useEffect(()=>{
      //check products existence in localstorage and set in setCartProducts
      
      
          for (const it of sortedProducts1) {
            const itemExists = JSON.parse(localStorage.getItem("cart"))?.find((prod) => prod.name === it.name)
            if (itemExists) {
              setCartProducts((prevValues) => ([
                ...prevValues,
                 { name: itemExists.name, addedToCart: true },
              ]));
              
            }
            
          }

          for (const it of sortedProducts2) {
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
    <div className='bestseller-cards mt-5'>
       {/* Buttons to toggle the visible div */}
       <button
          onClick={() => setActiveDiv(1)}
          style={{ textDecoration: activeDiv === 1 ? 'underline' : 'none' }} // Underline active button
        >
          Bestseller
        </button>
        <button
          onClick={() => setActiveDiv(2)}
          style={{ textDecoration: activeDiv === 2 ? 'underline' : 'none' }} // Underline active button
        >
          Special
        </button>
      </div>
      {/* Conditionally render the divs based on the activeDiv state */}
      {activeDiv === 1 && (
      <div id="div1" className="card-container">
          <div className="w1-cards-container">
        {sortedProducts1.map((product, index) => (
          <Cards
            key={index}
            image1={product.images[0]}
            image2={product.images[1]}
            title={product.name}
            price={product.price}
            onClick={() => handleClick(product)}
            cartProducts = {cartProducts}
          />
        ))}
      </div>

      </div>
      )}
      {activeDiv === 2 && (
        <div id="div2" className="card-container">

      <div className="w1-cards-container">
        {sortedProducts2.map((product, index) => (
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
      )}
    
    
    </>
  )
}
