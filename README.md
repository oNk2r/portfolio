# Portfolio

A modern, minimalist developer portfolio built with Next.js, TypeScript, Tailwind CSS, and Motion.

## Features

- **3D Tilt Avatar:** Interactive perspective tilt on mouse movement with spring physics and dynamic glare.
- **Command Palette (`Cmd + K`):** Spotlight modal for quick navigation, theme toggling, and actions.
- **Audio Micro-interactions:** Synthesized tactile sound effects powered by the Web Audio API with a global mute toggle (`M` key).
- **Projects Showcase:** Responsive project cards with ambient gradient meshes, dot matrix patterns, and browser mockups.
- **Live Status Indicator:** Real-time availability badge with an interactive popover.
- **Dynamic Theming:** Dark and light mode support with keyboard shortcut (`Ctrl + D`).
- **Typography:** Configured with Plus Jakarta Sans and JetBrains Mono.

## Configuration

Site metadata, navigation, projects, and contact details are centralized in a single configuration file:

`config/site.ts`

```typescript
export const siteConfig = {
  name: "Your Name",
  handle: "@handle",
  role: "Full-Stack Engineer",
  bioSnippet: "Developer",
  headline: "Building for the web.",
  location: "Location",
  timezone: "UTC",
  timezoneLabel: "UTC",
  status: {
    state: "available",
    label: "Available for opportunities",
    subtext: "Open to new projects and roles.",
  },
  email: "you@example.com",
  socials: {
    github: "https://github.com/username",
    twitter: "https://x.com/username",
    linkedin: "https://linkedin.com/in/username",
  },
  githubUsername: "username",
};
```

## Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Cmd + K` / `Ctrl + K` | Open Command Palette |
| `Ctrl + D` / `Cmd + D` | Toggle Dark / Light Theme |
| `M` | Toggle Sound Effects (Mute / Unmute) |
| `ESC` | Close Modals & Popovers |

## Tech Stack

- **Framework:** Next.js (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **Animation:** Motion
- **Icons:** Lucide React, React Icons
- **Typography:** Next.js Font (Plus Jakarta Sans, JetBrains Mono)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Acknowledgments

Inspired by developer portfolios across the web.
