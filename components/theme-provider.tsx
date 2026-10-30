"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { playClickSound, toggleSoundMuted, playPopSound } from "@/lib/click-sound";

function GlobalShortcutsListener() {
  const { resolvedTheme, setTheme } = useTheme();
  const themeRef = React.useRef(resolvedTheme);

  React.useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }

      const isCtrlOrMeta = event.ctrlKey || event.metaKey;

      // Ctrl + D / Cmd + D: Toggle theme
      if (
        isCtrlOrMeta &&
        !event.altKey &&
        !event.shiftKey &&
        (event.key.toLowerCase() === "d" || event.code === "KeyD")
      ) {
        event.preventDefault();
        const nextTheme = themeRef.current === "dark" ? "light" : "dark";
        playClickSound(nextTheme);
        setTheme(nextTheme);
        return;
      }

      // M key: Toggle audio mute
      if (
        !isCtrlOrMeta &&
        !event.altKey &&
        !event.shiftKey &&
        (event.key.toLowerCase() === "m" || event.code === "KeyM")
      ) {
        const isMuted = toggleSoundMuted();
        if (!isMuted) {
          playPopSound(1.2);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTheme]);

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <GlobalShortcutsListener />
      {children}
    </NextThemesProvider>
  );
}
