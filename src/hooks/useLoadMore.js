import { useEffect, useRef, useState } from "react";

// Lightweight "load more on scroll" for client-side lists (no backend
// pagination needed): renders `step` items at a time and grows as the
// sentinel div scrolls into view.
export const useLoadMore = (totalLength, step = 9) => {
  const [visibleCount, setVisibleCount] = useState(step);
  const sentinelRef = useRef(null);

  useEffect(() => {
    setVisibleCount(step);
  }, [totalLength, step]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((c) => Math.min(c + step, totalLength));
        }
      },
      { rootMargin: "250px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [totalLength, step]);

  return { visibleCount, sentinelRef, hasMore: visibleCount < totalLength };
};
