import { useState, useEffect } from "react";

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function debounce(fn, ms) {
      let timer;
      return (_) => {
        clearTimeout(timer);
        timer = setTimeout((_) => {
          timer = null;
          fn.apply(this, arguments);
        }, ms);
      };
    }
    // Handler to call on window resize
    const debouncedHandleResize = debounce(function handleResize() {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 300);
    // Add event listener
    window.addEventListener("resize", debouncedHandleResize);
    // Call handler right away so state gets updated with initial window size
    debouncedHandleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
export default useWindowSize;
