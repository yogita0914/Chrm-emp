import React, { useEffect } from "react";
import "./CartPage.css";
import { useCart } from "../../context/CartContext";
import { IoIosArrowForward } from "react-icons/io";

const CartPage = () => {
  const {
    cart,
    increment,
    decrement,
    removefromCart,
    settotalamount,
    totalamount,
  } = useCart();

  useEffect(() => {
    if (cart) {
      const totalAmount = cart.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
      settotalamount(totalAmount);
    }
  }, [cart]);

  return (
    <div className="about-main-section">
      <div
        className="privacy-breadcrumb-title-wrapper"
        style={{ height: "150px" }}
      >
        <div className="policy-breadcrumb-content">
          <div className="policy-breadcrumb-title">
            <div className="policy-breadcrumbs-container">
              <span className="policy-breadcrumb-item">
                <a href="/">Home</a>
              </span>
              <span className="policy-brn_arrow"> / </span>
              <span className="policy-breadcrumb-item policy-current">
                Shopping Cart
              </span>
            </div>
            <h1 className="privacy-heading-title">Shopping Cart</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 justify-center overflow-x-hidden items-center lg:items-start lg:justify-between mt-2 w-60vh lg:w-full max-h-[150vh] px-2">
        <div
          className={`md:w-full sm:block hidden overflow-y-auto  overflow-x-hiddenlg:ml-4 ml-4 mr-4 lg:mr-0 xl:ml-16 ${
            cart.length ? "border-b-2" : "border-0"
          } h-full`}
        >
          {cart.length ? (
            <div className="w-full md:w-[95vw] lg:w-[65vw] xl:w-[62vw]">
              <table className="w-[80vw] lg:w-[65vw] xl:w-full md:w-full overflow-hidden border-spacing-2 border-collapse">
                <thead>
                  <tr className="border-b-2 border-zinc-300 bg-zinc-200 z-10">
                    <th className="w-[5%] px-4 py-2 text-left"></th>
                    <th className="w-[20%] lg:w-[10%] px-4 py-2 text-left">
                      Image
                    </th>
                    <th className="w-[25%] md:w-[25%] lg:w-[20%] px-4 py-2 text-left">
                      Product
                    </th>
                    <th className="w-[15%] md:w-[10%] px-4 py-2 text-left">
                      Price
                    </th>
                    <th className="w-[20%] md:w-[15%] px-4 py-2 text-left">
                      Quantity
                    </th>
                    <th className="w-[15%] px-4 py-2 text-left">SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((items, index) => (
                    <tr key={index} className="border-b-2 border-zinc-100">
                      <td className="px-4 py-2">
                        <div
                          className="w-6 h-6 cursor-pointer"
                          onClick={() =>
                            removefromCart(items?.id)
                          }
                        >
                          <svg
                            className="w-6 h-6 text-gray-800 hover:text-red-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
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
                      </td>
                      <td className="lg:p-2 rounded-md overflow-hidden p-0">
                        <img
                          className="w-24 object-fit xl:w-32 xl:h-32 rounded-md h-28 lg:w-28 lg:h-24"
                          src={
                            items?.images
                              ? items?.imgSrc1 || items.images[0]
                              : items.image1
                          }
                          alt="Product Image1"
                        />
                      </td>
                      <td className="h-32 flex items-center line-clamp-1">
                        <p>{items?.name || items?.title}</p>
                      </td>

                      <td className="px-4  py-2">₹{items.price}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center w-20 rounded-full border-2 border-zinc-300 space-x-2">
                          <button
                            onClick={() =>
                              decrement(items?.id)
                            }
                            className={`px-2 py-1 text-white font-bold rounded ${
                              items.quantity === 1
                                ? "text-zinc-400 cursor-default"
                                : "text-zinc-900 cursor-pointer"
                            }`}
                          >
                            -
                          </button>
                          <div className="text-xl font-semibold">
                            {items.quantity}
                          </div>
                          <button
                            onClick={() =>
                              increment(items?.id)
                            }
                            className="px-2 py-1 text-zinc-900 font-bold rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="lg:px-4 px-2 py-2">
                        ₹ {items.price * items.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4 mt-4 mb-4 items-center justify-center">
              <div className="md:text-4xl xl:text-6xl text-2xl flex items-center justify-center font-extrabold">
                <p className="text-zinc-500">Feels So Empty</p>
                <img
                  className="w-32 h-32"
                  src="https://pngimg.com/uploads/shopping_bag/shopping_bag_PNG6384.png"
                  alt=""
                />
              </div>
              <a href="/" className="hover:no-underline">
                <button className="border-2 flex items-center justify-between gap-2 bg-zinc-800 border-zinc-500 text-zinc-200 font-semibold text-sm xl:text-xl rounded-full hover:bg-transparent hover:text-zinc-800  transition-all ease-in-out duration-500 animate-none px-4 py-2">
                  Continue Shopping <IoIosArrowForward />
                </button>
              </a>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 justify-start sm:hidden p-4 overflow-y-auto max-h-[80vh]">
          {cart.length ? (
            cart.map((items, index) => (
              <div
                key={index}
                className="flex p-4 w-[90vw] border-2 border-zinc-200 items-start flex-col rounded-md shadow-md"
              >
                <div className="flex w-full items-start space-x-4">
                  <div className="w-24 h-24">
                    <img
                      className="w-full h-full object-cover rounded-md"
                      src={
                        items?.images
                          ? items?.imgSrc1 || items.images[0]
                          : items.image1
                      }
                      alt="Product"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full justify-start">
                    <div className="flex w-full items-center justify-between">
                      <h1 className="font-semibold line-clamp-1">
                        {items?.name || items?.title}
                      </h1>
                      <div
                        className="w-6 h-6 cursor-pointer"
                        onClick={() =>
                          removefromCart(items?.id)
                        }
                      >
                        <svg
                          className="w-6 h-6 text-gray-800 hover:text-red-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
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
                    <h2 className="text-sm">₹ {items?.price}</h2>
                    <div className="flex items-center rounded-full w-20 border-2 border-zinc-300 space-x-2">
                      {/* Decrement Button */}
                      <button
                        onClick={() => decrement(items?.id)}
                        className={`px-2 ${
                          items.quantity === 1
                            ? "text-zinc-400 cursor-default"
                            : "text-zinc-900 cursor-pointer"
                        } text-white font-bold rounded`}
                      >
                        -
                      </button>

                      {/* Display Count */}
                      <div className="text-xl font-semibold">
                        {items.quantity}
                      </div>

                      {/* Increment Button */}
                      <button
                        onClick={() => increment(items?.id)}
                        className="px-2 text-zinc-900 font-bold rounded "
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="w-full border-1 border-zinc-200" />
                <div className="mt-2 flex justify-between w-full font-semibold text-base text-zinc-800">
                  <span>Sub Total</span>
                  <span>₹ {items.price * items.quantity}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col gap-4 mt-4 mb-4 items-center justify-center">
              <div className="md:text-4xl xl:text-6xl text-2xl flex items-center justify-center font-extrabold">
                <p className="text-zinc-500">Feels So Empty</p>
                <img
                  className="w-32 h-32"
                  src="https://pngimg.com/uploads/shopping_bag/shopping_bag_PNG6384.png"
                  alt=""
                />
              </div>
              <a href="/" className="hover:no-underline">
                <button className="border-2 flex items-center justify-between gap-2 bg-zinc-800 border-zinc-500 text-zinc-200 font-semibold text-sm xl:text-xl rounded-full hover:bg-transparent hover:text-zinc-800  transition-all ease-in-out duration-500 animate-none px-4 py-2">
                  Continue Shopping <IoIosArrowForward />
                </button>
              </a>
            </div>
          )}
        </div>

        {cart.length ? (
          <div
            className={`w-full sticky top-0 rounded-md ${
              cart.length
                ? "flex flex-col items-start justify-between"
                : "hidden"
            } xl:w-[38vw] px-6 py-4 w-[80vw] lg:w-[40vw] md:w-[80vw] lg:mb-0 mb-10 sm:mb-10 xl:mr-12 h-60 sm:h-64 lg:h-64 bg-zinc-200`}
          >
            <h1 className="text-start font-semibold text-4xl">Basket Total</h1>
            <div className="flex text-base w-full mt-6 items-center justify-between">
              <span>Subtotal</span>
              <span>₹ {totalamount}</span>
            </div>
            <hr className="h-2 w-full mt-4 border-zinc-400" />
            <div className="flex text-2xl font-semibold w-full mt-2 mb-2 items-center justify-between">
              <span>Subtotal</span>
              <span>₹ {totalamount}</span>
            </div>
            <button className="rounded-full font-semibold text-xl text-zinc-200 bg-zinc-900 w-full p-2">
              Checkout
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Fixed Image Part */}
      <div className="about-fixedImage">
        <div className="about-fixedImage-content">
          <h1 className="about-fixedImage-title">
            Parallax with <br /> another video
          </h1>
          <h2 className="about-fixedImage-subtitle">More eye-catching</h2>
          <button className="about-fixedImage-button">Shop Now</button>
        </div>
      </div>

      {/* Last Part */}
      <div className="about-bottomPart">
        <div className="about-headline">
          <h1>A few climbers consume beverages from a carafe</h1>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
