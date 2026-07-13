import type { LucideIcon } from "lucide-react";
import {
  Rocket,
  BookOpen,
  GraduationCap,
  Coffee,
  LayoutGrid,
} from "lucide-react";

export type BuildKind =
  | "Tool"
  | "Challenge"
  | "Product"
  | "Lab"
  | "Workshop"
  | "Tracker";

export interface BuildStat {
  value: string;
  label: string;
}

export interface Build {
  id: string;
  name: string;
  url: string;
  kind: BuildKind;
  tagline: string;
  description: string;
  stack: string[];
  stats: BuildStat[];
  accent: string;
  /** lucide icon key resolved below */
  icon: LucideIcon;
  /** short label shown on the branded preview panel */
  previewEyebrow: string;
}

export const BUILDS: Build[] = [
  {
    id: "hot-app-summer-wisdom",
    name: "Hot App Summer Wisdom Library",
    url: "https://hotappsummer-wisdom.netlify.app",
    kind: "Challenge",
    tagline: "233 apps from the challenge, indexed into an agent-ready Wisdom API",
    description:
      "Captures every app shipped during Hot App Summer — 233 ideas you can browse, sort, and search. The Wisdom API tells your AI agent exactly what to reuse and what not to rebuild, so you build something fresh instead of another gallery. Self-heals every 8 hours.",
    stack: ["Wisdom API", "Netlify", "Agent Reference"],
    stats: [
      { value: "233", label: "apps indexed" },
      { value: "8h", label: "self-heal cycle" },
      { value: "API", label: "agent-ready" },
    ],
    accent: "#a3e635",
    icon: Rocket,
    previewEyebrow: "Wisdom Library",
  },
  {
    id: "creatorplaybooks",
    name: "CreatorPlaybooks",
    url: "https://creatorplaybooks.netlify.app",
    kind: "Product",
    tagline: "Growth playbooks from the creators who ship",
    description:
      "Co-created with @buildwithmaya: 34 verified creator playbooks reverse-engineered from real X posts, an interactive 3D mentor directory, a swipe file, and an agent-ready JSON API you can drop straight into Cursor or n8n.",
    stack: ["React", "3D Mentor Map", "Agent API"],
    stats: [
      { value: "34", label: "creators" },
      { value: "60+", label: "growth plays" },
      { value: "1", label: "agent API" },
    ],
    accent: "#d946ef",
    icon: BookOpen,
    previewEyebrow: "Creator Growth System",
  },
  {
    id: "creatorplaybooks-mentor-lab",
    name: "CreatorPlaybooks Virtual Mentor Lab",
    url: "https://creatorplaybooks-mentor-lab.netlify.app",
    kind: "Lab",
    tagline: "Six virtual mentors turned into a daily execution engine",
    description:
      "Proof-of-work spin-off: six verified mentor playbooks become standalone pages with SEO, prompt templates, and a one-click 'daily X execution plan' operator. A live streak lab with Day 1-7 recaps and on-page feedback loops.",
    stack: ["Static Pages", "Prompt Templates", "Streak Lab"],
    stats: [
      { value: "6", label: "verified mentors" },
      { value: "6", label: "playbooks" },
      { value: "7", label: "day recaps" },
    ],
    accent: "#ec4899",
    icon: GraduationCap,
    previewEyebrow: "Virtual Mentor Lab",
  },
  {
    id: "ai-and-coffee",
    name: "AI & Coffee",
    url: "https://aiandcoffee.757tech.pro",
    kind: "Workshop",
    tagline: "Small-business AI workshop by Tech Pro (hosted by Neal)",
    description:
      "A 60-minute, no-code neighborhood class at Lynnhaven Coffee Co. where 757 contractors, realtors, and solo trades build a texting AI helper that answers FAQs and books jobs. Live demo, $99 to reserve a seat, 50+ locals already helped.",
    stack: ["AI Assistant", "No-code", "Local Workshop"],
    stats: [
      { value: "$99", label: "per seat" },
      { value: "60", label: "min session" },
      { value: "50+", label: "people helped" },
    ],
    accent: "#6366f1",
    icon: Coffee,
    previewEyebrow: "Tech Pro Workshop",
  },
  {
    id: "100-websites-season-2",
    name: "100 Websites in 30 Days — Season 2",
    url: "https://100websitesin30days.nealfrazier.tech",
    kind: "Tracker",
    tagline: "Live tracker for the public 100-website build sprint",
    description:
      "Season 2 of the public build sprint. A live tracker with 125+ shipped projects, journey / gallery / social views, and a developer API gateway (curl → markdown) so anyone can pull the project list into their own tooling.",
    stack: ["Netlify", "Live Tracker", "API Gateway"],
    stats: [
      { value: "125", label: "projects listed" },
      { value: "S2", label: "summer season" },
      { value: "API", label: "markdown feed" },
    ],
    accent: "#34a853",
    icon: LayoutGrid,
    previewEyebrow: "Build Sprint Tracker",
  },
];

export const BUILD_KINDS: ("All" | BuildKind)[] = [
  "All",
  "Tool",
  "Challenge",
  "Product",
  "Lab",
  "Workshop",
  "Tracker",
];
