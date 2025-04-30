import { useState, useEffect, useCallback } from "react";

export default function useAppHandlers({
  loadBundles,
  loadAllBundles,
  loadMoreFromLocalStorage,
  hasMore,
  isLoading,
}) {
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      loadBundles();
      setHasLoaded(true);
    }
  }, [hasLoaded, loadBundles]);

  const handleLoadMore = useCallback(async () => {
    await loadAllBundles();
    setInfiniteScrollEnabled(true);
  }, [loadAllBundles]);

  const handleInfiniteScroll = useCallback(() => {
    if (infiniteScrollEnabled && hasMore && !isLoading) {
      loadMoreFromLocalStorage();
    }
  }, [infiniteScrollEnabled, hasMore, isLoading, loadMoreFromLocalStorage]);

  return {
    infiniteScrollEnabled,
    handleLoadMore,
    handleInfiniteScroll,
  };
}