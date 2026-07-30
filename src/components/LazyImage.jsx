import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Only fetches the image once it's near the viewport, and fades it in
// once loaded so scrolling long lists stays smooth.
export const LazyImage = ({ src, alt = "", className = "" }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden bg-romance-100 ${className}`}>
      {inView && src && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full object-cover"
        />
      )}
      {!src && (
        <div className="flex h-full w-full items-center justify-center text-romance-300 text-3xl">
          💜
        </div>
      )}
    </div>
  );
};
