import { useState } from "react";

export default function useBundleState() {
  const [bundles, setBundles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  return {
    bundles,
    setBundles,
    isLoading,
    setIsLoading,
    error,
    setError,
    hasMore,
    setHasMore,
    currentIndex,
    setCurrentIndex,
  };
}