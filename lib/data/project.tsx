import { projectImages } from "@/lib/assets/project";
import { StaticImageData } from "next/image";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiMongodb,
  SiTailwindcss,
  SiGithub,
} from "react-icons/si";
import { Globe } from "lucide-react";

interface ProjectCardProps {
  id: number;
  name: string;
  slug: string;
  type: string;
  description: string;
  isActive: boolean;
  projectImage: StaticImageData;
  link: string;
  video?: any;
  longDescription?: string;
  github?: string;
  stack: StackProp[];
  users?: string;
}

interface StackProp {
  icon: React.ReactNode;
  label: string;
}

export const Project: ProjectCardProps[] = [
  {
    id: 1,
    name: "Chattr",
    slug: "chattr",
    type: "Real-Time Chat",
    description:
      "A fast, responsive real-time messaging platform featuring instant communication, room management, and WebSocket streaming.",
    isActive: true,
    projectImage: projectImages.chattr,
    stack: [
      { icon: <SiReact size={17} color="#61DAFB" />, label: "React" },
      { icon: <SiNodedotjs size={17} color="#5FA04E" />, label: "Node.js" },
      {
        icon: (
          <SiExpress size={17} className="text-neutral-900 dark:text-white" />
        ),
        label: "Express",
      },
      {
        icon: (
          <SiSocketdotio
            size={17}
            className="text-neutral-800 dark:text-neutral-200"
          />
        ),
        label: "Socket.io",
      },
      { icon: <SiMongodb size={17} color="#47A248" />, label: "MongoDB" },
    ],
    github: "https://github.com/oNk2r/Chattr",
    link: "https://github.com/oNk2r/Chattr",
  },
  {
    id: 2,
    name: "devwrap",
    slug: "devwrap",
    type: "Developer Tool",
    description:
      "Personalized developer activity summary and insights engine, transforming repository milestones and commit velocity into a shareable wrap.",
    isActive: true,
    projectImage: projectImages.devwrap,
    stack: [
      { icon: <SiReact size={17} color="#61DAFB" />, label: "React" },
      { icon: <SiNodedotjs size={17} color="#5FA04E" />, label: "Node.js" },
      {
        icon: (
          <SiGithub size={17} className="text-neutral-900 dark:text-white" />
        ),
        label: "GitHub API",
      },
      { icon: <SiTailwindcss size={17} color="#06B6D4" />, label: "Tailwind" },
      { icon: <Globe size={17} className="text-[#38BDF8]" />, label: "REST API" },
    ],
    github: "https://github.com/oNk2r/devwrap",
    link: "https://github.com/oNk2r/devwrap",
  },
];
