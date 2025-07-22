import { useState } from "react";

export default function useBundleState() {
  const [bundles, setBundles] = useState([]);
  const [metadata, setMetadata] = useState({
    last_update: null,
    totalBundles: 0,
    isTestMode: false,
    processedCount: 0,
    processingTimeSeconds: 0,
    bundlesPerSecond: 0,
    savedAt: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  return {
    bundles,
    setBundles,
    metadata,
    setMetadata,
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