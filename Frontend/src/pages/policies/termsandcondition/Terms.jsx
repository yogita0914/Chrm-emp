import React from "react";
import "./Policy.css";

const Terms = () => {
  const sections = [
    {
      title: "1. General Information",
      content:
        "Charm Emporium specializes in women’s fashion and lifestyle products. Our inventory is subject to availability, and product details may change without prior notice.",
    },
    {
      title: "2. Pricing and Payment",
      content:
        "Prices are displayed in Indian Rupees (INR) and are subject to change. Payment methods include credit/debit cards, UPI, and secure online wallets. Applicable taxes and shipping fees are calculated at checkout.",
    },
    {
      title: "3. Order Placement",
      content:
        "Orders placed on our website are processed within 2-3 business days. You will receive an order confirmation via email. We reserve the right to cancel orders in cases of stock unavailability or payment issues.",
    },
    {
      title: "4. Shipping and Delivery",
      content:
        "We ship across India. Delivery timelines depend on your location and chosen shipping method. Tracking information will be shared via email after your order is dispatched.",
    },
    {
      title: "5. Returns and Refunds",
      content:
        "Items can be returned within 14 days of delivery if unused and in their original packaging. Refunds for eligible returns will be processed within 7 business days. Certain items, like makeup, are non-returnable for hygiene reasons.",
    },
    {
      title: "6. Product Description",
      content:
        "We strive for accuracy in product descriptions. However, slight variations in color or appearance may occur due to screen resolutions or manufacturing processes.",
    },
    {
      title: "7. Promotions and Discounts",
      content:
        "Promotional offers and discounts are subject to terms and conditions, including validity periods. Discounts cannot be combined with other offers unless stated.",
    },
    {
      title: "8. Intellectual Property",
      content:
        "All content, including images, logos, and text on Charm Emporium, is the intellectual property of our company. Unauthorized use or reproduction is prohibited.",
    },
    {
      title: "9. Liability",
      content:
        "Charm Emporium is not liable for delays, damages, or losses caused by circumstances beyond our control, such as shipping delays or natural disasters.",
    },
  ];

  return (
    <div className="policy">
      <div className="privacy-breadcrumb-title-wrapper">
        <div className="policy-breadcrumb-content">
          <div className="policy-breadcrumb-title">
            <div className="policy-breadcrumbs-container">
              <span className="policy-breadcrumb-item">
                <a href="/">Home</a>
              </span>
              <span className="policy-brn_arrow"> / </span>
              <span className="policy-breadcrumb-item policy-current">
                Terms and Conditions
              </span>
            </div>
            <h1 className="privacy-heading-title">Terms and Conditions</h1>
          </div>
        </div>
      </div>

      <div className="policy-container">
        {/* <h1 className="policy-title">Terms and Conditions</h1> */}
        <p className="policy-intro">
          Welcome to <strong>Charm Emporium!</strong> By accessing or using our
          website, you agree to comply with the following terms and conditions.
          These terms govern your use of our platform and the purchase of
          products, including women’s clothing, bags, makeup, and shoes.
        </p>

        {sections.map((section, index) => (
          <section key={index} className="policy-section">
            <h2 className="section-title">{section.title}</h2>
            <p>{section.content}</p>
          </section>
        ))}

        <section className="policy-section">
          <h2 className="section-title">10. Contact Us</h2>
          <p>
            For questions or concerns, contact us at:
            <br />
            <strong>Charm Emporium</strong>
            <br />
            The Entrepreneurship Network
            <br />
            India Accelerator, Noida 201301 UP, India
            <br />
            Email:{" "}
            <a href="mailto:marketing@entrepreneurshipnetwork.net">
              <strong>marketing@entrepreneurshipnetwork</strong>
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
