import { useEffect } from "react";

const useInfiniteScroll = (callback, isLoading, hasMore) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.body.offsetHeight;

      if (scrollPosition >= documentHeight - 500 && !isLoading && hasMore) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, isLoading, hasMore]); 
};

export default useInfiniteScroll;