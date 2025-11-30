import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  type?: "word" | "character";
  staggerChildren?: number;
  once?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  delay = 0,
  duration = 0.05,
  type = "word",
  staggerChildren = 0.03,
  once = true,
}) => {
  // Split text into words or characters
  const items = type === "word" ? text.split(" ") : text.split("");

  // Animation for container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay,
      },
    }),
  };

  // Animation for each word/character
  const child = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{
            whiteSpace: type === "word" ? "normal" : "pre",
            marginRight: type === "word" ? "0.25em" : "0",
          }}
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
