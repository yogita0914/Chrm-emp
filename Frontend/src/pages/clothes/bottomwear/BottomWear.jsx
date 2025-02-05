import React, { useEffect, useState } from "react";
import CardsDesign from "../../../component/cardsDesign/CardsDesign";
import bottomData from "../../../assets/bottomData/bottomData";
import "./Bottom.css";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
const BottomWear = () => {
  const [showOnSale, setShowOnSale] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const { addToWishlist } = useWishlist();

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleOnSaleChange = (e) => {
    setShowOnSale(e.target.checked);
  };

  const { cart, addtoCart } = useCart();
  const [cartProducts, setCartProducts] = useState([]);

  const handleClick = (product) => {
    addtoCart(product);
    console.log(`Added to Cart ${product.name}`);
  };

  useEffect(() => {
    //check products existence in localstorage and set in setCartProducts

    for (const it of bottomData) {
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

  const filteredBottomData = showOnSale
    ? bottomData.filter((bottom) => bottom.onSale)
    : bottomData;

  const sortedBottomData = [...filteredBottomData].sort((a, b) => {
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
  const handleAddToWishlist = (bottom) => {
    addToWishlist(bottom);
  };
  return (
    <div className="bottom-section">
      <div className="privacy-breadcrumb-title-wrapper">
        <div className="policy-breadcrumb-content">
          <div className="policy-breadcrumb-title">
            <div className="policy-breadcrumbs-container">
              <span className="policy-breadcrumb-item">
                <a href="/">Home</a>
              </span>
              <span className="policy-brn_arrow"> / </span>
              <span className="policy-breadcrumb-item policy-current">
                BottomWear
              </span>
            </div>
            <h1 className="privacy-heading-title">Bottomwear</h1>
          </div>
        </div>
      </div>
      <div className="bottom-filters">
        <div className="bottom-left-side">
          <input
            className="onsale-checkbox"
            type="checkbox"
            id="on-sale"
            checked={showOnSale}
            onChange={handleOnSaleChange}
          />
          <label className="onsale-checkbox" htmlFor="on-sale">
            Show only products on sale
          </label>
        </div>
        <div className="bottom-right-side">
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
      <div className="bottom-container">
        {sortedBottomData.map((bottom, index) => (
          <CardsDesign
            key={index}
            id={bottom.id}
            image1={bottom.images?.[0] || "defaultImage1.jpg"}
            image2={bottom.images?.[1] || "defaultImage2.jpg"}
            title={bottom.name}
            price={bottom.price}
            onClick1={() => handleAddToWishlist(bottom)}
            onClick={() => handleClick(bottom)}
            cartProducts={cartProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomWear;
