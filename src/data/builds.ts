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
  {
    id: "757tech",
    name: "757Tech Hub",
    url: "https://757tech.pro",
    kind: "Product",
    tagline: "The core landing page and lead engine for Hampton Roads IT solutions",
    description:
      "A high-converting tech services portal for the 757 area code, connecting local businesses with web optimization, edge deployments, and automation systems.",
    stack: ["React", "Netlify", "Local SEO"],
    stats: [
      { value: "757", label: "region focus" },
      { value: "100%", label: "Lighthouse" },
      { value: "Edge", label: "Netlify hosting" },
    ],
    accent: "#d946ef",
    icon: Rocket,
    previewEyebrow: "IT AGENCY SERVICES",
  },
  {
    id: "nullai",
    name: "NullAI Research",
    url: "https://nullai.tech",
    kind: "Product",
    tagline: "Autonomous agent playground and LLM orchestration research",
    description:
      "An experimental hub demonstrating agentic workflow automation. Implements serverless APIs and custom markdown generation pipelines to test next-generation Answer Engine Optimization (AEO).",
    stack: ["TypeScript", "AI Agents", "Netlify Edge"],
    stats: [
      { value: "LLM", label: "orchestration" },
      { value: "API", label: "endpoints" },
      { value: "AEO", label: "optimized" },
    ],
    accent: "#3b82f6",
    icon: Rocket,
    previewEyebrow: "AI WORKSPACE LAB",
  },
  {
    id: "valetninjas",
    name: "ValetNinjas App",
    url: "https://www.valetninjas.website",
    kind: "Product",
    tagline: "Real-time booking and dispatch system for parking services",
    description:
      "A full-featured client capture and scheduling portal built on a serverless Netlify stack. Custom workflows handle real-time ticket statuses and instant customer notification flows.",
    stack: ["React", "Serverless Functions", "State Logs"],
    stats: [
      { value: "<3s", label: "load time" },
      { value: "100%", label: "mobile test" },
      { value: "JSON", label: "data pipe" },
    ],
    accent: "#ea4335",
    icon: LayoutGrid,
    previewEyebrow: "BOOKING ENGINE",
  },
  {
    id: "surestaffingva",
    name: "SureStaffing VA",
    url: "https://www.surestaffingva.com",
    kind: "Product",
    tagline: "Composable recruitment portal for local service companies",
    description:
      "A custom web board designed to handle rapid job board routing and applicant intake. Optimized for local SEO tags targeting Hampton Roads, Norfolk, and Virginia Beach search terms.",
    stack: ["Vite", "JSON Metadata", "SEO Tags"],
    stats: [
      { value: "757", label: "SEO targeted" },
      { value: "0ms", label: "hydration" },
      { value: "SPA", label: "router" },
    ],
    accent: "#f59e0b",
    icon: BookOpen,
    previewEyebrow: "LOCAL HIRING PLATFORM",
  },
  {
    id: "migratex",
    name: "MigrateX",
    url: "https://migratex.757tech.pro",
    kind: "Tool",
    tagline: "Automated codebase converter for shifting Legacy setups to Jamstack",
    description:
      "A developer compiler tool designed to translate static assets and server files into clean, composable templates deployed at the edge.",
    stack: ["Vite", "Compiler Script", "Node.js"],
    stats: [
      { value: "Vite", label: "targets" },
      { value: "98%", label: "automation" },
      { value: "Edge", label: "ready" },
    ],
    accent: "#f43f5e",
    icon: Rocket,
    previewEyebrow: "MIGRATION COMPILER",
  },
  {
    id: "nona-ai",
    name: "Nona AI",
    url: "https://nona.757tech.pro",
    kind: "Lab",
    tagline: "Serverless voice agent prototype routing client inquiries to LLMs",
    description:
      "An experimental voice synthesis platform demonstrating fast local audio transcript pipelines integrated into standard business phone interfaces.",
    stack: ["Web Audio", "Serverless API", "Fast-whisper"],
    stats: [
      { value: "<200ms", label: "latency" },
      { value: "Voice", label: "synthesis" },
      { value: "JSON", label: "logs stream" },
    ],
    accent: "#34a853",
    icon: LayoutGrid,
    previewEyebrow: "VOICE AGENT LAB",
  },
  {
    id: "justicewatch",
    name: "Justice Watch",
    url: "https://justicewatch.nealfrazier.tech",
    kind: "Product",
    tagline: "Transparency dashboard and open data system tracking public court logs",
    description:
      "A structured public logs viewer built to parse, structure, and display regional records, demonstrating local utility and rapid data caching capabilities.",
    stack: ["React", "Cron Parser", "JSON db"],
    stats: [
      { value: "10k+", label: "logs processed" },
      { value: "Hourly", label: "cron update" },
      { value: "100%", label: "open source" },
    ],
    accent: "#6366f1",
    icon: BookOpen,
    previewEyebrow: "OPEN DATA LOGS",
  },
  {
    id: "ai-mastery",
    name: "AI Mastery in 30 Days",
    url: "https://ai-mastery.nealfrazier.tech",
    kind: "Workshop",
    tagline: "Public educational portal tracking daily LLM integration and scripts",
    description:
      "A curated syllabus platform documenting custom prompt injections, system logs, and automation setups for local technical learners in Hampton Roads.",
    stack: ["Markdown", "Static Pages", "Syllabus Hub"],
    stats: [
      { value: "30", label: "day tasks" },
      { value: "24", label: "playbooks" },
      { value: "Free", label: "open learning" },
    ],
    accent: "#ec4899",
    icon: GraduationCap,
    previewEyebrow: "LEARNING SPRINT",
  },
  {
    id: "netlify-hall-of-fame",
    name: "Netlify Hall of Fame",
    url: "https://netlifylove.nealfrazier.tech",
    kind: "Tool",
    tagline: "A tribute index documenting the best composable developer tools",
    description:
      "A catalog page showing off the best serverless edge functions, databases, and media tools that speed up modern static frontends.",
    stack: ["React", "Netlify SDK", "Developer APIs"],
    stats: [
      { value: "18", label: "tools curated" },
      { value: "JSON", label: "schema format" },
      { value: "Edge", label: "deployed" },
    ],
    accent: "#3b82f6",
    icon: LayoutGrid,
    previewEyebrow: "DEV TOOL TRIBUTE",
  },
  {
    id: "envguard-pro",
    name: "EnvGuard Pro",
    url: "https://envguard-pro.757tech.pro",
    kind: "Tool",
    tagline: "Static dashboard auditing local environment safety and leaks",
    description:
      "A developer utility tool auditing API key placement and verifying environment security constraints, protecting apps from credential leakage.",
    stack: ["TypeScript", "Parser", "Local Vault"],
    stats: [
      { value: "Safe", label: "vault logic" },
      { value: "0", label: "network leaks" },
      { value: "CLI", label: "helper check" },
    ],
    accent: "#10b981",
    icon: Rocket,
    previewEyebrow: "SECURITY COMPILER",
  },
  {
    id: "unstuck-mentor",
    name: "Unstuck Mentor",
    url: "https://unstuck-mentor.netlify.app",
    kind: "Lab",
    tagline: "An interactive mentorship marketplace application",
    description:
      "A marketplace prototype demonstrating real-time mentor filters, schedule booking calendars, and profile catalog listings on a lightweight client UI.",
    stack: ["React", "LocalStorage Sync", "Mock Payments"],
    stats: [
      { value: "12", label: "mentors" },
      { value: "Static", label: "mock core" },
      { value: "<1s", label: "render load" },
    ],
    accent: "#a21caf",
    icon: GraduationCap,
    previewEyebrow: "MARKETPLACE LAB",
  },
  {
    id: "tidepoint-strategic",
    name: "Tidepoint Strategic",
    url: "https://tidepoint.757tech.pro",
    kind: "Product",
    tagline: "Business operations dashboard mapping client funnels and lead analytics",
    description:
      "A premium enterprise analytics prototype showing lead attribution, customer value calculations, and regional marketing conversion performance.",
    stack: ["Vite", "Tailwind CSS", "Chart Logs"],
    stats: [
      { value: "Charts", label: "svg rendering" },
      { value: "KPI", label: "attribution" },
      { value: "100%", label: "responsive" },
    ],
    accent: "#0ea5e9",
    icon: LayoutGrid,
    previewEyebrow: "OPERATIONS PORTAL",
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
