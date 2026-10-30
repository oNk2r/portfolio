"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import SoundToggle from "./SoundToggle";
import CommandPalette from "./CommandPalette";

const NAVBAR = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
  ];

  return (
    <header className="w-full text-xs sm:text-[14px] font-sans mx-auto flex items-center mt-6 sm:mt-8 justify-between max-w-2xl">
      {/* Left: Command Palette trigger */}
      <div className="shrink-0">
        <CommandPalette />
      </div>

      {/* Right: Navigation Links & Controls */}
      <nav aria-label="Main Navigation" className="flex items-center gap-2 sm:gap-4">
        {navItems.map(({ href, label }) => {
          const isActive = href === "/" ? pathname === "/" : false;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className="group inline-flex flex-col items-center"
            >
              <span
                className="text-neutral-500 dark:text-neutral-400 relative transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {label}
              </span>
            </Link>
          );
        })}

        <div className="flex items-center gap-1 pl-1 border-l border-neutral-200 dark:border-neutral-800">
          <SoundToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default NAVBAR;
