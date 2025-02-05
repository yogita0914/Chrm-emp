import React from "react";
import "../termsandcondition/Policy.css";

const CancellationPolicy = () => {
  const sections = [
    {
      title: "1. Effective Date",
      content: "This Cancellation Policy is effective as of 30/02/2025."
    },
    {
      title: "2. Cancellation Period",
      content: "You may request a cancellation of your order within 7 days from the date of delivery. Requests made after this period will not be eligible for a refund or exchange."
    },
    {
      title: "3. How to Request a Cancellation",
      content: "Send an email to marketing@entrepreneurshipnetwork.net with your order number, name, delivery date, and a brief explanation of your cancellation request."
    },
    {
      title: "4. Conditions for Cancellation",
      content: "The product must be in its original, unused condition with all tags and packaging intact. You may be required to return the product to us as per provided instructions."
    },
    {
      title: "5. Refund Process",
      content: "If your cancellation request is approved, we will process your refund within 7 business days of receiving the returned product. Refunds will be issued to the original payment method."
    },
    {
      title: "6. Shipping Costs",
      content: "Shipping costs are non-refundable. You may be responsible for return shipping charges unless stated otherwise."
    },
    {
      title: "7. Non-Cancelable Items",
      content: "Customized or made-to-order products, used or altered items, and items not in their original packaging cannot be canceled or returned."
    },
    {
      title: "8. Exceptions",
      content: "Exceptions apply in cases of defective or damaged products. Contact us immediately upon receiving such items for assistance."
    },
    {
      title: "9. Contact Information",
      content: "For any questions or to request a cancellation, contact us at: Charm Emporium, The Entrepreneurship Network, India Accelerator, Noida 201301 UP, India. Email: marketing@entrepreneurshipnetwork.net"
    }
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
                Cancellation Policy
              </span>
            </div>
            <h1 className="privacy-heading-title">Cancellation Policy</h1>
          </div>
        </div>
    
      </div>

      <div className="policy-container">
        <p className="policy-intro">
          Welcome to <strong>Charm Emporium!</strong> This Cancellation Policy outlines the terms and conditions under which you may cancel your order after delivery.
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

export default CancellationPolicy;