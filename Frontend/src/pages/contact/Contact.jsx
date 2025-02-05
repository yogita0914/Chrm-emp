import React, { useState } from "react";
import { FaReact, FaFacebookF, FaInstagram } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };
  return (
    <div className="contact-container">
      <div className="privacy-breadcrumb-title-wrapper">
        <div className="policy-breadcrumb-content">
          <div className="policy-breadcrumb-title">
            <div className="policy-breadcrumbs-container">
              <span className="policy-breadcrumb-item">
                <a href="/">Home</a>
              </span>
              <span className="policy-brn_arrow"> / </span>
              <span className="policy-breadcrumb-item policy-current">
                Contact Us
              </span>
            </div>
            <h1 className="privacy-heading-title">Contact Us</h1>
          </div>
        </div>
      </div>
      <div className="contact-section">
        <div className="contact-body">
          <div className="contact-content">
            <div className="contact-details">
              <h2 className="contact-heading">Where You Can Find Us</h2>
              <p>
                <strong>Company Name:</strong> The Entrepreneurship Network
              </p>
              <p>
                <strong>Name of Premises/Building:</strong> India Accelerator,
                Noida
              </p>
              <p>
                <strong>State:</strong> Uttar Pradesh
              </p>
              <p>
                <strong>PIN Code:</strong> 201301
              </p>

              <h2 className="contact-heading">Contact Information</h2>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="marketing@entrepreneurshipnetwork.net"
                  className="email-link"
                >
                  marketing@entrepreneurshipnetwork.net
                </a>
              </p>

              <div className="social-links">
                <a
                  href="https://www.facebook.com"
                  aria-label="Facebook"
                  className="social-icon"
                >
                  <FaFacebookF size={30} color="#3b5998" />
                </a>
                <a
                  href="https://www.instagram.com"
                  aria-label="Instagram"
                  className="social-icon"
                >
                  <FaInstagram size={30} color="#E4405F" />
                </a>
              </div>
            </div>

            <div className="contact-images">
              <img
                src="https://ukbhatia.com/wp-content/uploads/2023/12/worker-using-digital-application-2048x1365.jpg"
                alt="Contact Us"
                className="contact-image"
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>
            <strong>Fill up the form if you have any question</strong>
          </h1>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your message (optional)"
            value={formData.message}
            onChange={handleChange}
          />
          <button type="submit" className="contact-button">
            Submit
          </button>
        </form>
        <div className="map ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112178.64480204455!2d77.40182545!3d28.5222018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1736344469037!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
