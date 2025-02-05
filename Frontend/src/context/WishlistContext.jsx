// import { Name } from "ajv";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const getWishlistFromLocalStorage = () => {
    const storedWishlist = localStorage.getItem("wishlist");
    console.log("Stored Wishlist:", storedWishlist); // Debugging
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  };

  const [wishlist, setWishlist] = useState(getWishlistFromLocalStorage);

  useEffect(() => {
    console.log("Updating localStorage with:", wishlist); // Debugging
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => {
      // Check if the item already exists in the wishlist
      const isItemInWishlist = prevWishlist.some(
        (wishlistItem) => wishlistItem.id === item?.id
      );
      if (isItemInWishlist) {
        console.log("Item already exists in the wishlist."); // Debugging
        return prevWishlist; // Return the existing wishlist without adding duplicates
      }
      return [...prevWishlist, item]; // Add the item if it's not already in the wishlist
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter(
        (item) => item?.id !== id
      );
      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the WishlistContext
export const useWishlist = () => useContext(WishlistContext);
