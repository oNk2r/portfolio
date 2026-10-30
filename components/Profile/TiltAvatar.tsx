"use client";

import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface TiltAvatarProps {
  avatarUrl: string | StaticImageData;
  name: string;
}

export const TiltAvatar: React.FC<TiltAvatarProps> = ({ avatarUrl, name }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates relative to card center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth elastic spring physics for card rotation
  const springConfig = { stiffness: 350, damping: 22 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // 3D rotations (up to 18 degrees of tilt)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);

  // Dynamic light sheen following mouse position
  const glareBackground = useTransform(
    [mouseXSpring, mouseYSpring],
    ([currX, currY]) => {
      const px = ((currX as number) + 0.5) * 100;
      const py = ((currY as number) + 0.5) * 100;
      return `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 35%, transparent 70%)`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative shrink-0 [perspective:800px] cursor-pointer select-none"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered
            ? "0 14px 24px -8px rgba(0, 0, 0, 0.3), 0 8px 12px -4px rgba(0, 0, 0, 0.15)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 25 },
          boxShadow: { duration: 0.2 },
        }}
        className="w-16 h-16 sm:w-[74px] sm:h-[74px] p-0.5 rounded-[17px] bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden transition-colors"
      >
        {/* Metallic Bezel Border Gradient */}
        <div
          style={{
            background:
              "linear-gradient(45deg,#999 5%,#fff 10%,#ccc 30%,#ddd 50%,#ccc 70%,#fff 80%,#999 95%)",
          }}
          className="absolute inset-0 rounded-[17px] pointer-events-none opacity-90"
        />

        {/* Ambient sweep highlight */}
        <div className="bg-white dark:bg-neutral-300 absolute h-full blur-lg w-2.5 profile-sweep left-3 pointer-events-none z-10" />

        {/* Dynamic Holographic Glare Overlay */}
        <motion.div
          style={{
            background: glareBackground,
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 rounded-[15px] pointer-events-none z-20 transition-opacity duration-300 mix-blend-overlay"
        />

        {/* Inner Avatar Image */}
        <div className="relative w-full h-full rounded-[15px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 z-0">
          <Image
            src={avatarUrl}
            loading="eager"
            alt={name}
            width={76}
            height={76}
            unoptimized
            className="object-cover pointer-events-none rounded-[15px] w-full h-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default TiltAvatar;
