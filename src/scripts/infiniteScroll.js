import { fetchBundles, currentPage, totalPages, isLoading } from "./script.js";

function handleScroll() {
  const footer = document.querySelector("footer");
  const footerHeight = footer.offsetHeight;
  const scrollPosition = window.innerHeight + window.scrollY;
  const documentHeight = document.body.offsetHeight - footerHeight;

  if (scrollPosition >= documentHeight - 500 && !isLoading) {
    if (currentPage < totalPages) {
      setTimeout(() => {
        fetchBundles(currentPage + 1);
      }, 500); // delay de 500ms
    }
  }
}

function handleLoadMore() {
  if (!isLoading && currentPage < totalPages) {
    fetchBundles(currentPage + 1);
    window.addEventListener("scroll", handleScroll);
    document.getElementById("loadMore").style.display = "none";
  }
}

fetchBundles();

document.getElementById("loadMore").addEventListener("click", handleLoadMore);
