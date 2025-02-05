import React, { useEffect, useRef, useState } from "react";
import { FiHeart, FiBarChart2 } from "react-icons/fi";
import "./ProductPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import formalshoesData from "../../assets/FormalshoesData/formalshoesData";
import { useCart } from "../../context/CartContext";
// import Scrollcarousel from "../home/Scrollcarousel";
import dressesData from "../../assets/dressData/dressData";
import bottomData from "../../assets/bottomData/bottomData";
// import summerData from "../../assets/SummerData/SummerData";
import winterData from "../../assets/winterData/winterData";
import topsData from "../../assets/topData/topData";
import SneakersData from "../../assets/shoesData/sneakerData";
import eyeshadowData from "../../assets/eyeshadowData/eyeshadowData";
import lipstickData from "../../assets/lipstickData/lipstickData";
import heelsData from "../../assets/dressData/heels";
import sportsData from "../../assets/dressData/sports";
import mascaraData from "../../assets/mascaraData/mascaraData";
import blushData from "../../assets/blushData/blushData";
import foundationData from "../../assets/foundationData/foundationData";
import Scrollcarousel from "../home/Scrollcarousel";
import { useWishlist } from "../../context/WishlistContext";
import summerData from "../../assets/SummerData/SummerData";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isZoomed, setIsZoomed] = useState(false);
  const { cart, addtoCart } = useCart();
  const [bgImage, setBgImage] = useState("");
  const [bannercategory, setbannercategory] = useState("policy");
  const { seasonwear, id } = useParams();

  const {wishlist,addToWishlist} = useWishlist()

  const navigate = useNavigate();

  const zoomedImageRef = useRef(null);

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  console.log(seasonwear, id);


  const whishlistitemExists = wishlist.some((item)=>item.id == id)

  let products;

  switch (seasonwear) {
    case "winterwear":
      // Filter products for winterwear season
      products = winterData.filter(
        (item) => item.id == id  
      );
      break;
    case "summerwear":
      // Filter products for summerwear season
      products = summerData.filter(
        (item) => item.id == id
      );
      break;
    case "bottomwear":
      // Filter products for bottomwear season
      products = bottomData.filter(
        (item) => item.id == id
      );
      break;
    case "dresses":
      // Filter products for dresses season
      products = dressesData.filter(
        (item) => item.id == id
      );
      break;
    case "tops":
      // Filter products for tops season
      products = topsData.filter(
        (item) => item.id == id 
      );
      break;

    case "heels":
      // Filter products for summerwear season
      products = heelsData.filter(
        (item) => item.id == id
      );
      break;
    case "formals":
      // Filter products for dresses season
      products = formalshoesData.filter(
        (item) => item.id == id
      );
      break;

    case "sneakers":
      // Filter products for tops season
      products = SneakersData.filter(
        (item) => item.id == id
      );
      break;

    case "sports":
      // Filter products for tops season
      products = sportsData.filter(
        (item) => item.id == id
      );
      break;
    case "eyeshadow":
      // Filter products for tops season
      products = eyeshadowData.filter(
        (item) => item.id == id
      );
      break;
    case "lipstick":
      // Filter products for tops season
      products = lipstickData.filter(
        (item) => item.id == id
      );
      break;

    case "mascara":
      // Filter products for tops season
      products = mascaraData.filter(
        (item) => item.id == id
      );
      break;
    case "blush":
      // Filter products for tops season
      products = blushData.filter(
        (item) => item.id == id
      );
      break;
    case "foundation":
      // Filter products for tops season
      products = foundationData.filter(
        (item) => item.id == id
      );
      break;
    default:
      console.log("Invalid seasonwear");
      break;
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  let productExists;


  const handleAddtoCart = (product, quantity) => {
    productExists = cart.some((item) => item?.id === product?.id);
    console.log(productExists);
    if (productExists) {
      navigate("/cart");
      console.log("Go to Cart Button ");
    } else {
      addtoCart(product, quantity);
      console.log("Added to Cart");
    }
  };

  const productDetails = {
    upperMaterial: "canvas",
    soleMaterial: "Rubber",
    pattern: "plain",
    color: "White",
    sizes: "35,36,37,38,39,40,41,42,43",
  };

  const categories = {
    "Women's Wear": [
      "Winterwear",
      "Summerwear",
      "Dresses",
      "Tops",
      "Bottomwear",
    ],
    Shoes: ["Formals", "Heels", "Sneakers", "Sports"],
    Bags: ["Backpacks", "Handbags", "Travel Bags"],
    Makeup: ["Lipsticks", "Eyeshadow", "Mascara", "Foundation", "Blush"],
  };

  // Function to check category
  function findCategory(item) {
    for (const category in categories) {
      if (
        categories[category].some((product) => product.toLowerCase() === item)
      ) {
        // setbannercategory(category);
        return category;
      }
    }
    return "Item not found in any category";
  }

  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  console.log(whishlistitemExists)

  useEffect(() => {
    console.log(seasonwear);
    switch (seasonwear) {
      case "winterwear":
        setBgImage(
          "https://img.freepik.com/premium-photo/rack-full-clothes-hangers-against-wall-background_693425-25968.jpg"
        ); // Winter background image
        break;
      case "summerwear":
        setBgImage(
          "https://img.freepik.com/premium-photo/rack-full-clothes-hangers-against-wall-background_693425-25968.jpg"
        ); // Summer background image
        break;
      case "Tops":
        setBgImage(
          "https://img.freepik.com/premium-photo/rack-full-clothes-hangers-against-wall-background_693425-25968.jpg"
        ); // Spring background image
        break;
      case "lipstick":
        setBgImage(
          "https://img.pikbest.com/wp/202345/makeup-brush-products-and-brushes-laid-out-on-a-dark-surface_9608226.jpg!w700wp"
        ); // Fall background image
        break;
      case "formals":
        setBgImage(
          "https://cdn.salla.sa/VRZBv/BvYsGEepNDp0XCOZlTiAENPQaPBY2BO9B6dMz8R1.jpg"
        ); // Fall background image
        break;
      case "bottomwear":
        setBgImage(
          "https://img.freepik.com/premium-photo/rack-full-clothes-hangers-against-wall-background_693425-25968.jpg"
        ); // Fall background image
        break;
      case "heels":
        setBgImage(
          "https://cdn.salla.sa/VRZBv/BvYsGEepNDp0XCOZlTiAENPQaPBY2BO9B6dMz8R1.jpg"
        ); // Fall background image
        break;
      case "dresses":
        setBgImage(
          "https://img.freepik.com/premium-photo/rack-full-clothes-hangers-against-wall-background_693425-25968.jpg"
        ); // Fall background image
        break;
      case "sneakers":
        setBgImage(
          "https://cdn.salla.sa/VRZBv/BvYsGEepNDp0XCOZlTiAENPQaPBY2BO9B6dMz8R1.jpg"
        ); // Fall background image
        break;
      case "eyeshadow":
        setBgImage(
          "https://img.pikbest.com/wp/202345/makeup-brush-products-and-brushes-laid-out-on-a-dark-surface_9608226.jpg!w700wp"
        ); // Fall background image
        break;
      case "blush":
        setBgImage(
          "https://img.pikbest.com/wp/202345/makeup-brush-products-and-brushes-laid-out-on-a-dark-surface_9608226.jpg!w700wp"
        ); // Fall background image
        break;
      case "foundation":
        setBgImage(
          "https://img.pikbest.com/wp/202345/makeup-brush-products-and-brushes-laid-out-on-a-dark-surface_9608226.jpg!w700wp"
        ); // Fall background image
        break;
      case "mascara":
        setBgImage(
          "https://img.pikbest.com/wp/202345/makeup-brush-products-and-brushes-laid-out-on-a-dark-surface_9608226.jpg!w700wp"
        ); // Fall background image
        break;
      case "sports":
        setBgImage(
          "https://cdn.salla.sa/VRZBv/BvYsGEepNDp0XCOZlTiAENPQaPBY2BO9B6dMz8R1.jpg"
        ); // Fall background image
        break;
      default:
        setBgImage(
          "https://img.freepik.com/premium-photo/rack-full-clothes-hangers-against-wall-background_693425-25968.jpg"
        ); // Default background image
        break;
    }
    console.log(products);
  }, [cart, id, seasonwear]);

  const handleMouseMove = (e) => {
    if (!zoomedImageRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

   
    const transformX = Math.max(0, Math.min(100, x));
    const transformY = Math.max(0, Math.min(100, y));

   
    const scale = 2;


    const translateY = -200; 

   
    zoomedImageRef.current.style.transform = `translate(-${transformX}%, -${transformY}%) scale(${scale}) translateY(${translateY}px)`;
  };

  return (
    <>
      <div
        className="privacy-breadcrumb-title-wrapper overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="policy-breadcrumb-content">
          <div className="policy-breadcrumb-title">
            <div className="policy-breadcrumbs-container">
              <span className="policy-breadcrumb-item">
                <a href="/">Home</a>
              </span>
              <span className="policy-brn_arrow"> / </span>
              <span className="policy-breadcrumb-item policy-current">
                {findCategory(seasonwear)}
              </span>
              <span className="policy-brn_arrow"> / </span>
              <span className="policy-breadcrumb-item policy-current">
                <a href="/formals">{capitalizeString(seasonwear)}</a>
              </span>
            </div>
            <h1 className="privacy-heading-title">
              {capitalizeString(seasonwear)}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center overflow-x-hidden justify-center">
        {products.map((product, index) => {
          if (product.id == id) {
            return (
              <div key={index} className="w-full">
                <div className="product-container gap-0 overflow-x-hidden md:w-[100vw] w-[90vw]">
                  <div className="product-images">
                    <div className="thumbnail-container">
                      {product.images && product.images.length > 0 ? (
                        product.images.map((img, index) => (
                          <div key={index} className="">
                            <img
                              src={img}
                              alt={`Thumbnail ${index + 1}`}
                              className={`thumbnail ${
                                selectedImage === index ? "active" : ""
                              }`}
                              onClick={() => setSelectedImage(index)}
                            />
                          </div>
                        ))
                      ) : (
                        <>
                          <img
                            src={product.image1}
                            alt={title}
                            className="cardsdesign-image image-1"
                          />
                          <img
                            src={product.image2}
                            alt={title}
                            className="cardsdesign-image image-2"
                          />
                        </>
                      )}
                    </div>

                    <div className="main-image-container">
                      <img
                        src={product.images[selectedImage]}
                        alt="White lace shoes"
                        className="main-image"
                      />
                      <div
                        className="zoom-container overflow-hidden rounded-md"
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        onMouseMove={handleMouseMove}
                      >
                        <img
                          ref={zoomedImageRef}
                          src={product.images[selectedImage]}
                          alt="White lace shoes zoomed"
                          className={`zoomed-image ${
                            isZoomed ? "active sm:block hidden" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="product-info">
                    <div className="product-code">
                      Product code: CJNST144732
                    </div>
                    <div className="product-name font-medium">
                      {product.name}
                    </div>
                    <div className="availability">In Stock</div>
                    <div className="price">₹ {product.price}</div>

                    <div className="quantity-selector">
                      <div className="quantity-input">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(-1)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="quantity-value"
                          value={quantity}
                          readOnly
                        />
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="add-to-cart"
                      onClick={() => handleAddtoCart(product, quantity)}
                    >
                      {cart.some((item) => item?.id === product?.id)
                        ? "Go To Cart"
                        : "Add to Cart"}
                    </button>
                    <button className="buy-now">Buy it now</button>

                    <div className="actions">
                      <button className="action-btn" onClick={()=>addToWishlist(product)} disabled={whishlistitemExists}>
                        <FiHeart fill={whishlistitemExists ? '#000' :'#fff' }/> {whishlistitemExists ? <Link to={'/wishlist'}>Browse Wishlist</Link> : <p>Add to Wishlist</p>}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full justify-center lg:w-[90vw] md:w-[96vw] xl:w-full px-8 lg:px-0 items-start lg:items-center">
                  <div className="tab-buttons w-full flex items-center justify-evenly">
                    <button
                      className={`tab-button ${
                        activeTab === "description" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("description")}
                    >
                      Description
                    </button>
                    <button
                      className={`tab-button ${
                        activeTab === "additional" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("additional")}
                    >
                      <p className="whitespace-nowrap">
                        Additional information
                      </p>
                    </button>
                    <button
                      className={`tab-button ${
                        activeTab === "reviews" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("reviews")}
                    >
                      <p className="whitespace-nowrap">Reviews (0)</p>
                    </button>
                    <button
                      className={`tab-button ${
                        activeTab === "custom" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("custom")}
                    >
                      <p className="whitespace-nowrap">Custom Tab</p>
                    </button>
                  </div>

                  <div className="lg:w-[80vw] w-full">
                    {activeTab === "description" && (
                      <div className="w-full lg:w-[30vw]">
                        <h2 className="font-semibold text-2xl mb-4">
                          Product information
                        </h2>
                        <div className="">
                          <div className="detail-item flex justify-between">
                            <div className="detail-label">Upper material</div>
                            <div className="detail-value line-clamp-1">
                              {productDetails.upperMaterial}
                            </div>
                          </div>
                          <div className="detail-item flex justify-between">
                            <div className="detail-label">Sole Material</div>
                            <div className="detail-value line-clamp-1">
                              {productDetails.soleMaterial}
                            </div>
                          </div>
                          <div className="detail-item flex justify-between">
                            <div className="detail-label">Pattern</div>
                            <div className="detail-value line-clamp-1">
                              {productDetails.pattern}
                            </div>
                          </div>
                          <div className="detail-item flex justify-between">
                            <div className="detail-label">Color</div>
                            <div className="detail-value line-clamp-1">
                              {productDetails.color}
                            </div>
                          </div>
                          <div className="detail-item flex justify-between">
                            <div className="detail-label">Size</div>
                            <div className="detail-value">
                              {productDetails.sizes}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "additional" && (
                      <div className="flex items-center justify-center w-full">
                        <div className="overflow-x-auto w-full mb-10">
                          <table className="min-w-full table-auto border-collapse">
                            <tbody>
                              <tr className="border-b bg-zinc-200">
                                <td className="p-2 text-left font-medium w-1/3">
                                  Weight
                                </td>
                                <td className="p-2 text-left">0.42 kg</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2 text-left font-medium">
                                  Dimensions
                                </td>
                                <td className="p-2 text-left">
                                  300 × 300 × 200 cm
                                </td>
                              </tr>
                              <tr className="border-b bg-zinc-200">
                                <td className="p-2 text-left font-medium">
                                  Size
                                </td>
                                <td className="p-2 text-left">
                                  35, 36, 37, 38, 39, 40, 41, 42, 43
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2 text-left font-medium">
                                  Color
                                </td>
                                <td className="p-2 text-left">White</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {activeTab === "reviews" && (
                      <div className="flex flex-col items-center md:ml-8 lg:ml-0 p-4">
                        {/* Button */}
                        <p
                          onClick={handleToggle}
                          className="cursor-pointer hover:underline"
                        >
                          Write a Review
                        </p>

                        {/* Form Container */}
                        <div
                          className={`mt-4 w-[100vw] lg:w-full p-2 ${
                            isOpen ? "opacity-100" : "opacity-0 w-full h-full"
                          } rounded-lg transition-all duration-100 ease-in-out transform max-h-screen`}
                        >
                          <div className="flex-col md:flex-row flex px-2">
                            <p>Be the first to Review on</p>
                            <p className="font-semibold">"{product.name}"</p>
                          </div>
                          <p className="px-2 text-sm mt-2 -mb-4">
                            Your email address will not be published. Required
                            fields are marked *
                          </p>
                          {isOpen && (
                            <form className="space-y-2 bg-transparent p-0 shadow-none">
                              <div className="flex justify-between w-full lg:gap-8 gap-4">
                                <div className="w-1/2">
                                  <label
                                    htmlFor="name"
                                    className="text-sm font-medium text-gray-700"
                                  >
                                    Name*
                                  </label>
                                  <input
                                    type="text"
                                    id="name"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md "
                                  />
                                </div>
                                <div className="w-1/2">
                                  <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-700"
                                  >
                                    email*
                                  </label>
                                  <input
                                    type="email"
                                    id="name"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md "
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="text-area"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Your review*
                                </label>
                                <textarea
                                  type="text"
                                  id="text-area"
                                  className="mt-1 block w-full h-32 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                              </div>
                              <div className="w-full flex items-center justify-center">
                                <button
                                  type="submit"
                                  className="lg:w-1/6 font-semibold text-white hover:bg-white hover:text-zinc-900 border-2 hover:border-zinc-800 bg-zinc-800 p-2 rounded-lg  transition duration-300"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          )}
                        </div>
                      </div>
                    )}
                    {activeTab === "custom" && (
                      <div className="flex items-center justify-center w-full">
                        <div className="overflow-x-auto w-full mb-10">
                          <table className="min-w-full border-2 table-auto border-collapse">
                            <tbody>
                              <tr className="border-b">
                                <td className="p-3 text-left font-medium w-1/3">
                                  Product Dimensions
                                </td>
                                <td className="p-3 text-left">
                                  17.32 x 13.39 x 2.36 inches; 1.5 Pounds
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3 text-left font-medium">
                                  Item model number
                                </td>
                                <td className="p-3 text-left">YGZ53PUBLACKS</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3 text-left font-medium">
                                  Department
                                </td>
                                <td className="p-3 text-left">Womens</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3 text-left font-medium">
                                  Date First Available
                                </td>
                                <td className="p-3 text-left">
                                  {" "}
                                  July 22, 2017
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3 text-left font-medium">
                                  Manufacturer
                                </td>
                                <td className="p-3 text-left">Sample</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3 text-left font-medium">
                                  Raking
                                </td>
                                <td className="p-3 text-left">
                                  #17,785 in Clothing
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <h1 className="text-xl text-center font-semibold mb-2">
        Related Products
      </h1>
      <div className="w-full overflow-scroll hide-scrollbar">
        <div className="px-4 mt-2 rounded-md mb-4 w-[380vw] xl:w-[195vw]">
          <Scrollcarousel />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
