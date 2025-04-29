// Carousel.jsx
import { useEffect, useState } from "react";
import "../styles/Carousel.css"; 

const images = [
  { src: "src/assets/img/banner1.png", link: "#" },
  { src: "src/assets/img/banner1.png", link: "#" },
  { src: "src/assets/img/BannerGameFree2.png", link: "#" },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const changeSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-btn carousel-prev" onClick={prevSlide}>
        &#10094;
      </button>
      <a href={images[currentIndex].link} className="carousel-link">
        <img src={images[currentIndex].src} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
      </a>
      <button className="carousel-btn carousel-next" onClick={nextSlide}>
        &#10095;
      </button>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => changeSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
