"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun02Icon, Moon02Icon } from "@hugeicons/core-free-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { playClickSound } from "@/lib/click-sound";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-md flex items-center justify-center text-neutral-400" />
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    const nextTheme = isDark ? "light" : "dark";
    playClickSound(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <TooltipProvider delay={100}>
      <Tooltip>
        <TooltipTrigger
          type="button"
          onClick={handleToggle}
          className="p-1.5 rounded-md text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-all cursor-pointer active:scale-95 flex items-center justify-center outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
          aria-label={isDark ? "Switch to light theme (Ctrl+D)" : "Switch to dark theme (Ctrl+D)"}
        >
          <HugeiconsIcon
            icon={isDark ? Sun02Icon : Moon02Icon}
            size={16}
            className="transition-transform duration-200"
          />
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8} className="font-sans text-xs flex items-center gap-1.5 py-1.5 px-3">
          <span>{isDark ? "Light mode" : "Dark mode"}</span>
          <kbd
            data-slot="kbd"
            className="px-1 py-1 text-[10px] font-mono rounded bg-background/20 text-background border border-current/20 leading-none"
          >
            Ctrl+D
          </kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
