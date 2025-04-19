"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  threshold?: number; // Percentage of element visible before animation triggers
  delay?: number; // Delay in ms before animation starts
}

const AnimateOnScroll = ({
  children,
  threshold = 0.1,
  delay = 0,
}: AnimateOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is in view
        if (entry.isIntersecting) {
          // Add delay if specified
          setTimeout(() => {
            setIsVisible(true);
          }, delay);

          // Unobserve after animation is triggered
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold, // Trigger when this percentage of the element is visible
        rootMargin: "0px", // No margin
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay]);

  const animationStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 1.5s ease, transform 1.5s ease ${delay}ms`,
  };

  return (
    <div ref={ref} style={animationStyles}>
      {children}
    </div>
  );
};

export default AnimateOnScroll;
