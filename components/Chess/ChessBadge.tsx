"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SiChessdotcom } from "react-icons/si";
import { ArrowUpRight, Swords, Trophy, Zap, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import siteConfig from "@/config/site";

interface RatingStat {
  last?: { rating: number; date: number };
  best?: { rating: number; date: number };
  record?: { win: number; loss: number; draw: number };
}

interface ChessStatsData {
  chess_rapid?: RatingStat;
  chess_blitz?: RatingStat;
  chess_bullet?: RatingStat;
  tactics?: { highest?: { rating: number } };
}

export default function ChessBadge() {
  const username = siteConfig.chessUsername || "onk2rx";
  const chessUrl = siteConfig.socials.chess || `https://www.chess.com/member/${username}`;

  const [stats, setStats] = useState<ChessStatsData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;
    const cacheKey = `chess_stats_${username}`;

    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setStats(JSON.parse(cached));
        setLoading(false);
        return;
      }
    } catch {}

    fetch(`https://api.chess.com/pub/player/${username}/stats`)
      .then((res) => {
        if (!res.ok) throw new Error("Stats not found");
        return res.json();
      })
      .then((data: ChessStatsData) => {
        if (isMounted) {
          setStats(data);
          setLoading(false);
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify(data));
          } catch {}
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [username]);

  // Handle outside clicks
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  const rapidRating = stats?.chess_rapid?.last?.rating;
  const blitzRating = stats?.chess_blitz?.last?.rating;
  const bulletRating = stats?.chess_bullet?.last?.rating;
  const primaryRating = rapidRating || blitzRating || bulletRating;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {/* Badge Button */}
      <div className="inline-flex items-center">
        <Link
          href={chessUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium text-xs sm:text-[13px] transition group select-none"
        >
          <SiChessdotcom className="size-3.5 text-[#81b64c] shrink-0" />
          <span>Chess</span>

          {/* Dynamic Live Rating Pill if available */}
          {primaryRating && (
            <span className="font-mono text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded bg-[#81b64c]/15 text-[#81b64c] font-semibold border border-[#81b64c]/20">
              {primaryRating}
            </span>
          )}

          <ArrowUpRight className="size-3 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Interactive Popover Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 z-50 w-72 p-3.5 rounded-xl bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-black/10 text-neutral-900 dark:text-neutral-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100 dark:border-neutral-900">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#81b64c]/10 text-[#81b64c]">
                  <SiChessdotcom size={16} />
                </div>
                <div>
                  <p className="font-semibold text-xs leading-none">@{username}</p>
                  <p className="text-[10.5px] text-neutral-400 font-mono mt-0.5">Chess.com Player</p>
                </div>
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                Live Stats
              </span>
            </div>

            {/* Ratings Grid */}
            <div className="grid grid-cols-3 gap-1.5 py-2.5">
              {/* Rapid */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-900">
                <div className="flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400 mb-0.5">
                  <Clock size={11} className="text-amber-500" />
                  <span>Rapid</span>
                </div>
                <span className="font-mono text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {rapidRating || "—"}
                </span>
                {stats?.chess_rapid?.best?.rating && (
                  <span className="text-[9px] text-neutral-400 font-mono">
                    Peak {stats.chess_rapid.best.rating}
                  </span>
                )}
              </div>

              {/* Blitz */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-900">
                <div className="flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400 mb-0.5">
                  <Zap size={11} className="text-amber-400" />
                  <span>Blitz</span>
                </div>
                <span className="font-mono text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {blitzRating || "—"}
                </span>
                {stats?.chess_blitz?.best?.rating && (
                  <span className="text-[9px] text-neutral-400 font-mono">
                    Peak {stats.chess_blitz.best.rating}
                  </span>
                )}
              </div>

              {/* Bullet / Tactics */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-900">
                <div className="flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400 mb-0.5">
                  <Trophy size={11} className="text-emerald-500" />
                  <span>Puzzles</span>
                </div>
                <span className="font-mono text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {stats?.tactics?.highest?.rating || bulletRating || "—"}
                </span>
                <span className="text-[9px] text-neutral-400 font-mono">Rating</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex gap-2">
              <Link
                href={`https://www.chess.com/play/online/new?opponent=${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-[#81b64c] hover:bg-[#72a342] text-white text-xs font-semibold shadow-xs transition"
              >
                <Swords size={12} />
                <span>Challenge Match</span>
              </Link>

              <Link
                href={chessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-300 transition"
                title="View Full Profile"
              >
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

