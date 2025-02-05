import React from "react";
import "../termsandcondition/Policy.css";

const RefundAndReturnPolicy = () => {
  const sections = [
    {
      title: "1. Overview",
      content:
        "At Charm Emporium, we aim to ensure complete satisfaction with your purchase. If you're not satisfied with your order, our return and refund policy is here to assist you.",
    },
    {
      title: "2. Domestic Returns",
      content:
        "For orders within India, you may initiate a return within 7 working days from the delivery date. The item must be unused and in its original packaging.",
    },
    {
      title: "3. Flexible Returns Policy",
      content:
        "Enjoy a hassle-free return process within 10 working days from delivery. Ensure the product is unused, in its original condition, and returned with all packaging intact.",
    },

    {
      title: "4. Return Process",
      content:
        "To return an items with your order details. Our team will guide you through the return process and provide all necessary instructions.",
    },

    {
      title: "5. Refund Process",
      content:
        "After receiving and inspecting the returned item, we will process your refund to the original payment method within 7-10 business days.",
    },
    {
      title: "6. Non-Returnable Items",
      content:
        "Certain items are non-returnable, including but not limited to customized products, sale items, and undergarments/swimwear for hygiene reasons.",
    },
    {
      title: "7. Exchange Policy",
      content:
        "Currently, we do not offer exchanges. Please return the original item and place a new order.",
    },
    {
      title: "8. Cancellation Policy",
      content:
        "Orders can be canceled within 24 hours of placement for a full refund. After this period, cancellations are not guaranteed and may be subject to review.",
    },
    {
      title: "9. Damaged or Defective Items",
      content:
        "If you receive a damaged or defective item, contact us immediately with images and order details. We will provide a replacement or refund as applicable.",
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
                Refund & Return Policy
              </span>
            </div>
            <h1 className="privacy-heading-title">Refund & Return Policy</h1>
          </div>
        </div>
      </div>

      <div className="policy-container">
        <p className="policy-intro">
          At <strong>Charm Emporium!</strong>, we are committed to providing you
          with high-quality products and excellent customer service. Below is
          our return and refund policy to address any concerns with your
          purchase.
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

export default RefundAndReturnPolicy;
