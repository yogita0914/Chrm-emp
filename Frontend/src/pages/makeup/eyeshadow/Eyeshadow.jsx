import React, { useEffect, useState } from "react";
import CardsDesign from "../../../component/cardsDesign/CardsDesign";
import EyeshadowData from "../../../assets/eyeshadowData/eyeshadowData";
import "./Eyeshadow.css";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import eyeshadowData from "../../../assets/eyeshadowData/eyeshadowData";
const Eyeshadow = () => {
  const [showOnSale, setShowOnSale] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const { addToWishlist } = useWishlist();

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleOnSaleChange = (e) => {
    setShowOnSale(e.target.checked);
  };

  const filteredEyeshadowData = showOnSale
    ? EyeshadowData.filter((Eyeshadow) => Eyeshadow.onSale)
    : EyeshadowData;

  const sortedEyeshadowData = [...filteredEyeshadowData].sort((a, b) => {
    switch (sortOption) {
      case "price-low-to-high":
        return a.price - b.price;
      case "price-high-to-low":
        return b.price - a.price;
      case "name-a-to-z":
        return a.name.localeCompare(b.name);
      case "name-z-to-a":
        return b.name.localeCompare(a.name);
      default:
        return a.id - b.id;
    }
  });

  const { cart, addtoCart } = useCart();
  const [cartProducts, setCartProducts] = useState([]);

  const handleClick = (product) => {
    addtoCart(product);
    console.log(`Added to Cart ${product.name}`);
  };

  useEffect(() => {
    //check products existence in localstorage and set in setCartProducts

    for (const it of eyeshadowData) {
      const itemExists = JSON.parse(localStorage.getItem("cart"))?.find(
        (prod) => (prod?.name || prod?.title) === (it?.name || it?.title)
      );
      if (itemExists) {
        setCartProducts((prevValues) => [
          ...prevValues,
          { name: itemExists?.name || itemExists?.title, addedToCart: true },
        ]);
      }
    }
  }, [cart]);

  const handleAddToWishlist = (Eyeshadow) => {
    
    addToWishlist(Eyeshadow);
  };

  return (
    <div className="Eyeshadow-section">
      <div className="makeup-breadcrumb-title-wrapper">
        <div className="makeup-breadcrumb-content">
          <div className="makeup-breadcrumb-title">
            <div className="makeup-breadcrumbs-container">
              <span className="makeup-breadcrumb-item">
                <a href="/">Home</a>
              </span>
              <span className="makeup-brn_arrow"> / </span>
              <span className="makeup-breadcrumb-item policy-current">
                Eye-shadow
              </span>
            </div>
            <h1 className="makeup-heading-title">Eye-Shadow</h1>
          </div>
        </div>
      </div>
      <div className="Eyeshadow-filters">
        <div className="Eyeshadow-left-side">
          {/* <input
              type="checkbox"
              id="on-sale"
              checked={showOnSale}
              onChange={handleOnSaleChange}
            /> */}
          <input type="checkbox" className="box" />
          <label htmlFor="on-sale">Show only products on sale</label>
        </div>
        <div className="Eyeshadow-right-side">
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="name-a-to-z">Name: A to Z</option>
            <option value="name-z-to-a">Name: Z to A</option>
          </select>
        </div>
      </div>
      <div className="Eyeshadow-container">
        {sortedEyeshadowData.map((Eyeshadow, index) => (
          <CardsDesign
            key={index}
            id={Eyeshadow.id}
            image1={Eyeshadow.images[0]}
            image2={Eyeshadow.images[1]}
            title={Eyeshadow.name}
            price={Eyeshadow.price}
            onClick1={() => handleAddToWishlist(Eyeshadow)}
            onClick={() => handleClick(Eyeshadow)}
            cartProducts={cartProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default Eyeshadow;
