"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Terminal, Trophy, Zap, ShieldCheck } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  alpha: number;
}

export default function KonamiCode() {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputSequence = useRef<string[]>([]);

  // Function to trigger the celebration
  const triggerEasterEgg = () => {
    setIsActive(true);
  };

  // Listen for Konami Code key combinations & custom events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing inside an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      inputSequence.current.push(key);

      if (inputSequence.current.length > KONAMI_CODE.length) {
        inputSequence.current.shift();
      }

      const isMatch = KONAMI_CODE.every(
        (codeKey, idx) =>
          inputSequence.current[idx] &&
          inputSequence.current[idx].toLowerCase() === codeKey.toLowerCase()
      );

      if (isMatch) {
        inputSequence.current = [];
        triggerEasterEgg();
      }
    };

    // Custom event listener so Command Palette can trigger it
    const handleCustomTrigger = () => triggerEasterEgg();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("trigger-konami", handleCustomTrigger);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("trigger-konami", handleCustomTrigger);
    };
  }, []);

  // Confetti Canvas Animation
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const colors = ["#61DAFB", "#81b64c", "#5865F2", "#F59E0B", "#EC4899", "#8B5CF6"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate burst of confetti particles
    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 120,
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 1.2) * 14 - 3,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      alpha: 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.38; // gravity
        p.vx *= 0.985; // friction
        p.rotation += p.vRot;
        p.alpha = Math.max(0, p.alpha - 0.007);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      if (particles.some((p) => p.alpha > 0)) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isActive]);

  const closeDialog = () => {
    setIsActive(false);
  };

  return (
    <>
      {/* Fullscreen Canvas for Confetti */}
      {isActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-[60] pointer-events-none"
        />
      )}

      {/* Arcade Dialog */}
      <AnimatePresence>
        {isActive && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDialog}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
              className="relative w-full max-w-md bg-neutral-950 text-white border-2 border-emerald-500/80 rounded-2xl p-6 shadow-2xl shadow-emerald-500/20 overflow-hidden font-mono"
            >
              {/* Retro scanline & glow ambiance */}
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={closeDialog}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* Header Badge */}
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Terminal size={14} />
                <span>CHEAT CODE ACTIVATED [30 LIVES]</span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white flex items-center gap-2">
                <span>God Mode Unlocked</span>
                <Sparkles className="size-5 text-amber-400" />
              </h3>

              <p className="text-xs text-neutral-400 font-sans mt-1.5 leading-relaxed">
                You entered the legendary Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`). Developer perks have been applied to your current session:
              </p>

              {/* Perks Grid */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-900/90 border border-neutral-800/80">
                  <Zap size={14} className="text-amber-400 shrink-0" />
                  <span className="text-neutral-200">+9,999 TypeScript Architecture Prowess</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-900/90 border border-neutral-800/80">
                  <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                  <span className="text-neutral-200">Zero Compiler Warnings in Production</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-900/90 border border-neutral-800/80">
                  <Trophy size={14} className="text-purple-400 shrink-0" />
                  <span className="text-neutral-200">Infinite Coffee & High-Velocity Commits</span>
                </div>
              </div>

              {/* Dismiss Button */}
              <div className="mt-5 flex justify-end">
                <button
                  onClick={closeDialog}
                  className="w-full py-2 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold font-sans text-xs tracking-wide transition shadow-md shadow-emerald-500/25 cursor-pointer"
                >
                  Continue Browsing in God Mode 🚀
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

