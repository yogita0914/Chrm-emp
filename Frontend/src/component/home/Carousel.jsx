import React, { useState, useEffect } from 'react';
import './Carousel.css';  // Import the CSS for styling


const Carousel = ({ images, autoPlay = false, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Move to the next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Auto play the carousel
  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(intervalId); // Clean up on component unmount
    }
  }, [autoPlay, autoPlayInterval]);

  return (
    <div className="carousel-container-wrapper">
      <button className="carousel-button prev" onClick={goToPrevious}>
        &#10094;
      </button>

      <div className="carousel-images-wrapper">
        <img src={images[currentIndex]} alt={`Image ${currentIndex}`} className="carousel-image" />
      </div>

      <button className="carousel-button next" onClick={goToNext}>
        &#10095;
      </button>

      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
