import React, { useEffect, useState,useRef } from "react";
import Logo from "../../assets/images/Logo.svg";
import Cart from "../../assets/images/Cart.svg";
import { useNavigate, useLocation } from "react-router-dom";
import Profile from "../../assets/images/Profile.svg";
import Chevron from "../../assets/images/Chevron.svg";
import { Link } from "react-router-dom";
import "./Navbar.css";
import BurgerMenu from "../../assets/images/BurgerMenu.svg";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import WishlistIcon from "../../assets/images/Wishlist.svg";
import BottomNavbar from "./Bottomnavbar.jsx";
import { Search } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { userName, signUser } = useCart();
  const resetForm = location.state?.resetForm;
  const navigate = useNavigate();
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cart, increment, decrement, removefromCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isRegistration, setIsRegistration] = useState(false);   
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");   
  const [name, setName] = useState("");
  const [count, setcount] = useState(null);
  const navbarRef = useRef(null);

  const wishlistContext = useWishlist();
  const wishlistCount = wishlistContext?.wishlist?.length || 0;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setIsShopOpen(false);
    setExpandedCategory(null);
  };

  const toggleShop = (e) => {
    e.stopPropagation(); 
    setIsShopOpen(true);
  };

  const toggleCategory = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const toggleProfileDropdown = () => {
    if (!userName) return;   
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) {
      const username = email.split("@")[0];  
      signUser(username);  
      setIsDropdownOpen(false);  
    } else {
      alert("Please enter valid credentials!");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      signUser(name);
      setIsDropdownOpen(false);
      setIsRegistration(false);   
      setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("")
    } else {
      alert("Please fill all the fields!");
    }
  };

  const handleLogout = () => {
    signUser(null);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setIsDropdownOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (resetForm) {
      setEmail("");
      setPassword("");
    }
  }, [resetForm]);

  useEffect(() => {
    if (Array.isArray(cart)) {
      const length = cart.length;
      setcount(length);
    }
  }, [cart]);
  useEffect(() => {
    setIsShopOpen(false);
    setMenuOpen(false);
    setExpandedCategory(null);
  }, [location]);
  
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsShopOpen(false);
      setIsProfileOpen(false);
      setMenuOpen(false);
      setExpandedCategory(null);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <nav className="navbar"ref={navbarRef}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="logo-container">
            <img src={Logo} alt="Logo" className="logo" />
            <h3 className="brand-name">Charm Emporium</h3>
          </div>

          {/* Navigation Links */}
          <div className="nav-links">
            <div className="nav-items">
              <a href="/" className="nav-link">
                Home
              </a>
              <div className="dropdown-container">
                <button
                  className="nav-link dropdown-button"
                  onClick={toggleShop}
                >
                  Shop
                  <img src={Chevron} alt="Expand" className="dropdown-icon" />
                </button>
                {isShopOpen && (
                  <div
                    className="dropdown-menu"
                    onMouseEnter={() => setIsShopOpen(true)}
                    onMouseLeave={() => setIsShopOpen(false)}
                  >
                    <div className="dropdown-item">
                      {/* Dropdown Items */}
                      <div>
                        <h3 className="Heading">Women's Wear</h3>
                        <ul className="space-y-1">
                          <li>
                            <Link to="/winterwear">Winterwear</Link>
                          </li>
                          <li>
                            <Link to="/summerwear">Summerwear</Link>
                          </li>
                          <li>
                            <Link to="/dresses">Dresses</Link>
                          </li>
                          <li>
                            <Link to="/tops">Tops</Link>
                          </li>
                          <li>
                            <Link to="/bottomwear">Bottomwear</Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="Heading">Shoes</h3>
                        <ul className="space-y-1">
                          <li>
                            <Link to="/heels">Heels</Link>
                          </li>
                          <li>
                            <Link to="/sneakers">Sneakers</Link>
                          </li>
                          <li>
                            <Link to="/formals">Formals</Link>
                          </li>
                          <li>
                            <Link to="/sports">Sports</Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="Heading">Makeup</h3>
                        <ul className="space-y-1">
                          <li>
                            <Link to="/lipstick">Lipsticks</Link>
                          </li>
                          <li>
                            <Link to="/eyeshadow">Eyeshadow</Link>
                          </li>
                          <li>
                            <Link to="/mascara">Mascara</Link>
                          </li>
                          <li>
                            <Link to="/blush">Blush</Link>
                          </li>
                          <li>
                            <Link to="/foundation">Foundation</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <a href="/Aboutus" className="nav-link">
                About us
              </a>
              <a href="/contact" className="nav-link">
                Contact
              </a>
            </div>
          </div>

          {/* Right Icons */}
          <div className="right-icons">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>

            <Link to="/wishlist" className="icon-button wishlist-button">
              <img src={WishlistIcon} alt="Wishlist" className="icon" />
              {wishlistCount > 0 && (
                <span className="wishlist-count">{wishlistCount}</span>
              )}
            </Link>
            <BottomNavbar />
            <div className="profile-container">
              {userName ? (
                <div className="user-profile">
                  <img src={Profile} alt="Profile" className="user_icon" />
                  <span
                    className="user-name"
                    onMouseEnter={toggleProfileDropdown}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {userName}
                  </span>
                  <div
                    className="user-profile-"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button
                      className="icon-button"
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}
                    >
                      <img
                        src={Chevron}
                        alt="Expand"
                        className="dropdown-icon-userProfile"
                      />
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <ul
                      className="user-dropdown"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <li className="dropdown-profile">
                        <Link
                          to="/profilePage"
                          style={{ textDecoration: "none", color: "#000" }}
                          state={userName}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Profile
                        </Link>
                      </li>
                      <li className="dropdown-profile">
                        <Link
                          to="/orders"
                          style={{ textDecoration: "none", color: "#000" }}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Orders
                        </Link>
                      </li>
                      <li className="dropdown-profile">
                        <Link
                          to="/wishlist"
                          style={{ textDecoration: "none", color: "#000" }}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Whishlist Products
                        </Link>
                      </li>
                      <li className="dropdown-profile">
                        <Link
                          to="/terms"
                          style={{ textDecoration: "none", color: "#000" }}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Notifications
                        </Link>
                      </li>
                      <li className="dropdown-profile" onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <button
                  className="icon-button"
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <img src={Profile} alt="Profile" className="icon" />
                </button>
              )}
              {isProfileOpen && !userName && (
                <div
                  className="signin-dropdown"
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <div className="signin-header">
                    <h3>
                      {isRegistration ? "Create Account" : "Welcome Back"}
                    </h3>
                    <p className="signInsignUp">
                      {isRegistration
                        ? "Sign up to start shopping"
                        : "Sign in to your account"}
                    </p>
                  </div>
                  <form
                    className="signin-form"
                    onSubmit={isRegistration ? handleSignUp : handleSignIn}
                  >
                    {isRegistration && (
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          className="form-input"
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name"
                        />
                      </div>
                    )}
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}   Update password state
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-input"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}   Update password state
                      />
                    </div>
                    {isRegistration && (
                      <div className="form-group">
                        <label htmlFor="password" className="form-label">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-input"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                        />
                      </div>
                    )}
                    {!isRegistration && (
                      <div className="forgot-password">
                        <a href="#" className="forgot-password-link">
                          Forgot your password?
                        </a>
                      </div>
                    )}
                    <button type="submit" className="signin-button">
                      {isRegistration ? "Sign Up" : "Sign In"}
                    </button>
                  </form>
                  <div className="toggle-auth">
                    {isRegistration ? (
                      <p>
                        Already have an account?{" "}
                        <span
                          className="registrationForm"
                          onClick={() => setIsRegistration(false)}
                        >
                          Sign In
                        </span>
                      </p>
                    ) : (
                      <p>
                        Don't have an account?{" "}
                        <span
                          className="registrationForm"
                          onClick={() => setIsRegistration(true)}
                        >
                          Registration
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative inline-block group">
              <a href="/cart">
                <button className="icon-button cart-button relative hover:bg-gray-200 transition-all">
                  <img src={Cart} alt="Cart" className="icon" />
                  <span className="cart-count">{count}</span>
                </button>
              </a>
              {cart.length ? (
                /* Dropdown menu with smooth animation */
                <div className="absolute overflow-hidden ml-4 group-hover:flex hidden flex-col cursor-default -right-4 mt-3 w-80 sm:w-74 max-h-[60vh] lg:w-80 bg-white shadow-lg rounded-md z-10 mr-4 md:mr-8 opacity-0 translate-y-[-20px] transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-scroll p-2">
                    {cart.map((items, index) => (
                      <div key={index} className="group-hover:block w-full">
                        <div className="flex flex-col mb-2">
                          <span className="flex items-start justify-normal gap-2">
                            <div className="w-28 border-2 h-24 rounded-md overflow-hidden">
                              <img
                                className="object-fill w-full h-full"
                                src={
                                  items?.images
                                    ? items?.imgSrc1 || items?.images[0]
                                    : items?.image1
                                }
                                alt=""
                              />
                            </div>
                            <div className="flex gap-1 w-full text-sm flex-col">
                              <div className="flex w-full items-center justify-between">
                                <h1 className="font-semibold line-clamp-1">
                                  {items?.name || items?.title}
                                </h1>
                                <div
                                  className="w-6 h-6 cursor-pointer"
                                  onClick={() =>
                                    removefromCart(items?.name || items?.title)
                                  }
                                >
                                  <svg
                                    className="w-6 h-6 text-gray-800 hover:text-red-600"
                                    aria-hidden="true"
                                    xmlns="http: www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <span>₹{items?.price}</span>
                              <div className="flex w-20 items-center rounded-full border-2 border-zinc-300 space-x-2">
                                {/* Decrement Button */}
                                <button
                                  onClick={() =>
                                    decrement(items?.name || title)
                                  }
                                  className={`px-2 ${
                                    items.quantity === 1
                                      ? "text-zinc-400 cursor-default"
                                      : "text-zinc-900 cursor-pointer"
                                  } text-white font-bold rounded`}
                                >
                                  -
                                </button>

                                {/* Display Count */}
                                <div className="text-base font-semibold sm:text-base">
                                  {items.quantity}
                                </div>

                                {/* Increment Button */}
                                <button
                                  onClick={() =>
                                    increment(items?.name || items?.title)
                                  }
                                  className="px-2 text-zinc-900 font-bold rounded "
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </span>
                        </div>
                        <hr className="border-1 border-zinc-200 h-1 w-full" />
                      </div>
                    ))}
                  </div>

                  {/* Non-Scrollable Footer */}

                  <div className="p-4 border-t border-gray-300 bg-gray-100">
                    <a href="/cart">
                      <button className="w-full py-2 bg-zinc-800 text-white font-semibold hover:font-bold transition-all duration-150 ease-in-out animate-none rounded-md hover:bg-zinc-900">
                        Go to Cart
                      </button>
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <button className="icon-button BurgerBtn" onClick={toggleMenu}>
              <img src={BurgerMenu} alt="Btn" />
            </button>

            {menuOpen && (
              <div className="mobileMenu">
                <a className="mob-head" href="/">
                  Home
                </a>

                <div className="shop-menu">
                  <button className="menu-heading" onClick={toggleShop}>
                    Shop
                    <img
                      src={Chevron}
                      alt="Expand"
                      className={`dropdown-icon ${isShopOpen ? "open" : ""}`}
                    />
                  </button>
                  {isShopOpen && (
                    <div className="shop-dropdown">
                      <button
                        className="shop-heading"
                        onClick={() => toggleCategory("WomensWear")}
                      >
                        Women's Wear
                        <img
                          src={Chevron}
                          alt="Expand"
                          className={`dropdown-icon ${
                            expandedCategory === "WomensWear" ? "open" : ""
                          }`}
                        />
                      </button>
                      {expandedCategory === "WomensWear" && (
                        <ul className="category-list">
                          <li>
                            <a href="/winterwear">Winterwear</a>
                          </li>
                          <li>
                            <a href="/summerwear">Summerwear</a>
                          </li>
                          <li>
                            <a href="/dresses">Dresses</a>
                          </li>
                          <li>
                            <a href="/tops">Tops</a>
                          </li>
                          <li>
                            <a href="/bottomwear">Bottomwear</a>
                          </li>
                        </ul>
                      )}

                      <button
                        className="shop-heading"
                        onClick={() => toggleCategory("Shoes")}
                      >
                        Shoes
                        <img
                          src={Chevron}
                          alt="Expand"
                          className={`dropdown-icon ${
                            expandedCategory === "Shoes" ? "open" : ""
                          }`}
                        />
                      </button>
                      {expandedCategory === "Shoes" && (
                        <ul className="category-list">
                          <li>
                            <a href="/heels">Heels</a>
                          </li>
                          <li>
                            <a href="/sneakers">Sneakers</a>
                          </li>
                          <li>
                            <a href="/formals">Formals</a>
                          </li>
                          <li>
                            <a href="/sports">Sports</a>
                          </li>
                        </ul>
                      )}

                      <button
                        className="shop-heading"
                        onClick={() => toggleCategory("Makeup")}
                      >
                        Makeup
                        <img
                          src={Chevron}
                          alt="Expand"
                          className={`dropdown-icon ${
                            expandedCategory === "Makeup" ? "open" : ""
                          }`}
                        />
                      </button>
                      {expandedCategory === "Makeup" && (
                        <ul className="category-list">
                          <li>
                            <a href="/lipstick">Lipsticks</a>
                          </li>
                          <li>
                            <a href="/eyeshadow">Eyeshadow</a>
                          </li>
                          <li>
                            <a href="/facecream">Face Creams</a>
                          </li>
                        </ul>
                      )}
                    </div>
                  )}
                </div>
                <hr />

                <a href="/AboutUs">About</a>
                <a href="/contact">Contact</a>
                <a href="/logout">Log out</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;