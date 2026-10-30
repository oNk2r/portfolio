"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import collegeLogo from "@/public/clg1.png";

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  minor: string;
  period: string;
  logo: StaticImageData;
  website: string;
}

const EDUCATION: EducationItem[] = [
  {
    institution: "Walchand Institute of Technology",
    location: "Solapur",
    degree: "B.Tech. in Electronics & Computer Engineering",
    minor: "Minor: Information Technology",
    period: "2023 – 2027",
    logo: collegeLogo,
    website: "https://witsolapur.org/",
  },
];

const Education = () => {
  return (
    <section id="education" className="w-full max-w-2xl mx-auto py-5 font-sans scroll-mt-8">
      {/* Section Header */}
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400">
          # Education
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {EDUCATION.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1"
          >
            {/* Left Column: Logo & Details */}
            <div className="flex items-center gap-3.5 min-w-0">
              {/* College Logo (Decreased size, clickable to website, no container) */}
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                title={`${item.institution} website`}
                aria-label={`${item.institution} website`}
                className="relative w-10 sm:w-11 h-14 sm:h-15 shrink-0 flex items-center justify-center hover:opacity-80 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Image
                  src={item.logo}
                  alt={item.institution}
                  width={48}
                  height={64}
                  className="object-contain w-full h-full select-none"
                />
              </a>

              {/* Text Details */}
              <div className="flex flex-col min-w-0 justify-center">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[15px] sm:text-[15.5px] text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug hover:underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-4 transition"
                  >
                    {item.institution}
                  </a>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                    • {item.location}
                  </span>
                </div>

                <p className="text-[13px] sm:text-[13.5px] text-neutral-600 dark:text-neutral-400 mt-0.5">
                  {item.degree}
                </p>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  ({item.minor})
                </p>
              </div>
            </div>

            {/* Right Column: Timeline */}
            <div className="sm:text-right shrink-0 pl-14 sm:pl-0">
              <span className="font-mono text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded-full select-none">
                {item.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
