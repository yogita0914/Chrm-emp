import React from "react";
import "./Aboutus.css";
import { Aboutlist } from "../../assets/data/Aboutlist.js";
import { Aboutlast } from "../../assets/data/Aboutlast.js";



const Aboutus = () => {
  return (
    <div className="about-main-section">
      <div className="privacy-breadcrumb-title-wrapper">
        <div className="policy-breadcrumb-content">
          <div className="policy-breadcrumb-title">
            <div className="policy-breadcrumbs-container">
              <span className="policy-breadcrumb-item">
                <a href="/">Home</a>
              </span>
              <span className="policy-brn_arrow"> / </span>
              <span className="policy-breadcrumb-item policy-current">About Us</span>
            </div>
            <h1 className="privacy-heading-title">About Us</h1>
          </div>
        </div>
      </div>

      {/* First Part */}
      <div className="aboutTop-section">
        <div className="about-welcome">
          <h1>Innovating Style, Redefining Fashion.</h1>
          <h2>Welcome to Charm Emporium</h2>
          <p>
            At <b>Charm Emporium</b>, fashion is more than just attire; it's a
            canvas for self-expression and creativity. We embarked on this
            journey with a vision to blend contemporary trends with timeless
            elegance, delivering a personalized shopping experience. Rooted in
            the vibrant culture of the India, we aim to inspire confidence and
            celebrate individuality through every piece we offer.
          </p>
        </div>
        <div className="about-imageTop">
          <img
            src="https://ukbhatia.com/wp-content/uploads/2023/12/imagess-2048x1365.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="about-card-container">
        <div className="about-cardMain">
          {Aboutlist.map((item) => (
            <div key={item.id} className="about-card">
              <div className="about-logo-container">
                <img src={item.image} alt="" />
              </div>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Image Part */}
      <div className="about-fixedImage">
        <div className="about-fixedImage-content">
          <h1 className="about-fixedImage-title">Parallax with <br /> another video</h1>
          <h2 className="about-fixedImage-subtitle">More eye-catching</h2>
          <button className="about-fixedImage-button">Shop Now</button>
        </div>
      </div>

      {/* Last Part */}
      <div className="about-bottomPart">
        <div className="about-headline">
          <h1>Effortless shopping, tailored to support your every need.</h1>
        </div>
        <div className="about-bottom-container">
          {Aboutlast.map((data) => (
            <div key={data.id} className="about-bottom-card">
              <div className="about-bottom-logo">
                <img src={data.image} alt="" />
              </div>
              <h1>{data.title}</h1>
              <p>{data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
