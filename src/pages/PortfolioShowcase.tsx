import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, CheckCircle, Star, Zap, ShieldCheck, Filter, ArrowRight } from "lucide-react";

const PORTFOLIO_PROJECTS = [
  {
    id: "va-beach-resort",
    title: "Ocean View Luxury Resort & Coastal Booking Stack",
    city: "Virginia Beach, VA",
    category: "Booking & Hospitality",
    image: "/images/va-beach-resort.jpg",
    lighthouse: 100,
    speed: "0.3s",
    metric: "+310% Direct Bookings",
    summary: "High-converting coastal booking application for Virginia Beach oceanfront lodging. Features dark glassmorphism UI, real-time availability calendar, and localized search schema.",
    tech: ["React 19", "Vite 6", "Netlify Edge", "Tailwind CSS 4", "Local Business Schema"],
    clientReview: "Neal transformed our booking experience. We saw a 310% jump in direct bookings within 30 days of launch with zero phone tag.",
  },
  {
    id: "norfolk-maritime",
    title: "PortVue Maritime & Logistics Command Portal",
    city: "Norfolk, VA",
    category: "Custom Web Apps",
    image: "/images/norfolk-maritime.jpg",
    lighthouse: 100,
    speed: "0.2s",
    metric: "Real-Time AIS Vessel Tracking",
    summary: "Enterprise maritime analytics platform for Norfolk shipping logistics. Real-time berth scheduling, terminal efficiency graphs, and edge data routing.",
    tech: ["React 19", "TypeScript", "Netlify Functions", "Tailwind CSS 4", "Mapbox"],
    clientReview: "Ultra-fast enterprise system. Our logistics dispatch team cut inquiry calls by 65% on week one.",
  },
  {
    id: "chesapeake-trades",
    title: "Chesapeake Home Services High-Converting Contracting Stack",
    city: "Chesapeake, VA",
    category: "Local SEO & Trades",
    image: "/images/chesapeake-trades.jpg",
    lighthouse: 99,
    speed: "0.4s",
    metric: "#1 Google Map Pack Rank",
    summary: "Lead acquisition and online scheduling portal for Chesapeake HVAC, roofing, and plumbing contractors. Integrated instant quote estimator and review widgets.",
    tech: ["React 19", "Netlify Forms", "Calendly API", "Google Local Schema"],
    clientReview: "We went from invisible in Greenbrier to ranking #1 on Google for home contractor searches across Chesapeake.",
  },
  {
    id: "aeo-dashboard",
    title: "757 Local Search & AEO AI Syndication Command Center",
    city: "Hampton Roads 757 (All Cities)",
    category: "AI & Search Systems",
    image: "/images/aeo-dashboard.jpg",
    lighthouse: 100,
    speed: "0.2s",
    metric: "100% LLM Indexing Rate",
    summary: "AEO (Answer Engine Optimization) & Local SEO hub powering structured JSON-LD entity graph syndication across Google AI Overviews, ChatGPT, Perplexity, and Claude.",
    tech: ["JSON-LD Graph", "llms.txt Standard", "React 19", "Prerender Static HTML"],
    clientReview: "When local clients ask ChatGPT or Perplexity for the top developer in 757, our business is now cited first every time.",
  },
];

const CATEGORIES = ["All", "Booking & Hospitality", "Custom Web Apps", "Local SEO & Trades", "AI & Search Systems"];

export default function PortfolioShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4285F4]/10 px-3.5 py-1 text-xs font-bold text-[#4285F4]">
          <ShieldCheck className="h-3.5 w-3.5" /> Proven 757 Client Success & Work Showcase
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
          Web Systems & UI Design <span className="bg-gradient-to-r from-[#4285F4] to-[#174ea6] bg-clip-text text-transparent">Portfolio</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#4b5563]">
          Real production web applications engineered for businesses in Virginia Beach, Norfolk, Chesapeake, and across 757 Hampton Roads. Every build achieves 100/100 Lighthouse performance, instant edge loading, and search engine dominance.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4285F4] ${
              selectedCategory === cat
                ? "bg-[#111111] text-white shadow-md"
                : "border border-black/10 bg-white text-[#4b5563] hover:bg-black/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="mt-12 space-y-16">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Image Preview Side */}
              <div className="relative min-h-[320px] bg-slate-900 lg:col-span-7">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="rounded-full bg-black/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                    {project.city}
                  </span>
                  <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                    {project.metric}
                  </span>
                </div>
              </div>

              {/* Info Side */}
              <div className="flex flex-col justify-between p-8 lg:col-span-5 md:p-10">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4285F4]">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <Zap className="h-3.5 w-3.5 fill-current text-amber-500" />
                      Lighthouse: {project.lighthouse}/100
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#111111]">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="mt-6 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]">Tech Architecture</div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <blockquote className="mt-6 rounded-2xl border-l-4 border-[#4285F4] bg-[#4285F4]/5 p-4 text-xs italic text-[#374151]">
                    "{project.clientReview}"
                  </blockquote>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#333333]"
                  >
                    Build Similar Project
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-20 rounded-3xl border border-black/10 bg-gradient-to-br from-white to-[#f4f7fc] p-8 text-center md:p-12 shadow-lg">
        <h2 className="text-3xl font-extrabold text-[#111111]">Want a High-Performance Site Built for Your Business?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#4b5563]">
          Whether you need a new booking funnel, local SEO system, or custom web platform in Virginia Beach, Norfolk, or Chesapeake, get started with a fast 3-day launch sprint.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            to="/calculator"
            className="rounded-full bg-[#4285F4] px-6 py-3 text-xs font-bold text-white transition-all hover:bg-[#2563eb]"
          >
            Instant Cost Estimator
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-black/15 bg-white px-6 py-3 text-xs font-bold text-[#111111] transition-all hover:bg-black/5"
          >
            Contact Neal Frazier Directly
          </Link>
        </div>
      </div>
    </div>
  );
}
