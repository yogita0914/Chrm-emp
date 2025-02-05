import React, { useEffect, useRef, useState } from 'react';
import './Products.css';

const Products = () => {
  const containerRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState('left');
  const [scrollIntervalId, setScrollIntervalId] = useState(null);
  const [scrollSpeed, setScrollSpeed] = useState(5); // Default scroll speed

  const navigateToPage = (pageUrl) => {
    window.location.href = pageUrl;
  };

  // Auto-scrolling function
  const autoScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      if (scrollDirection === 'left') {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          setScrollDirection('right');
        }
      } else if (scrollDirection === 'right') {
        container.scrollLeft -= scrollSpeed;
        if (container.scrollLeft <= 0) {
          setScrollDirection('left');
        }
      }
    }
  };

  useEffect(() => {
    // Adjust scroll speed based on window width
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setScrollSpeed(8); // Increase speed for small screens
      } else {
        setScrollSpeed(5); // Default speed for larger screens
      }
    };

    handleResize(); // Set initial scroll speed
    window.addEventListener('resize', handleResize); // Listen for window resize

    // Start auto-scrolling
    const intervalId = setInterval(autoScroll, 30); // Scroll interval
    setScrollIntervalId(intervalId);

    return () => {
      // Clean up interval on component unmount and remove resize event listener
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollDirection]);

  // Handle mouse enter and leave events for stopping/resuming auto-scroll
  const handleMouseEnter = () => {
    if (scrollIntervalId) {
      clearInterval(scrollIntervalId);
    }
  };

  const handleMouseLeave = () => {
    const intervalId = setInterval(autoScroll, 30);
    setScrollIntervalId(intervalId);
  };

  // Handle stopping auto-scroll when clicking a card
  const handleCardClick = () => {
    if (scrollIntervalId) {
      clearInterval(scrollIntervalId);
    }
  };

  // Updated cards array with image URLs
  const cards = [
    { imageUrl: "https://m.media-amazon.com/images/I/71kyVbvrzzL._SY879_.jpg", page: "" },
    { imageUrl: "https://th.bing.com/th/id/OIP.ywQhtPsI53naKNNcXBvaLQHaJ4?w=202&h=269&c=7&r=0&o=5&dpr=1.3&pid=1.7", page: "" },
    { imageUrl: "https://i5.walmartimages.com/asr/4f17b3bc-39a7-4774-9102-e6bcdbdd0ff1_1.60e025630c8481ecb14f2a600164138c.jpeg", page: "" },
    { imageUrl: "https://i.pinimg.com/originals/5a/08/7e/5a087e577562639cc9508c79c7937a5c.jpg", page: "" },
    { imageUrl: "https://m.media-amazon.com/images/I/616yQv0o66L._UL1500_.jpg", page: "" },
    { imageUrl: "https://th.bing.com/th/id/OIP._3Q_vXsEv7vpLfwLACS3dAHaHa?rs=1&pid=ImgDetMain", page: "" },
    { imageUrl: "https://m.media-amazon.com/images/I/61AbrwN6PqL._SX679_.jpg", page: "" },
    { imageUrl: "https://m.media-amazon.com/images/I/71kyVbvrzzL._SY879_.jpg", page: "" },
    { imageUrl: "https://th.bing.com/th/id/OIP.ywQhtPsI53naKNNcXBvaLQHaJ4?w=202&h=269&c=7&r=0&o=5&dpr=1.3&pid=1.7", page: "" },
    { imageUrl: "https://i5.walmartimages.com/asr/4f17b3bc-39a7-4774-9102-e6bcdbdd0ff1_1.60e025630c8481ecb14f2a600164138c.jpeg", page: "" },
    { imageUrl: "https://i.pinimg.com/originals/5a/08/7e/5a087e577562639cc9508c79c7937a5c.jpg", page: "" },
    { imageUrl: "https://m.media-amazon.com/images/I/616yQv0o66L._UL1500_.jpg", page: "" },
    { imageUrl: "https://th.bing.com/th/id/OIP._3Q_vXsEv7vpLfwLACS3dAHaHa?rs=1&pid=ImgDetMain", page: "" },
    { imageUrl: "https://m.media-amazon.com/images/I/61AbrwN6PqL._SX679_.jpg", page: "" },
  ];

  return (
    <div
      className="scroll-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container" ref={containerRef}>
        {cards.map((card, index) => (
          <div
            key={index}
            className="w10-card"
            onClick={() => {
              navigateToPage(card.page);
              handleCardClick(); // Stop auto-scrolling when card is clicked
            }}
          >
            <img
              src={card.imageUrl}
              alt={`Card ${index + 1}`}
              className="card-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
