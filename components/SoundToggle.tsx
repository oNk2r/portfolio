"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getSoundMuted,
  setSoundMuted,
  subscribeSoundMuted,
  playPopSound,
} from "@/lib/click-sound";

export default function SoundToggle() {
  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMuted(getSoundMuted());
    setMounted(true);
    const unsubscribe = subscribeSoundMuted((isMuted) => {
      setMuted(isMuted);
    });
    return unsubscribe;
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-md flex items-center justify-center text-neutral-400" />
    );
  }

  const handleToggle = () => {
    const next = !muted;
    setSoundMuted(next);
    if (!next) {
      // play a gentle pop when unmuting to confirm audio works
      setTimeout(() => playPopSound(1.2), 30);
    }
  };

  return (
    <TooltipProvider delay={100}>
      <Tooltip>
        <TooltipTrigger
          type="button"
          onClick={handleToggle}
          className="p-1.5 rounded-md text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-all cursor-pointer active:scale-95 flex items-center justify-center outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
          aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
        >
          {muted ? (
            <VolumeX size={16} className="transition-transform duration-200" />
          ) : (
            <Volume2 size={16} className="transition-transform duration-200" />
          )}
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={8}
          className="font-sans text-xs flex items-center gap-1.5 py-1.5 px-3"
        >
          <span>{muted ? "Sound: Off (Muted)" : "Sound: On (Tactile FX)"}</span>
          <kbd
            data-slot="kbd"
            className="px-1 py-1 text-[10px] font-mono rounded bg-background/20 text-background border border-current/20 leading-none"
          >
            M
          </kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

