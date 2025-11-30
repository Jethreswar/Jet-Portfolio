import React, { useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  perspective?: number;
  glareOpacity?: number;
  glareColor?: string;
  scale?: number;
  disabled?: boolean;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  tiltAmount = 10,
  perspective = 1000,
  glareOpacity = 0.2,
  glareColor = "rgba(255, 255, 255, 0.4)",
  scale = 1.03,
  disabled = false,
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation based on mouse position (inverted for natural feel)
    const rotateX = (mouseY / (rect.height / 2)) * -tiltAmount;
    const rotateY = (mouseX / (rect.width / 2)) * tiltAmount;

    // Update rotation state
    setRotation({ x: rotateX, y: rotateY });

    // Calculate glare position
    const glareX = (mouseX / rect.width) * 100 + 50;
    const glareY = (mouseY / rect.height) * 100 + 50;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    if (disabled) return;

    // Reset rotation and glare
    setRotation({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered && !disabled ? scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
    >
      {children}

      {/* Glare Effect */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, transparent 70%)`,
            opacity: isHovered ? glareOpacity : 0,
            mixBlendMode: "soft-light",
          }}
          animate={{
            opacity: isHovered ? glareOpacity : 0,
          }}
          transition={{
            opacity: { duration: 0.3 },
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
