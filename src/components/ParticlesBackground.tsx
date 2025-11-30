import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const colors = [
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#60a5fa",
  "#93c5fd",
];

interface ParticlesBackgroundProps {
  count?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  overlayColor?: string;
  overlayOpacity?: number;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  count = 50,
  color = "blue",
  opacity = 0.5,
  speed = 1,
  overlayColor = "from-black via-gray-900 to-black",
  overlayOpacity = 0.75,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const isMounted = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Animation loop
    const animate = () => {
      if (!isMounted.current) return;
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(opacity * 100).toString(16);
        ctx.fill();

        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Connect nearby particles
        connectParticles(particle, ctx);

        // Handle boundary collision
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Connect particles that are within a certain distance
    const connectParticles = (
      particle: Particle,
      ctx: CanvasRenderingContext2D
    ) => {
      const maxDistance = 150;

      particlesRef.current.forEach((otherParticle) => {
        if (particle === otherParticle) return;

        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    };

    animate();

    return () => {
      isMounted.current = false;
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [count, color, opacity, speed]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        className={`absolute inset-0 bg-gradient-to-b ${overlayColor} opacity-${Math.round(
          overlayOpacity * 100
        )}`}
      ></div>
    </div>
  );
};

export default ParticlesBackground;
