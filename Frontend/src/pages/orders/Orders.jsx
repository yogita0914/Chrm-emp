import React, { useState, useEffect } from "react";
import "./Order.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [tempStatusFilter, setTempStatusFilter] = useState("");
  const [tempTimeFilter, setTempTimeFilter] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 450);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [submittedReview, setSubmittedReview] = useState(null);

  const handleStarClick = (star) => {
    setRating(star); // Update the rating based on the clicked star
  };

  const handleSubmitReview = () => {
    if (rating === 0 || reviewText.trim() === "") {
      alert("Please provide a rating and a review.");
      return;
    }
    setSubmittedReview({ rating, reviewText });
    setReviewText("");
    setRating(0);
  };
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 450);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const mockOrders = [
      {
        id: 1,
        date: "2025-01-20",
        total: "₹1300.00",
        status: "Delivered",
        products: [
          {
            id: 1,
            ownerName: "Priyanka",
            contact: "0123456789",
            orderNumber: "A123",
            name: "High Neck Full Sleeve Top",
            size: "M",
            price: "₹1200.00",
            add: "123, Green Street, Panvel, India",
            imageUrl:
              "https://m.media-amazon.com/images/I/61GKwg2NOmL._SY550_.jpg",
          },
        ],
      },
      {
        id: 2,
        orderNumber: "B456",
        date: "2025-01-15",
        total: "₹5500.00",
        status: "Shipped",
        products: [
          {
            id: 2,
            ownerName: "Priyanka",
            contact: "0123456789",
            add: "123, Green Street, Panvel, India",
            orderNumber: "B456",
            size: "M",
            name: "Designer Lehenga",
            price: "₹5000.00",
            imageUrl:
              "https://cygnusfashion.com/cdn/shop/products/KF-1229_2.jpg?v=1621667865",
          },
        ],
      },
      {
        id: 3,
        orderNumber: "C789",
        date: "2025-01-10",
        total: "₹700.00",
        status: "Order Confirmed",
        products: [
          {
            id: 5,
            ownerName: "Priyanka",
            contact: "0123456789",
            add: "123, Green Street, Panvel, India",
            orderNumber: "B456",
            size: "M",
            name: "Long Sleeve Bodycon Dress for Women",
            price: "₹668.00",
            imageUrl:
              "https://th.bing.com/th/id/OIP.H7T_XH4lFlJd0Jrp_QOaSQHaLz?w=197&h=315&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          },
        ],
      },
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Apply filters based on the searchTerm, statusFilter, and timeFilter
    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.products.some((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (timeFilter) {
      const currentDate = new Date();
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date);
        if (timeFilter === "Last 7 Days") {
          return (currentDate - orderDate) / (1000 * 60 * 60 * 24) <= 7;
        } else if (timeFilter === "Last 30 Days") {
          return (currentDate - orderDate) / (1000 * 60 * 60 * 24) <= 30;
        }
        return true;
      });
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, timeFilter, orders]);

  const applyFilters = () => {
    setStatusFilter(tempStatusFilter);
    setTimeFilter(tempTimeFilter);
    setIsFilterDrawerOpen(false);
  };

  const cancelFilters = () => {
    setTempStatusFilter(statusFilter);
    setTempTimeFilter(timeFilter);
    setIsFilterDrawerOpen(false);
  };

  const clearFilters = () => {
    setTempStatusFilter("");
    setTempTimeFilter("");
    setSearchTerm(""); // Reset the search term as well
    setStatusFilter("");
    setTimeFilter("");
    setIsFilterDrawerOpen(false);
  };

  const handleArrowClick = (product, status) => {
    setSelectedProduct({ ...product, status });
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const renderStatusLine = (status) => {
    const steps = [
      "Order Confirmed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ];
    const currentStep = steps.indexOf(status) + 1;

    return (
      <div className="order-status-line">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`order-status-step ${
              index < currentStep ? "completed" : ""
            }`}
          >
            <div
              className={`order-circle ${
                index < currentStep ? "green-circle" : ""
              }`}
            >
              {index + 1}
            </div>
            <p
              className={`step-label ${
                index < currentStep ? "green-text" : ""
              }`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const getStatusProgress = (status) => {
    const statuses = [
      "Order Confirmed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ];
    const index = statuses.indexOf(status);
    return ((index + 1) / statuses.length) * 100; // Calculate percentage
  };

  return (
    <div className="orders-section">
      {selectedProduct ? (
        <div className="order-product-details-view">
          <div className="privacy-breadcrumb-title-wrapper">
            <div className="policy-breadcrumb-content">
              <div className="policy-breadcrumb-title">
                <div className="policy-breadcrumbs-container">
                  <span className="policy-breadcrumb-item">
                    <a href="/">Home</a>
                  </span>
                  <span className="policy-brn_arrow"> / </span>
                  <span className="policy-breadcrumb-item policy-current">
                    Orders
                  </span>
                </div>
                <h1 className="privacy-heading-title">Orders</h1>
              </div>
            </div>
          </div>
          <button className="order-back-button" onClick={handleBack}>
            ← Back to Orders
          </button>
          <div className="order-product-details-container">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="order-product-details-image"
            />
            <div className="order-product-details-info">
              <p className="order-id">
                Order ID: {selectedProduct.orderNumber}
              </p>
              <h2 className="order-product-title">{selectedProduct.name}</h2>
              <p className="order-product-size">Size: {selectedProduct.size}</p>
              <p className="order-product-price">
                Price: {selectedProduct.price}
              </p>
            </div>
            {renderStatusLine(selectedProduct.status)}
          </div>

          {/* Review Section */}
          <div className="order-product-review-details">
            <h3>Write a Review</h3>
            <div className="order-star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? "filled" : ""}`}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              rows="4"
            ></textarea>
            <button
              className="order-review-button"
              onClick={handleSubmitReview}
            >
              Submit Review
            </button>
          </div>

          <div className="order-product-address-details">
            <h2>Address Details</h2>
            <p>Name: {selectedProduct.ownerName}</p>
            <p>Address: {selectedProduct.add}</p>
            <p>Contact No: {selectedProduct.contact}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="privacy-breadcrumb-title-wrapper">
            <div className="policy-breadcrumb-content">
              <div className="policy-breadcrumb-title">
                <div className="policy-breadcrumbs-container">
                  <span className="policy-breadcrumb-item">
                    <a href="/">Home</a>
                  </span>
                  <span className="policy-brn_arrow"> / </span>
                  <span className="policy-breadcrumb-item policy-current">
                    Orders
                  </span>
                </div>
                <h1 className="privacy-heading-title">Orders</h1>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="order-filter-row">
            <div className="order-search">
              <input
                type="text"
                placeholder="Search your order here"
                value={searchTerm} // Directly bind to searchTerm
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on user input
              />
            </div>

            {/* Show Dropdown on bigger screens */}
            {!isMobileView && (
              <div className="order-filters">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Filter by Status</option>
                  {["Delivered", "Shipped", "Order Confirmed"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option value="">Filter by Time</option>
                  {["Last 7 Days", "Last 30 Days"].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Show Filter Drawer on mobile screens */}
            {isMobileView && (
              <div
                className="order-filters"
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              >
                <div className="order-menu-icon">☰</div>
                <h6>Filter</h6>
              </div>
            )}
          </div>

          {/* Filter Drawer */}
          {isFilterDrawerOpen && isMobileView && (
            <div className="order-filter-drawer">
              <div className="order-clear-filter" onClick={clearFilters}>
                Clear
              </div>
              <div>
                <h4>Status</h4>
                <div className="order-filter-options">
                  {["Delivered", "Shipped", "Order Confirmed"].map((status) => (
                    <button
                      key={status}
                      className={tempStatusFilter === status ? "selected" : ""}
                      onClick={() => setTempStatusFilter(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <h4>Time</h4>
                <div className="order-filter-options">
                  {["Last 7 Days", "Last 30 Days"].map((time) => (
                    <button
                      key={time}
                      className={tempTimeFilter === time ? "selected" : ""}
                      onClick={() => setTempTimeFilter(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={applyFilters}>Apply</button>
              <button onClick={cancelFilters}>Cancel</button>
            </div>
          )}
          <div className="order-list">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-item">
                {order.products.map((product) => (
                  <div key={product.id} className="order-product-item">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="order-product-image"
                    />
                    <div className="order-product-details">
                      <p className="order-delivery-date">
                        {order.status === "Delivered"
                          ? `Delivered on: ${order.date}`
                          : `Status: ${order.status}`}
                      </p>
                      <h3>{product.name}</h3>
                      <div className="order-rating">★ ★ ★ ★ ★</div>
                      <a href={""} className="order-write-review-link">
                        Write a Review
                      </a>
                    </div>
                    {/* Add the status bar */}
                    <div className="order-larger-status-line">
                      {renderStatusLine(order.status)}
                    </div>

                    <div
                      className="order-arrow-icon"
                      onClick={() => handleArrowClick(product, order.status)}
                    >
                      →
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
