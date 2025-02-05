import React from "react";
import "../termsandcondition/Policy.css";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Introduction",
      content:
        "At Charm Emporium, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information.",
    },
    {
      title: "2. Information We Collect",
      content:
        "We collect personal information like your name, email, phone number, and payment details when you register, make a purchase, or contact us.",
    },
    {
      title: "3. How We Use Your Information",
      content:
        "Your information is used to process orders, provide customer support, send updates, and improve our website experience.",
    },
    {
      title: "4. Sharing Your Information",
      content:
        "We do not sell your personal information. However, we may share it with trusted service providers or comply with legal obligations.",
    },
    {
      title: "5. Data Security",
      content:
        "We implement reasonable security measures to protect your data. However, no method of transmission over the internet is completely secure.",
    },
    {
      title: "6. Cookies and Tracking",
      content:
        "We use cookies to enhance your browsing experience and analyze site traffic. You can manage cookies through your browser settings.",
    },
    {
      title: "7. Your Rights",
      content:
        "You have the right to access, update, or delete your personal information. Contact us to exercise these rights.",
    },
    {
      title: "8. Third-Party Links",
      content:
        "Our site may include links to third-party websites. We are not responsible for their privacy practices. Review their policies before sharing information.",
    },
    {
      title: "9. Policy Updates",
      content:
        "We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.",
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
                Privacy Policy
              </span>
            </div>
            <h1 className="privacy-heading-title">Privacy Policy</h1>
          </div>
        </div>
      </div>

      <div className="policy-container">
        <p className="policy-intro">
          Welcome to <strong>Charm Emporium!</strong> This Privacy Policy
          explains how we manage your personal information while using our
          services.
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

export default PrivacyPolicy;
