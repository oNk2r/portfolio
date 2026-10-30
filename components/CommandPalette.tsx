"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import {
  Search,
  Home,
  FolderGit2,
  Briefcase,
  Code2,
  GraduationCap,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Download,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import siteConfig from "@/config/site";
import {
  getSoundMuted,
  setSoundMuted,
  playClickSound,
  playPopSound,
  playChimeSound,
} from "@/lib/click-sound";

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  category: "Navigation" | "Actions" | "Social" | "Fun";
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  // Close palette helper
  const closePalette = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            playPopSound(1.1);
          }
          return !prev;
        });
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closePalette]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAction(label);
    playPopSound(1.3);
    setTimeout(() => setCopiedAction(null), 2000);
  };

  const isDark = resolvedTheme === "dark";

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: "Home",
      description: "Return to the main overview",
      category: "Navigation",
      icon: <Home size={16} />,
      action: () => {
        router.push("/");
        closePalette();
      },
    },
    {
      id: "nav-projects",
      title: "Projects",
      description: "Jump to featured projects showcase",
      category: "Navigation",
      icon: <FolderGit2 size={16} />,
      action: () => {
        window.location.hash = "projects";
        closePalette();
      },
    },
    {
      id: "proj-chattr",
      title: "Project: Chattr",
      description: "Real-time WebSocket messaging platform",
      category: "Navigation",
      icon: <FolderGit2 size={16} />,
      action: () => {
        window.open("https://github.com/oNk2r/Chattr", "_blank");
        closePalette();
      },
    },
    {
      id: "proj-devwrap",
      title: "Project: devwrap",
      description: "Developer year-in-review & GitHub stats wrap",
      category: "Navigation",
      icon: <FolderGit2 size={16} />,
      action: () => {
        window.open("https://github.com/oNk2r/devwrap", "_blank");
        closePalette();
      },
    },
    {
      id: "nav-skills",
      title: "Skills & Tech Stack",
      description: "Jump to Full-Stack, Real-time & AI skills",
      category: "Navigation",
      icon: <Code2 size={16} />,
      action: () => {
        window.location.hash = "skills";
        closePalette();
      },
    },
    {
      id: "nav-education",
      title: "Education",
      description: "Walchand Institute of Technology (B.Tech)",
      category: "Navigation",
      icon: <GraduationCap size={16} />,
      action: () => {
        window.location.hash = "education";
        closePalette();
      },
    },

    // Actions
    {
      id: "act-theme",
      title: `Switch to ${isDark ? "Light" : "Dark"} Mode`,
      description: "Toggle aesthetic between light and dark",
      category: "Actions",
      icon: isDark ? <Sun size={16} /> : <Moon size={16} />,
      shortcut: "Ctrl+D",
      action: () => {
        const nextTheme = isDark ? "light" : "dark";
        playClickSound(nextTheme);
        setTheme(nextTheme);
        closePalette();
      },
    },
    {
      id: "act-sound",
      title: getSoundMuted() ? "Unmute Sound FX" : "Mute Sound FX",
      description: "Toggle zero-latency synthesized tactile audio",
      category: "Actions",
      icon: getSoundMuted() ? <VolumeX size={16} /> : <Volume2 size={16} />,
      action: () => {
        const next = !getSoundMuted();
        setSoundMuted(next);
        if (!next) playPopSound(1.2);
        closePalette();
      },
    },
    {
      id: "act-copy-email",
      title: copiedAction === "email" ? "Copied Email!" : "Copy Email",
      description: siteConfig.email,
      category: "Actions",
      icon: copiedAction === "email" ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />,
      action: () => copyToClipboard(siteConfig.email, "email"),
    },
    {
      id: "act-copy-url",
      title: copiedAction === "url" ? "Copied URL!" : "Copy Portfolio Link",
      description: siteConfig.url,
      category: "Actions",
      icon: copiedAction === "url" ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />,
      action: () => copyToClipboard(siteConfig.url, "url"),
    },
    {
      id: "act-resume",
      title: "Download Resume",
      description: "Get full CV and experience overview (PDF)",
      category: "Actions",
      icon: <Download size={16} />,
      action: () => {
        if (siteConfig.resumeUrl) {
          window.open(siteConfig.resumeUrl, "_blank");
        }
        closePalette();
      },
    },

    // Social Links
    {
      id: "soc-github",
      title: "GitHub Profile",
      description: siteConfig.socials.github,
      category: "Social",
      icon: <FaGithub size={15} />,
      action: () => {
        window.open(siteConfig.socials.github, "_blank");
        closePalette();
      },
    },
    {
      id: "soc-twitter",
      title: "X / Twitter",
      description: siteConfig.handle,
      category: "Social",
      icon: <FaTwitter size={15} />,
      action: () => {
        window.open(siteConfig.socials.twitter, "_blank");
        closePalette();
      },
    },
    {
      id: "soc-linkedin",
      title: "LinkedIn",
      description: "Connect professionally",
      category: "Social",
      icon: <FaLinkedin size={15} />,
      action: () => {
        window.open(siteConfig.socials.linkedin, "_blank");
        closePalette();
      },
    },

    // Fun & Easter Eggs
    {
      id: "fun-chime",
      title: "Play Harmonic Chime",
      description: "Synthesize an airy 4-voice arpeggio",
      category: "Fun",
      icon: <Sparkles size={16} className="text-amber-500" />,
      action: () => {
        playChimeSound();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      cmd.description?.toLowerCase().includes(q)
    );
  });

  // Handle arrow keys
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
      playPopSound(0.9);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
      playPopSound(0.9);
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Trigger pill button (renders inside navbar) */}
      <button
        onClick={() => {
          playPopSound(1.1);
          setIsOpen(true);
        }}
        className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100/80 dark:bg-neutral-900/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-800 rounded-md transition-colors cursor-pointer"
        aria-label="Open Command Palette"
      >
        <Search size={13} />
        <span>Search</span>
        <kbd className="px-1 text-[10px] font-mono bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-xs">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePalette}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]"
            >
              {/* Search Bar */}
              <div className="flex items-center px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 gap-3">
                <Search size={18} className="text-neutral-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command, page, or action..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyNavigation}
                  className="w-full bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
                />
                <kbd
                  onClick={closePalette}
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  ESC
                </kbd>
              </div>

              {/* Command List */}
              <div
                ref={listRef}
                className="overflow-y-auto py-2 px-2 divide-y divide-neutral-100 dark:divide-neutral-900"
              >
                {filteredCommands.length === 0 ? (
                  <div className="py-8 text-center text-sm text-neutral-500">
                    No matching commands found.
                  </div>
                ) : (
                  filteredCommands.map((cmd, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        onClick={() => cmd.action()}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-colors ${
                          isSelected
                            ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`p-1.5 rounded-lg shrink-0 ${
                              isSelected
                                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs"
                                : "text-neutral-400"
                            }`}
                          >
                            {cmd.icon}
                          </span>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium truncate">
                              {cmd.title}
                            </span>
                            {cmd.description && (
                              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">
                                {cmd.description}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {cmd.shortcut && (
                            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-neutral-200 dark:border-neutral-700">
                              {cmd.shortcut}
                            </kbd>
                          )}
                          <span className="text-[10px] text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded px-1.5 py-0.5 uppercase tracking-wider font-mono">
                            {cmd.category}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer Guide */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 text-[11px] text-neutral-400 font-mono">
                <div className="flex items-center gap-3">
                  <span>
                    <kbd className="font-bold">↑↓</kbd> Navigate
                  </span>
                  <span>
                    <kbd className="font-bold">↵</kbd> Select
                  </span>
                </div>
                <span>
                  <kbd className="font-bold">ESC</kbd> Close
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
