"use client";

import Image, { StaticImageData } from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, Link01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import React from "react";

interface StackProp {
  icon: React.ReactNode;
  label: string;
}

interface ProjectCardProps {
  name: string;
  type: string;
  slug: string;
  description: string;
  isActive: boolean;
  projectImage: StaticImageData;
  stack: StackProp[];
  link: string;
}

const PROJECT_THEMES: Record<
  string,
  {
    bgGradient: string;
    glow1: string;
    glow2: string;
    dotGrid: string;
    badgeStyle: string;
    cardBorder: string;
  }
> = {
  chattr: {
    bgGradient:
      "bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-indigo-500/15 dark:from-sky-950/40 dark:via-blue-950/30 dark:to-indigo-950/40",
    glow1: "bg-sky-400/25 dark:bg-sky-500/20",
    glow2: "bg-indigo-500/25 dark:bg-indigo-500/20",
    dotGrid:
      "bg-[radial-gradient(#38bdf8_1px,transparent_1px)] dark:bg-[radial-gradient(#0284c7_1px,transparent_1px)]",
    badgeStyle:
      "text-sky-700 dark:text-sky-300 bg-sky-50/80 dark:bg-sky-950/60 border-sky-200/80 dark:border-sky-800/60",
    cardBorder:
      "border-neutral-200/80 dark:border-neutral-800 group-hover:border-sky-500/40 dark:group-hover:border-sky-500/30",
  },
  devwrap: {
    bgGradient:
      "bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-emerald-500/15 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-emerald-950/40",
    glow1: "bg-emerald-400/25 dark:bg-emerald-500/20",
    glow2: "bg-teal-500/25 dark:bg-teal-500/20",
    dotGrid:
      "bg-[radial-gradient(#10b981_1px,transparent_1px)] dark:bg-[radial-gradient(#059669_1px,transparent_1px)]",
    badgeStyle:
      "text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-200/80 dark:border-emerald-800/60",
    cardBorder:
      "border-neutral-200/80 dark:border-neutral-800 group-hover:border-emerald-500/40 dark:group-hover:border-emerald-500/30",
  },
};

const DEFAULT_THEME = {
  bgGradient:
    "bg-gradient-to-br from-neutral-500/10 via-neutral-600/5 to-neutral-700/10 dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-950/60",
  glow1: "bg-neutral-400/20 dark:bg-neutral-600/20",
  glow2: "bg-neutral-500/20 dark:bg-neutral-700/20",
  dotGrid:
    "bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#475569_1px,transparent_1px)]",
  badgeStyle:
    "text-neutral-700 dark:text-neutral-300 bg-white/80 dark:bg-neutral-900/80 border-neutral-200/80 dark:border-neutral-800",
  cardBorder:
    "border-neutral-200/80 dark:border-neutral-800 group-hover:border-neutral-400/40 dark:group-hover:border-neutral-600/40",
};

const ProjectCard = ({
  name,
  type,
  slug,
  description,
  isActive,
  projectImage,
  stack,
  link,
}: ProjectCardProps) => {
  const active = isActive;
  const theme = PROJECT_THEMES[slug.toLowerCase()] || DEFAULT_THEME;
  const projectUrl = link || `/projects/${slug}`;

  return (
    <div className="w-full justify-between flex flex-col items-start group bg-transparent cursor-pointer transition-all duration-300">
      {/* Thumbnail with Modern Ambient Backdrop & App Mockup */}
      <Link
        href={projectUrl}
        target={link ? "_blank" : undefined}
        rel={link ? "noopener noreferrer" : undefined}
        className="w-full block"
      >
        <div
          className={`relative h-44 sm:h-48 w-full rounded-2xl border overflow-hidden transition-all duration-500 shadow-xs group-hover:shadow-lg ${theme.bgGradient} ${theme.cardBorder}`}
        >
          {/* High-tech dot matrix pattern */}
          <div
            className={`absolute inset-0 [background-size:16px_16px] opacity-35 group-hover:opacity-55 transition-opacity duration-500 pointer-events-none ${theme.dotGrid}`}
          />

          {/* Dual ambient spotlight glow orbs */}
          <div
            className={`absolute -top-12 -left-12 w-48 h-48 rounded-full ${theme.glow1} blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700`}
          />
          <div
            className={`absolute -bottom-12 -right-12 w-48 h-48 rounded-full ${theme.glow2} blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700`}
          />

          {/* Floating Category/Type Pill */}
          <div
            className={`absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border text-[11px] font-mono font-medium shadow-xs select-none transition ${theme.badgeStyle}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {type}
          </div>

          {/* Modern Browser / App Window Mockup */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[86%] sm:w-[84%] transition-all duration-500 ease-out translate-y-7 sm:translate-y-8 group-hover:translate-y-3 sm:group-hover:translate-y-4 group-hover:scale-[1.02]">
            <div className="rounded-t-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-t border-x border-neutral-300/80 dark:border-neutral-700/80 shadow-2xl shadow-neutral-950/20 dark:shadow-black/70">
              {/* Window Chrome Header Bar */}
              <div className="h-5 bg-neutral-200/90 dark:bg-neutral-800/95 px-2.5 flex items-center justify-between border-b border-neutral-300/70 dark:border-neutral-700/70 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 dark:bg-red-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500/80" />
                </div>
                <div className="w-20 sm:w-28 h-1.5 rounded-full bg-neutral-300/80 dark:bg-neutral-700/80" />
                <div className="w-3" />
              </div>

              {/* Screenshot Window */}
              <div className="relative aspect-[16/9] w-full bg-neutral-900 overflow-hidden">
                <Image
                  loading="lazy"
                  src={projectImage}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="px-1 pt-3.5 pb-3 w-full">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <Link
              href={projectUrl}
              target={link ? "_blank" : undefined}
              rel={link ? "noopener noreferrer" : undefined}
              className="text-base sm:text-[17px] relative items-center flex gap-1.5 font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white transition"
            >
              {name}
              <span className="h-0.5 left-0 bottom-0 w-0 transition-all duration-300 group-hover:w-full absolute bg-neutral-900 dark:bg-neutral-100" />
            </Link>
            {isActive && link ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={link}
                aria-label={`Open ${name} repository`}
                className="text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition"
              >
                <HugeiconsIcon icon={Link01Icon} size={15} />
              </a>
            ) : null}
          </div>
          <span
            className={`text-[11px] font-mono flex items-center gap-1.5 px-2 py-0.5 rounded-full ${
              isActive
                ? "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                : "text-orange-500 dark:text-orange-400 bg-orange-500/10 border border-orange-500/20"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isActive ? "bg-emerald-500 animate-pulse" : "bg-orange-400"
              }`}
            />
            {active ? "Live" : "Building.."}
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-1 py-1 w-full mt-auto">
        {/* Stack Avatars */}
        <div className="flex items-center">
          {stack.length > 3 ? (
            <>
              {stack.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  title={item.label}
                  className="w-6 h-6 rounded-full border-2 border-white dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] shadow-xs"
                  style={{ marginLeft: i === 0 ? 0 : -6 }}
                >
                  {item.icon}
                </div>
              ))}
              <div
                className="w-6 h-6 rounded-full border-2 border-white dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[9px] font-mono font-medium text-neutral-600 dark:text-neutral-400 shadow-xs"
                style={{ marginLeft: -6 }}
              >
                +{stack.length - 4}
              </div>
            </>
          ) : (
            stack.map((item, i) => (
              <div
                key={i}
                title={item.label}
                className="w-6 h-6 rounded-full border-2 border-white dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] shadow-xs"
                style={{ marginLeft: i === 0 ? 0 : -6 }}
              >
                {item.icon}
              </div>
            ))
          )}
        </div>

        {/* Action Link */}
        <Link
          href={projectUrl}
          target={link ? "_blank" : undefined}
          rel={link ? "noopener noreferrer" : undefined}
          className="flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition group/btn"
        >
          <span>View Project</span>
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            size={14}
            className="transform transition-transform duration-200 group-hover/btn:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
