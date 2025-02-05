import React from "react";
import "../termsandcondition/Policy.css";

const FAQ = () => {
  const faqs = [
    {
      title: "1. How do I place an order on Charm Emporium?",
      content:
        "To place an order, browse our products, add your desired items to the cart, and proceed to checkout. Follow the instructions to complete your purchase.",
    },
    {
      title: "2. What payment methods do you accept?",
      content:
        "We accept major credit/debit cards, net banking, UPI, and digital wallets like PayPal and Google Pay.",
    },
    {
      title: "3. How can I track my order?",
      content:
        "Once your order is shipped, you will receive an email with the tracking number and a link to track your package.",
    },
    {
      title: "4. What is your return and exchange policy?",
      content:
        "We accept returns within 30 days of delivery. Items must be unused and in original packaging. Please visit our Returns page for more details.",
    },
    {
      title: "5. I forgot my password. How can I reset it?",
      content:
        "Click on the 'Forgot your password?' link on the sign-in page, enter your registered email, and follow the instructions to reset your password.",
    },
    {
      title: "6. Do you offer international shipping?",
      content:
        "Yes, we offer international shipping to selected countries. Shipping fees and delivery times may vary based on the destination.",
    },
    {
      title: "7. How do I apply a discount code?",
      content:
        "During checkout, enter your discount code in the provided field and click 'Apply' to see the discount reflected in your total.",
    },
    {
      title: "8. How can I contact customer support?",
      content:
        "You can reach our customer support team via email at support@charmemporium.com or call us at +91-123-456-7890.",
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
              <span className="policy-breadcrumb-item policy-current">FAQ</span>
            </div>
            <h1 className="privacy-heading-title">Frequently Asked Questions (FAQ)</h1>
          </div>
        </div>
      </div>

      <div className="policy-container">
        <p className="policy-intro">
          Welcome to <strong>Charm Emporium's FAQ Section!</strong> Here you'll find
          answers to the most common questions about our services.
        </p>

        {faqs.map((faq, index) => (
          <section key={index} className="policy-section">
            <h2 className="section-title">{faq.title}</h2>
            <p>{faq.content}</p>
          </section>
        ))}

        <section className="policy-section">
          <h2 className="section-title">Contact US</h2>
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

export default FAQ;
