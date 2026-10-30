"use client";

import siteConfig from "@/config/site";

interface FooterProps {
  cn?: string;
}

const Footer = ({ cn = "" }: FooterProps) => {
  return (
    <footer
      className={`max-w-2xl w-full mx-auto py-8 flex flex-col items-center justify-center text-center gap-1 font-mono text-xs text-neutral-500 dark:text-neutral-400 select-none ${cn}`}
    >
      <p>
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </p>
      <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
        Built with tokens & bugs 
      </p>
    </footer>
  );
};

export default Footer;
