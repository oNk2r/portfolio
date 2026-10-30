
export interface SiteConfig {
  name: string;
  handle: string;
  role: string;
  bioSnippet: string;
  headline: string;
  aboutDetails: {
    intro: string;
    interests: string;
  };
  location: string;
  timezone: string;
  timezoneLabel: string;
  status: {
    state: "available" | "busy" | "focused";
    label: string;
    subtext: string;
  };
  email: string;
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    telegram?: string;
    discord?: string;
    chess?: string;
  };
  githubUsername: string;
  calCom?: {
    namespace: string;
    enabled: boolean;
  };
  quote: {
    text: string;
    author: string;
  };
  url: string;
  ogImage: string;
  resumeUrl?: string;
}

export const siteConfig: SiteConfig = {
  name: "Onkar Tulshigar",
  handle: "@oNk2r",
  role: "Full-Stack Engineer",
  bioSnippet: "21 • Full-Stack Engineer",

  headline: "Building for the web. Curious about everything.",

  aboutDetails: {
    intro:
      "Full-stack engineer and Electronics & Computer Engineering student at Walchand Institute of Technology.",
    interests:
      "Crafting fast real-time applications, developer tools, and scalable web architectures with React, Next.js, Node.js, and TypeScript.",
  },

  // Location & Timezone  
  location: "India",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",

  // Availability
  status: {
    state: "available",
    label: "Available for opportunities",
    subtext: "Open to internships, collaborations & interesting projects.",
  },

  // Contact & Socials
  email: "onkartulshigar10@gmail.com",
  socials: {
    github: "https://github.com/oNk2r",
    twitter: "https://x.com/oNk2r",
    linkedin: "https://www.linkedin.com/in/onkar-tulshigar",
    telegram: "https://t.me/oNk2r",
    discord: "https://discord.com/users/oskarr.exe",
    chess: "https://www.chess.com/member/onk2rx",
  },

  // GitHub Activity
  githubUsername: "oNk2r",


  // Inspirational Quote
  quote: {
    text: "I am Jack's complete lack of surprise.",
    author: "Jack (Fight Club 1999)",
  },

  // SEO & OpenGraph
  url: "https://onk2r.vercel.app",
  ogImage: "/og-image.png",
  resumeUrl: "/resume.pdf",
};

export default siteConfig;
