import React, { useEffect, useState } from "react";
import CardsDesign from "../../../component/cardsDesign/CardsDesign";
import sportsData from "../../../assets/dressData/sports";
import "./Sports.css";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

const Sports = () => {
  const [showOnSale, setShowOnSale] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const { addToWishlist } = useWishlist();

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleOnSaleChange = (e) => {
    setShowOnSale(e.target.checked);
  };

  const filteredSportsData = showOnSale
    ? sportsData.filter((sports) => sports.onSale)
    : sportsData;

  const sortedSportsData = [...filteredSportsData].sort((a, b) => {
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

  const handleAddToWishlist = (sports) => {
    addToWishlist(sports);
  };
  const { cart, addtoCart } = useCart();
  const [cartProducts, setCartProducts] = useState([]);

  const handleClick = (product) => {
    addtoCart(product);
    console.log(`Added to Cart ${product.name}`);
  };

  useEffect(() => {
    //check products existence in localstorage and set in setCartProducts

    for (const it of sportsData) {
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

  return (
    <div className="sports-section">
      <div className="shoe-breadcrumb-title-wrapper">
        <div className="shoe-breadcrumb-content">
          <div className="shoe-breadcrumb-title">
            <div className="shoe-breadcrumbs-container">
              <span className="shoe-breadcrumb-item">
                <a href="/">Home</a>
              </span>
              <span className="shoe-brn_arrow"> / </span>
              <span className="shoe-breadcrumb-item policy-current">
                Sports
              </span>
            </div>
            <h1 className="shoe-heading-title">Sports</h1>
          </div>
        </div>
      </div>
      <div className="sports-filters">
        <div className="sports-left-side">
          <input
            type="checkbox"
            className="box"
            id="on-sale"
            checked={showOnSale}
            onChange={handleOnSaleChange}
          />
          <label htmlFor="on-sale">Show only products on sale</label>
        </div>
        <div className="sports-right-side">
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
      <div className="sports-container">
        {sortedSportsData.map((sports, index) => (
          <CardsDesign
            key={index}
            id={sports.id}
            image1={sports.images[0]}
            image2={sports.images[1]}
            title={sports.name}
            price={sports.price}
            onClick1={() => handleAddToWishlist(sports)}
            onClick={() => handleClick(sports)}
            cartProducts={cartProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default Sports;
