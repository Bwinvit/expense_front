import { useState, useEffect, useRef, useCallback } from "react";

const useDimensions = () => {
  const ref = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = useCallback(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => updateDimensions());
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, [updateDimensions]);

  return [ref, dimensions];
};

export default useDimensions;
