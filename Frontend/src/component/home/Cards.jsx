import { Link } from 'react-router-dom';
import './Cards.css';
import { FaHeart,FaSearch } from "react-icons/fa";

const Cards = ({ image1, image2, title, price ,onClick,cartProducts,onClick1}) => {
  const productExists = Array.isArray(cartProducts) && cartProducts.some((item) => item.name === title);

  console.log(productExists)
  const handleButtonClick = () => {
    if (productExists) {
      console.log("goinf to cart")
      navigate('/cart'); // Redirect to cart page
    } else {
      console.log("adding to cart")
      onClick();  
    }
  };


  return (
    <div className="product-card-container" >
    <div className="product-card-image-wrapper">
      <img src={image1} alt={title} className="product-card-image image-1" />
      <img src={image2} alt={title} className="product-card-image image-2" />
     <div className="product-card-hover-icons">
     
        <FaHeart className="product-card-icon wishlist-icon" onClick={onClick1} />
        <FaSearch className="product-card-icon search-icon" />
        </div>
            
        <button className="product-card-add-to-cart"  onClick={handleButtonClick}>
            {!productExists ? "Add to Cart" : "Go to Cart"}
              </button>
          
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{title}</h3>
        <p className="product-card-price">₹{price}</p>
      </div>
    </div>

  );
};
export default Cards;