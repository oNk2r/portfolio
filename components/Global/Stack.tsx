"use client";

import React from "react";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiSocketdotio,
  SiMongodb,
  SiPostgresql,
  SiSqlite,
  SiDocker,
  SiPostman,
  SiLangchain,
  SiGooglegemini,
  SiGithub,
} from "react-icons/si";
import { Globe, Radio, Bot, DatabaseZap } from "lucide-react";
import { playPopSound } from "@/lib/click-sound";

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Full-stack",
    skills: [
      {
        name: "React",
        icon: <SiReact className="text-[#61DAFB]" size={14} />,
      },
      {
        name: "Node.js",
        icon: <SiNodedotjs className="text-[#5FA04E]" size={14} />,
      },
      {
        name: "Express",
        icon: (
          <SiExpress className="text-neutral-900 dark:text-white" size={14} />
        ),
      },
      {
        name: "FastAPI",
        icon: <SiFastapi className="text-[#009688]" size={14} />,
      },
      {
        name: "REST APIs",
        icon: <Globe className="text-[#38BDF8]" size={14} />,
      },
    ],
  },
  {
    title: "Real-time",
    skills: [
      {
        name: "Socket.io",
        icon: (
          <SiSocketdotio
            className="text-neutral-800 dark:text-neutral-200"
            size={14}
          />
        ),
      },
      {
        name: "Server-Sent Events",
        icon: <Radio className="text-[#F59E0B]" size={14} />,
      },
    ],
  },
  {
    title: "AI engineering",
    skills: [
      {
        name: "Gemini",
        icon: <SiGooglegemini className="text-[#8E75FF]" size={14} />,
      },
      {
        name: "LLM integration",
        icon: <Bot className="text-[#10B981]" size={14} />,
      },
      {
        name: "RAG",
        icon: <DatabaseZap className="text-[#06B6D4]" size={14} />,
      },
      {
        name: "LangChain",
        icon: (
          <SiLangchain
            className="text-neutral-800 dark:text-neutral-200"
            size={14}
          />
        ),
      },
    ],
  },
  {
    title: "Databases",
    skills: [
      {
        name: "MongoDB",
        icon: <SiMongodb className="text-[#47A248]" size={14} />,
      },
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className="text-[#4169E1]" size={14} />,
      },
      {
        name: "SQLite",
        icon: <SiSqlite className="text-[#003B57]" size={14} />,
      },
    ],
  },
  {
    title: "Developer tools",
    skills: [
      {
        name: "GitHub API",
        icon: (
          <SiGithub className="text-neutral-900 dark:text-white" size={14} />
        ),
      },
      {
        name: "Docker",
        icon: <SiDocker className="text-[#2496ED]" size={14} />,
      },
      {
        name: "Postman",
        icon: <SiPostman className="text-[#FF6C37]" size={14} />,
      },
    ],
  },
];

const Stack = () => {
  return (
    <section id="skills" className="w-full max-w-2xl mx-auto py-6 font-sans scroll-mt-8">
      {/* Section Header */}
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400">
          # Skills
        </h2>
      </div>

      {/* Categorized Skills Grid */}
      <div className="flex flex-col gap-3.5">
        {SKILL_CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-neutral-100 dark:border-neutral-900/60 pb-3"
          >
            {/* Category Label */}
            <span className="text-[12.5px] font-mono text-neutral-400 dark:text-neutral-500 mb-1.5 sm:mb-0 sm:w-36 shrink-0 select-none">
              {category.title}
            </span>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-1.5 flex-1 justify-start sm:justify-end">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => playPopSound(1.3)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-all cursor-default select-none group"
                >
                  <span className="shrink-0 transition-transform group-hover:scale-110">
                    {skill.icon}
                  </span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stack;
