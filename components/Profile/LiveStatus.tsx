"use client";

import { useState, useRef, useEffect } from "react";
import siteConfig from "@/config/site";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function LiveStatus() {
  const { status, email } = siteConfig;
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const colorMap = {
    available: {
      ping: "bg-emerald-400",
      dot: "bg-emerald-500",
      border: "border-emerald-500/30",
      badge: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10",
      text: "text-neutral-700 dark:text-neutral-300",
    },
    busy: {
      ping: "bg-amber-400",
      dot: "bg-amber-500",
      border: "border-amber-500/30",
      badge: "text-amber-700 dark:text-amber-400 bg-amber-500/10",
      text: "text-neutral-700 dark:text-neutral-300",
    },
    focused: {
      ping: "bg-indigo-400",
      dot: "bg-indigo-500",
      border: "border-indigo-500/30",
      badge: "text-indigo-700 dark:text-indigo-400 bg-indigo-500/10",
      text: "text-neutral-700 dark:text-neutral-300",
    },
  };

  const currentColors = colorMap[status.state] || colorMap.available;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {/* Status Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="View live status details"
        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono cursor-pointer transition-all duration-200 hover:border-emerald-500/50 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 select-none outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentColors.ping}`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${currentColors.dot}`}
          />
        </span>
        <span className={currentColors.text}>{status.label}</span>
      </button>

      {/* Floating Hover / Click Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 z-50 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 p-3.5 shadow-xl backdrop-blur-md text-left font-sans select-none"
          >
            {/* Header with live badge */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentColors.ping}`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${currentColors.dot}`}
                  />
                </span>
                <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                  {status.label}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                Live
              </span>
            </div>

            {/* Subtext message */}
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {status.subtext}
            </p>

            {/* Direct contact action */}
            {email && (
              <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
                  Have an opportunity?
                </span>
                <Link
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-neutral-900 dark:text-neutral-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  <Mail className="size-3" />
                  <span>Send email</span>
                  <ArrowUpRight className="size-3 text-neutral-400" />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
