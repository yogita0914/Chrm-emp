import React, { useEffect, useState } from "react";
import CardsDesign from "../../../component/cardsDesign/CardsDesign";
// import summerData from "../../../assets/SummerData/SummerData";
import "./SummerWear.css";
import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from "../../../context/CartContext";
import summerData from "../../../assets/summerData/summerData";

const SummerWear = () => {
  const [showOnSale, setShowOnSale] = useState(false);
  const [sorsummertion, setSorsummertion] = useState("default");
  const { addToWishlist } = useWishlist();

  const handleSortChange = (e) => {
    setSorsummertion(e.target.value);
  };

  const handleOnSaleChange = (e) => {
    setShowOnSale(e.target.checked);
  };

  const filteredsummerData = showOnSale
    ? summerData.filter((summer) => summer.onSale)
    : summerData;

  const sortedsummerData = [...filteredsummerData].sort((a, b) => {
    switch (sorsummertion) {
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

  
  const handleAddToWishlist = (summer) => {

      addToWishlist(summer);
  };

  const { cart, addtoCart } = useCart();
  const [cartProducts, setCartProducts] = useState([]);

  const handleClick = (product) => {
    addtoCart(product);
    console.log(`Added to Cart ${product.name}`);
  };

  useEffect(() => {
    //check products existence in localstorage and set in setCartProducts

    for (const it of summerData) {
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
    <div className="summer-section">
      <div className="privacy-breadcrumb-title-wrapper">
        <div className="policy-breadcrumb-content">
          <div className="policy-breadcrumb-title">
            <div className="policy-breadcrumbs-container">
              <span className="policy-breadcrumb-item">
                <a href="/">Home</a>
              </span>
              <span className="policy-brn_arrow"> / </span>
              <span className="policy-breadcrumb-item policy-current">
                summerWear
              </span>
            </div>
            <h1 className="privacy-heading-title">Summerwear</h1>
          </div>
        </div>
      </div>
      <div className="summer-filters">
        <div className="summer-left-side">
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
        <div className="summer-right-side">
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" value={sorsummertion} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="name-a-to-z">Name: A to Z</option>
            <option value="name-z-to-a">Name: Z to A</option>
          </select>
        </div>
      </div>

      <div className="summer-container">
        {sortedsummerData.map((summer, index) => (
          <CardsDesign
            key={index}
            id={summer.id}
            image1={summer.images[0]}
            image2={summer.images[1]}
            title={summer.name}
            price={summer.price}
            onClick1={() => handleAddToWishlist(summer)}
            onClick={() => handleClick(summer)}
            cartProducts={cartProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default SummerWear;
