import React from "react";
import { NavLink } from "react-router-dom";
// import { FaHome, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext"; 
import { useWishlist } from "../../context/WishlistContext";
import "./Bottomnavbar.css"; 
import WishlistIcon from "../../assets/images/Wishlist.svg";
import Cart from "../../assets/images/Cart.svg";
import Profile from "../../assets/images/Profile.svg";
import Home from "../../assets/images/Home.svg";
const BottomNavbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart?.length || 0; 
  const wishlistCount = wishlist?.length || 0; 

  return (
    <div className="bottom-navbar">
      <NavLink to="/" className="nav-item" activeclassname="active">
        <div className="active-line"></div> 
        <img src={Home} alt="Wishlist" className="icon" />
      </NavLink>

      <NavLink to="/wishlist" className="nav-item" activeclassname="active">
        <div className="active-line"></div>
        <img src={WishlistIcon} alt="Wishlist" className="icon" />
        {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
      </NavLink>

      <NavLink to="/profilePage" className="nav-item" activeclassname="active">
        <div className="active-line"></div>
        <img src={Profile} alt="Profile" className="icon" />
        {/* {profile > 0 && <span className="badge">{profile}</span>} */}
      </NavLink>

      <NavLink to="/cart" className="nav-item" activeclassname="active">
        <div className="active-line"></div>
        <img src={Cart} alt="Wishlist" className="icon" />
        {cartCount > 0 && <span className="badge">{cartCount}</span>}
      </NavLink>
    </div>
  );
};

export default BottomNavbar;
