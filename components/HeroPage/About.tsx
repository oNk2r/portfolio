"use client";

import Link from "next/link";
import siteConfig from "@/config/site";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { SiDiscord, SiChessdotcom } from "react-icons/si";

const About = () => {
  return (
    <section className="w-full max-w-2xl mx-auto mt-5 text-neutral-600 dark:text-neutral-400 font-sans">
      {/* Site Headline */}
      <p className="text-[15px] sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
        {siteConfig.headline}
      </p>

      {/* Interactive Connect Badges */}
      <div className="mt-3.5 pt-3 flex items-center gap-2.5 flex-wrap text-xs sm:text-[13px] border-t border-neutral-200/60 dark:border-neutral-800/60">
        <span className="text-neutral-400 dark:text-neutral-500 font-mono text-[11px] uppercase tracking-wider select-none mr-0.5">
          Connect:
        </span>

        <Link
          href={siteConfig.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium transition group"
        >
          <FaGithub className="size-3.5 text-neutral-700 dark:text-neutral-300" />
          <span>GitHub</span>
          <ArrowUpRight className="size-3 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>

        <Link
          href={siteConfig.socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium transition group"
        >
          <FaXTwitter className="size-3.5 text-neutral-700 dark:text-neutral-300" />
          <span>X</span>
          <ArrowUpRight className="size-3 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>

        {siteConfig.socials.linkedin && (
          <Link
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium transition group"
          >
            <FaLinkedin className="size-3.5 text-neutral-700 dark:text-neutral-300" />
            <span>LinkedIn</span>
            <ArrowUpRight className="size-3 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        )}

        {siteConfig.socials.discord && (
          <Link
            href={siteConfig.socials.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium transition group"
          >
            <SiDiscord className="size-3.5 text-[#5865F2]" />
            <span>Discord</span>
            <ArrowUpRight className="size-3 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        )}

        {siteConfig.socials.chess && (
          <Link
            href={siteConfig.socials.chess}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium transition group"
          >
            <SiChessdotcom className="size-3.5 text-[#81b64c]" />
            <span>Chess</span>
            <ArrowUpRight className="size-3 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        )}

        {siteConfig.email && (
          <Link
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium transition group"
          >
            <Mail className="size-3.5 text-neutral-700 dark:text-neutral-300" />
            <span>Email</span>
            <ArrowUpRight className="size-3 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </section>
  );
};

export default About;
