document.addEventListener("DOMContentLoaded", () => {
  const bannerOferta = document.querySelector(".banner-oferta");

  bannerOferta.innerHTML = `
  <div class="carousel">
      <button class="carousel-btn carousel-prev">&#10094;</button>
      <a href="#" class="carousel-link">
          <img src="" alt="Slide 1" class="carousel-image">
      </a>
      <button class="carousel-btn carousel-next">&#10095;</button>
      <div class="carousel-dots"></div>
  </div>
`;

  const images = [
    { src: "public/img/banner1.png", link: "#" },
    { src: "public/img/banner1.png", link: "#" },
    { src: "public/img/BannerGameFree2.png", link: "#" },
  ];

  let currentIndex = 0;
  const imgElement = document.querySelector(".carousel-image");
  const linkElement = document.querySelector(".carousel-link");
  const dotsContainer = document.querySelector(".carousel-dots");

  images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => changeSlide(index));
    dotsContainer.appendChild(dot);
  });

  const updateCarousel = () => {
    imgElement.src = images[currentIndex].src;
    linkElement.href = images[currentIndex].link;
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  };

  const changeSlide = (index) => {
    currentIndex = index;
    updateCarousel();
  };

  // CORREÇÃO AQUI: Agora está pegando as classes corretas dos botões
  document.querySelector(".carousel-prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  document.querySelector(".carousel-next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }, 10000);

  updateCarousel();
});
