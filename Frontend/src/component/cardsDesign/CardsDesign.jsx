import React, { useEffect } from "react";
import "./CardsDesign.css";
import { FaHeart, FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CardsDesign = ({
  id,
  image1,
  image2,
  title,
  price,
  onClick,
  onClick1,
  cartProducts,
}) => {
  const navigate = useNavigate();

  const { cart } = useCart();

  const { seasonwear } = useParams();
  console.log(seasonwear);

  const productExists = cart.some((item) => item?.id === id);

  const handleButtonClick = () => {
    if (productExists) {
      console.log("going to cart");
    } else {
      console.log("adding to cart");
      onClick();
    }
  };

  const handleroute = () => {
    console.log(seasonwear, id);
    switch (seasonwear) {
      case "winterwear":
        navigate(`/winterwear/${id}`);
        break;
      case "bottomwear":
        navigate(`/bottomwear/${id}`);
        break;
      case "summerwear":
        navigate(`/summerwear/${id}`);
        break;
      case "dresses":
        navigate(`/dresses/${id}`);
        break;
      case "tops":
        navigate(`/tops/${id}`);
        break;
      case "formals":
        navigate(`/formals/${id}`);
        break;
      case "heels":
        navigate(`/heels/${id}`);
        break;
      case "sneakers":
        navigate(`/sneakers/${id}`);
        break;
      case "sports":
        navigate(`/sports/${id}`);
        break;
      case "eyeshadow":
        navigate(`/eyeshadow/${id}`);
        break;
      case "lipstick":
        navigate(`/lipstick/${id}`);
        break;
      case "mascara":
        navigate(`/mascara/${id}`);
        break;
      case "blush":
        navigate(`/blush/${id}`);
        break;
      case "foundation":
        navigate(`/foundation/${id}`);
        break;
      default:
        console.log("Invalid seasonwear type");
        break;
    }
  };

  useEffect(() => {}, [cart]);

  return (
    <div className="cardsdesign-container">
      <div className="cardsdesign-image-wrapper">
        <img src={image1} alt={title} className="cardsdesign-image image-1" />
        <img src={image2} alt={title} className="cardsdesign-image image-2" />

        <div className="cardsdesign-hover-icons">
          <FaHeart
            className="cardsdesign-icon wishlist-icon color-gray-600"
            onClick={onClick1}
          />
          <FaSearch className="cardsdesign-icon " />
        </div>

        <button
          className="cardsdesign-add-to-cart"
          onClick={handleButtonClick}>
            {!productExists ? "Add to Cart" : "Go to Cart"}
        </button>
      </div>
      <div className="cardsdesign-content" onClick={handleroute}>
        <h3 className="cardsdesign-title">{title}</h3>
        <p className="cardsdesign-price">₹ {price}/-</p>
      </div>
    </div>
  );
};

export default CardsDesign;
