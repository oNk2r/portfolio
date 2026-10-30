"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UnfoldMoreIcon,
  Cancel01Icon,
  PaintBoardIcon,
} from "@hugeicons/core-free-icons";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiTypescript,
  SiSocketdotio,
  SiFigma,
  SiPostgresql,
  SiReact,
} from "react-icons/si";

export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  isCurrent?: boolean;
  bullets: string[];
  skills: {
    name: string;
    icon: React.ReactNode;
  }[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "helxstudio",
    year: "2026",
    role: "Full Stack Developer [Freelance]",
    company: "freelance",
    companyUrl: "https://helxstudio.in/",
    period: "Aug '26 – Present",
    isCurrent: false,
    bullets: [
      "Built a real-time bidding platform handling 500+ daily active users",
      "Architected an e-commerce platform for client, reducing time-to-market by 30%",
      "Crafted 10+ high-converting landing pages for clients across the globe",
    ],
    skills: [
      {
        name: "Next.js",
        icon: (
          <RiNextjsFill
            size={18}
            className="text-neutral-900 dark:text-white"
          />
        ),
      },
      {
        name: "TypeScript",
        icon: <SiTypescript size={17} color="#3178C6" />,
      },
      {
        name: "Socket.io",
        icon: (
          <SiSocketdotio
            size={17}
            className="text-neutral-800 dark:text-neutral-200"
          />
        ),
      },
      {
        name: "UI/UX Design",
        icon: (
          <HugeiconsIcon
            icon={PaintBoardIcon}
            size={17}
            className="text-pink-500"
          />
        ),
      },
      {
        name: "Figma",
        icon: <SiFigma size={17} color="#F24E1E" />,
      },
      {
        name: "PostgreSQL",
        icon: <SiPostgresql size={17} color="#4169E1" />,
      },
    ],
  },
  {
    id: "softech",
    year: "2026",
    role: "Frontend Intern Developer",
    company: "Softech Solutions",
    companyUrl: "https://soft-techsolutions.com/",
    period: "Apr '26 – June '26",
    isCurrent: false,
    bullets: [
      "Enhanced UI/UX of internal CMS system, improving workflow usability and visual consistency.",
      "Led full migration of legacy PHP website to Next.js, boosting overall performance by 10%.",
      "Developed and maintained bank CMS platform utilizing PostgreSQL for robust and secure data management.",
    ],
    skills: [
      {
        name: "Next.js",
        icon: (
          <RiNextjsFill
            size={18}
            className="text-neutral-900 dark:text-white"
          />
        ),
      },
      {
        name: "TypeScript",
        icon: <SiTypescript size={17} color="#3178C6" />,
      },
      {
        name: "React",
        icon: <SiReact size={17} color="#61DAFB" />,
      },
      {
        name: "UI/UX Design",
        icon: (
          <HugeiconsIcon
            icon={PaintBoardIcon}
            size={17}
            className="text-pink-500"
          />
        ),
      },
      {
        name: "Figma",
        icon: <SiFigma size={17} color="#F24E1E" />,
      },
      {
        name: "PostgreSQL",
        icon: <SiPostgresql size={17} color="#4169E1" />,
      },
    ],
  },
];

interface SkillsTooltipRowProps {
  skills: {
    name: string;
    icon: React.ReactNode;
  }[];
}

const SkillsTooltipRow: React.FC<SkillsTooltipRowProps> = ({ skills }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tooltipX, setTooltipX] = useState<number>(0);
  const [isFresh, setIsFresh] = useState(true);
  const isInsideRef = useRef(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (index: number) => {
    const itemEl = itemRefs.current[index];
    const containerEl = containerRef.current;
    if (itemEl && containerEl) {
      const itemRect = itemEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      setTooltipX(itemRect.left - containerRect.left + itemRect.width / 2);
    }
  };

  const handleMouseEnter = (index: number) => {
    updatePosition(index);
    setIsFresh(!isInsideRef.current);
    isInsideRef.current = true;
    setHoveredIdx(index);
  };

  const handleMouseLeaveGroup = () => {
    isInsideRef.current = false;
    setHoveredIdx(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-1 select-none"
      onMouseLeave={handleMouseLeaveGroup}
    >
      {/* Gliding Shared Tooltip: positioned above icons via bottom-full without needing artificial pt */}
      <motion.div
        initial={false}
        animate={
          hoveredIdx !== null
            ? {
                opacity: 1,
                scale: 1,
                y: 0,
                x: tooltipX,
              }
            : {
                opacity: 0,
                scale: 0.94,
                y: 4,
                x: tooltipX,
              }
        }
        transition={
          isFresh
            ? {
                opacity: { duration: 0.15, ease: "easeOut" },
                scale: { type: "spring", stiffness: 450, damping: 25 },
                y: { type: "spring", stiffness: 450, damping: 25 },
                x: { duration: 0 },
              }
            : {
                opacity: { duration: 0 },
                scale: { duration: 0 },
                y: { duration: 0 },
                x: { type: "spring", stiffness: 450, damping: 32 },
              }
        }
        className="absolute bottom-full left-0 mb-1.5 pointer-events-none z-30"
      >
        <div className="-translate-x-1/2 flex flex-col items-center">
          <div className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm whitespace-nowrap">
            {hoveredIdx !== null ? skills[hoveredIdx]?.name : ""}
          </div>
          <div className="w-1.5 h-1.5 rotate-45 bg-neutral-900 dark:bg-neutral-100 -mt-0.5" />
        </div>
      </motion.div>

      {/* Tech Stack Icons */}
      {skills.map((skill, idx) => (
        <div
          key={skill.name}
          ref={(el) => {
            itemRefs.current[idx] = el;
          }}
          onMouseEnter={() => handleMouseEnter(idx)}
          onFocus={() => handleMouseEnter(idx)}
          onBlur={handleMouseLeaveGroup}
          onClick={(e) => e.stopPropagation()}
          tabIndex={0}
          role="img"
          aria-label={skill.name}
          className="p-1.5 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60 transition-all duration-150 cursor-pointer flex items-center justify-center hover:scale-115 active:scale-95 outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
        >
          {React.isValidElement(skill.icon) ? (
            skill.icon
          ) : (
            <HugeiconsIcon icon={skill.icon as any} size={17} />
          )}
        </div>
      ))}
    </div>
  );
};

const Experience = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const groupedExperiences = React.useMemo(() => {
    const groups: { year: string; items: ExperienceItem[] }[] = [];
    EXPERIENCES.forEach((item) => {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup.year === item.year) {
        lastGroup.items.push(item);
      } else {
        groups.push({ year: item.year, items: [item] });
      }
    });
    return groups;
  }, []);

  return (
    <section id="experience" className="w-full max-w-2xl mx-auto py-6 font-sans">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 mb-2">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <h2 className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400">
            # Experience
          </h2>
          <div className="flex-1 h-[0.5px] bg-neutral-200/90 dark:bg-neutral-800" />
        </div>
      </div>

      {/* Experience List Grouped by Year */}
      <div className="flex flex-col gap-4">
        {groupedExperiences.map((group) => (
          <div key={group.year} className="flex items-start">
            {/* Year Label - displayed once per year */}
            <div className="w-20 sm:w-28 text-[13px] text-neutral-400 dark:text-neutral-500 pt-2 shrink-0 select-none font-medium">
              {group.year}
            </div>

            {/* Jobs in this Year */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              {group.items.map((item) => {
                const isExpanded = expandedId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`min-w-0 rounded-2xl border transition-all duration-300 ease-out ${
                      isExpanded
                        ? "border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/60 px-4 py-3 shadow-xs"
                        : "border-transparent hover:bg-neutral-50/70 dark:hover:bg-neutral-900/60 p-2 cursor-pointer"
                    }`}
                    onClick={
                      !isExpanded ? () => toggleExpand(item.id) : undefined
                    }
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center flex-wrap gap-x-1.5 text-[13.5px] sm:text-[14px]">
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                          {item.role}
                        </span>
                        {item.company !== "freelance" && (
                          <span className="text-neutral-400 dark:text-neutral-500 font-normal">
                            at
                          </span>
                        )}
                        {item.companyUrl && isExpanded
                          ? item.company !== "freelance" && (
                              <a
                                href={item.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="font-medium text-neutral-900 dark:text-neutral-100 hover:underline decoration-neutral-400 underline-offset-2"
                              >
                                {item.company}
                              </a>
                            )
                          : item.company !== "freelance" && (
                              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                {item.company}
                              </span>
                            )}
                      </div>

                      {/* Right Meta & Toggle Button */}
                      <div className="flex items-center gap-2 text-[12.5px] text-neutral-400 dark:text-neutral-500 shrink-0 ml-2">
                        {item.isCurrent && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                            aria-label="Current role"
                          />
                        )}
                        <span className="tabular-nums font-normal">
                          {item.period}
                        </span>

                        {/* Toggle Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(item.id);
                          }}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-neutral-200/80 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors ml-1"
                          title={isExpanded ? "Collapse" : "Expand"}
                          aria-label={
                            isExpanded ? "Collapse details" : "Expand details"
                          }
                        >
                          <HugeiconsIcon
                            icon={isExpanded ? Cancel01Icon : UnfoldMoreIcon}
                            size={15}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Smooth Expandable Body using CSS Grid Animation */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100 mt-3.5"
                          : "grid-rows-[0fr] opacity-0 pointer-events-none mt-0"
                      }`}
                    >
                      <div className="overflow-hidden min-h-0">
                        {/* Small Bullet Points */}
                        <ul className="space-y-1.5 mb-4 list-none p-0 m-0">
                          {item.bullets.map((bullet, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-[12px] sm:text-[12.5px] leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal"
                            >
                              <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 mt-2 shrink-0 select-none" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Skills Icons with Gliding Hover Tooltip */}
                        <SkillsTooltipRow skills={item.skills} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
