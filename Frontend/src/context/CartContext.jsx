import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [userName, setUsername] = useState("");

  const signUser = (name) => {
    setUsername(name); // Set the user data when logged in
  };

  const logoutUser = () => {
    setUsername(""); // Clear the user data when logged out
  };
  const updateUserName = (newName) => {
    setUsername(newName); // Update the username in your global state
  };

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const [cart, setCart] = useState(loadCartFromLocalStorage);

  const [totalamount, settotalamount] = useState(null);

  const addtoCart = (product, quantity = 1) => {
    // Ensure product has a quantity field
    const productWithQuantity = {
      ...product,
      quantity: product.quantity || quantity,
    };

    setCart((prevCart) => {
      // Check if the product already exists in the cart
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === productWithQuantity.id
      );

      let updatedCart;
      if (existingProductIndex === -1) {
        // If the product doesn't exist, add it with the quantity
        updatedCart = [...prevCart, productWithQuantity];
      } else {
        // If the product already exists, don't add it again
        updatedCart = [...prevCart];
      }

      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const removefromCart = (id) => {
    setCart((prevcart) => {
      const updatedCart = prevcart.filter((item) => item?.id != id);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to localStorage

      return updatedCart;
    });
  };

  const increment = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item?.id === id
          ? { ...item, quantity: (item.quantity || 0) + 1 } // Ensures quantity is not undefined
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const decrement = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item?.id === id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0); // Ensures no item with 0 quantity remains

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  useEffect(() => {
    // Whenever the cart changes, save it to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addtoCart,
        removefromCart,
        increment,
        decrement,
        settotalamount,
        totalamount,
        userName,
        signUser,
        logoutUser,
        updateUserName,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
