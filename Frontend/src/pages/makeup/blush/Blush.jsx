import React, { useEffect, useState } from "react";
import CardsDesign from "../../../component/cardsDesign/CardsDesign";
import BlushData from "../../../assets/blushData/blushData";
import "./Blush.css";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import blushData from "../../../assets/blushData/blushData";
const Blush = () => {
  const [showOnSale, setShowOnSale] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const { addToWishlist } = useWishlist();

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleOnSaleChange = (e) => {
    setShowOnSale(e.target.checked);
  };

  const filteredBlushData = showOnSale
    ? BlushData.filter((Blush) => Blush.onSale)
    : BlushData;

  const sortedBlushData = [...filteredBlushData].sort((a, b) => {
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

    for (const it of blushData) {
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

  const handleAddToWishlist = (Blush) => {
    
    addToWishlist(Blush);
  };

  return (
    <div className="Blush-section">
      <div className="makeup-breadcrumb-title-wrapper">
        <div className="makeup-breadcrumb-content">
          <div className="makeup-breadcrumb-title">
            <div className="makeup-breadcrumbs-container">
              <span className="makeup-breadcrumb-item">
                <a href="/">Home</a>
              </span>
              <span className="makeup-brn_arrow"> / </span>
              <span className="makeup-breadcrumb-item policy-current">
                Blush
              </span>
            </div>
            <h1 className="makeup-heading-title">Blush</h1>
          </div>
        </div>
      </div>
      <div className="Blush-filters">
        <div className="Blush-left-side">
          {/* <input
              type="checkbox"
              id="on-sale"
              checked={showOnSale}
              onChange={handleOnSaleChange}
            /> */}
          <input type="checkbox" className="box" />
          <label htmlFor="on-sale">Show only products on sale</label>
        </div>
        <div className="Blush-right-side">
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
      <div className="Blush-container">
        {sortedBlushData.map((Blush, index) => (
          <CardsDesign
            key={index}
            id={Blush.id}
            image1={Blush.images[0]}
            image2={Blush.images[1]}
            title={Blush.name}
            price={Blush.price}
            onClick1={() => handleAddToWishlist(Blush)}
            onClick={() => handleClick(Blush)}
            cartProducts={cartProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default Blush;
