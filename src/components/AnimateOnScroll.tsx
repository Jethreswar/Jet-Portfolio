import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, Variant } from "framer-motion";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?:
    | "fadeIn"
    | "slideUp"
    | "slideLeft"
    | "slideRight"
    | "zoom"
    | "none";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
  customVariants?: {
    hidden: Variant;
    visible: Variant;
  };
}

const getVariants = (animation: string) => {
  switch (animation) {
    case "fadeIn":
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    case "slideUp":
      return {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      };
    case "slideLeft":
      return {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1 },
      };
    case "slideRight":
      return {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1 },
      };
    case "zoom":
      return {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
      };
    default:
      return {
        hidden: {},
        visible: {},
      };
  }
};

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 0.5,
  className = "",
  threshold = 0.1,
  once = true,
  customVariants,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const variants = customVariants || getVariants(animation);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || (once && hasAnimated)) return;

      const element = ref.current;
      const elementTop = element.getBoundingClientRect().top;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;

      // Check if element is in viewport
      if (elementTop < windowHeight - elementHeight * threshold) {
        controls.start("visible");
        if (once) setHasAnimated(true);
      } else if (!once) {
        controls.start("hidden");
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, threshold, once, hasAnimated, animation]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;
