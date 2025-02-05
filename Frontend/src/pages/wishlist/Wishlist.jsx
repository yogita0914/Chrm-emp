import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import "./WishList.css";

const WishList = () => {
  const wishlistContext = useWishlist();
  const { addtoCart } = useCart(); // Get addtoCart function from CartContext

  if (!wishlistContext) {
    return <p>Error: Wishlist context is not available.</p>;
  }

  const { wishlist, removeFromWishlist } = wishlistContext;

  return (
    <div className="wishlist-page">
      {/* Breadcrumb and Title */}
      <div className="wishlist-breadcrumb-title-wrapper">
        <div className="wishlist-breadcrumbs-container">
          <a href="/">Home</a>
          <span className="wishlist-brn-arrow">›</span>
          <span className="wishlist-current">Wishlist</span>
        </div>
        <div className="wishlist-heading-title">My Wishlist</div>
      </div>

      {/* Wishlist Table */}
      <div className="wishlist-grid container">
        {wishlist.length > 0 ? (
          <table className="wishlist-table">
            <thead>
              <tr>
                <th className="table-header">Product Name</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item.id}>
                  <td className="table-cell product-cell">
                    {/* Remove Button */}
                    <span
                      className="remove-btn"
                      onClick={() =>
                        removeFromWishlist(item?.id)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        viewBox="0 0 24 24"
                        className="remove-icon"
                      >
                        <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
                      </svg>
                    </span>

                    {/* Product Image */}
                    <img
                      src={
                        item?.images[0]
                          }
                      alt={item?.title || item?.name}
                      className="product-image"
                    />

                    {/* Product Details */}
                    <div>
                      <span className="product-title">
                        {item?.title || item?.name}
                      </span>
                      <br />
                      <span className="price">₹{item.price}</span>
                    </div>
                  </td>
                  <td className="table-cell ">
                    <span className="stock-status">In Stock</span>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addtoCart(item)} // Add item to cart
                    >
                      Add to cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="wishlist-empty">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WishList;
