import { useEffect, useState } from "react";
import "../styles/Carousel.css";

const monthlyBanners = [
  "/img/BM/banner_month_1.png",  // Janeiro
  "/img/BM/banner_month_2.png",  // Fevereiro
  "/img/BM/banner_month_3.png",  // Março
  "/img/BM/banner_month_4.png",  // Abril
  "/img/BM/banner_month_5.png",  // Maio
  "/img/BM/banner_month_6.png",  // Junho
  "/img/BM/banner_month_7.png",  // Julho
  "/img/BM/banner_month_8.png",  // Agosto
  "/img/BM/banner_month_9.png",  // Setembro
  "/img/BM/banner_month_10.png", // Outubro
  "/img/BM/banner_month_11.png", // Novembro
  "/img/BM/banner_month_12.png", // Dezembro
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const month = new Date().getMonth(); 
  const monthBannerIndex = (month); 
  const images = [
    { src: "/img/banner0.png", link: "/" },
    { src: monthlyBanners[monthBannerIndex], link: "/Evento" },
    { src: "/img/BannerGameFree2.png", link: "/Free" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const changeSlide = (index) => setCurrentIndex(index);
  const nextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

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
