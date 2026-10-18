import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ExternalLink, MapPin, Zap, Calendar, Shield, Rocket } from "lucide-react";

import data from "@/data.json";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Highlighter } from "@/components/magicui/highlighter";
import { MagicCard } from "@/components/magicui/magic-card";
import { Marquee } from "@/components/magicui/marquee";
import { MorphingText } from "@/components/magicui/morphing-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { TextAnimate } from "@/components/magicui/text-animate";

function StatValue({ raw }: { raw: string }) {
  const isCurrency = raw.startsWith("$");
  const numeric = parseInt(raw.replace(/\D/g, ""), 10);

  return (
    <span className="inline-flex items-baseline text-[#111111]">
      {isCurrency ? "$" : ""}
      <NumberTicker value={numeric} className="text-[#111111]" />
      {!isCurrency && raw.includes("+") ? "+" : ""}
    </span>
  );
}

const liveBuilds = [
  { name: "Zoth Studio v2", url: "https://zoth.nullai.tech", kind: "AI IDE", accent: "#d97706", desc: "Local-first multi-agent studio & 44-tool enclave" },
  { name: "ZothOS Linux v3.2", url: "https://zothos.nullai.tech", kind: "Linux OS", accent: "#10b981", desc: "Sovereign AI-native KDE Plasma 6.3 Wayland OS" },
  { name: "NullAI Research", url: "https://nullai.tech", kind: "AI Labs", accent: "#3b82f6", desc: "Autonomous AI agent orchestrators & local models" },
  { name: "44-Tool Sovereign Hub", url: "https://1nc0gn30.github.io", kind: "Storefront", accent: "#ea4335", desc: "44 browser-native SEO, AEO, Security & Dev tools" },
  { name: "AEO Graph Engine", url: "https://aeo-graph-engine.netlify.app", kind: "AEO Tool", accent: "#8b5cf6", desc: "Schema.org @graph & FAQPage JSON-LD synthesizer" },
  { name: "CWV Speed Studio", url: "https://cwv-speed-studio.netlify.app", kind: "Perf Tool", accent: "#06b6d4", desc: "Core Web Vitals LCP/CLS/INP optimization studio" },
  { name: "City Desk 1,000-Page", url: "https://city-desk.netlify.app", kind: "SEO Engine", accent: "#f59e0b", desc: "Deterministic 50-city x 20-trade site generator" },
  { name: "Robots.txt Auditor", url: "https://robots-txt-auditor.netlify.app", kind: "AI Security", accent: "#ec4899", desc: "GPTBot, ClaudeBot & PerplexityBot directive linter" },
  { name: "757Tech Hub", url: "https://757tech.pro", kind: "AI Agency", accent: "#d946ef", desc: "Local IT & AI agency platforms" },
  { name: "Season 2 Tracker", url: "https://100websitesin30days.nealfrazier.tech", kind: "Sprints", accent: "#34a853", desc: "100 Websites Shipping Challenge" },
  { name: "ValetNinjas App", url: "https://www.valetninjas.website", kind: "Booking", accent: "#ea4335", desc: "Real-time dispatch & capture funnels" },
  { name: "Wings of Wellness", url: "https://www.wowmhllc.com", kind: "Client App", accent: "#a3e635", desc: "Local healthcare portal" },
  { name: "SureStaffing VA", url: "https://www.surestaffingva.com", kind: "Portal", accent: "#f59e0b", desc: "Hampton Roads hiring portal" },
  { name: "MigrateX", url: "https://migratex.757tech.pro", kind: "Tool", accent: "#f43f5e", desc: "Legacy to Jamstack codebase converter" },
  { name: "Nona AI", url: "https://nona.757tech.pro", kind: "Lab", accent: "#10b981", desc: "Serverless LLM voice agent prototype" },
  { name: "Justice Watch", url: "https://justicewatch.nealfrazier.tech", kind: "Product", accent: "#6366f1", desc: "Open data public court log tracker" },
  { name: "EnvGuard Pro", url: "https://envguard-secrets.netlify.app", kind: "Security", accent: "#10b981", desc: "Client-side .env & API key leak scanner" },
  { name: "CreatorPlaybooks", url: "https://creatorplaybooks.netlify.app", kind: "Product", accent: "#a21caf", desc: "Agent-ready growth library" }
];

export default function Dashboard() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div>
      <section className="relative overflow-hidden px-6 pb-18 pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <BlurFade inView delay={0.05}>
            <div className="editorial-kicker mb-8 inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#4285f4]/10 px-4 py-1.5 font-medium text-[#1f4db3]">
              <MapPin className="h-3.5 w-3.5" />
              #1 Ranked AI Systems Architect, Full-Stack Web Developer &amp; AEO/SEO Engineer
            </div>
          </BlurFade>

          <TextAnimate
            as="h1"
            by="word"
            animation="blurInUp"
            className="text-uplift mb-4 text-4xl leading-[1.06] font-bold tracking-tight text-[#111111] sm:text-5xl md:text-6xl"
          >
            Neal Frazier Tech &amp; NullAI Platform
          </TextAnimate>

          <BlurFade inView delay={0.1}>
            <MorphingText
              texts={["Findable.", "Bookable.", "Autonomous.", "Unstoppable."]}
              className="mb-6 h-12 text-3xl md:h-16 md:text-5xl"
            />
          </BlurFade>

          <BlurFade inView delay={0.14}>
            <p className="text-uplift mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#374151] md:text-xl">
              I engineer 100/100 Core Web Vitals web platforms, Schema.org AEO knowledge graphs, 24/7 AI receptionists, and autonomous multi-agent systems (Creator of <strong>Zoth Studio</strong>, <strong>ZothOS Linux</strong> &amp; <strong>44 Sovereign Pro Tools</strong>) in <strong>Virginia Beach, Norfolk, Chesapeake (757)</strong> and nationwide — built to <Highlighter color="rgba(52,168,83,0.28)">dominate search &amp; book revenue</Highlighter>.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.18} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="https://buy.stripe.com/eVqbJ05k1gWA3HacgEfw40V" target="_blank" rel="noopener noreferrer">
              <ShimmerButton className="font-medium" shimmerColor="#ea4335">
                Start Custom Build ($99 Deposit)
                <ArrowRight className="h-4 w-4" />
              </ShimmerButton>
            </a>
            <Link
              to="/offerings"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition-colors hover:bg-black/6"
            >
              View All Packages &amp; Tools
            </Link>
            <a
              href="https://1nc0gn30.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-[#111111] transition-colors hover:bg-black/6"
            >
              44-Tool Storefront <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </BlurFade>

          <BlurFade inView delay={0.22}>
            <a
              href="https://join.netlify.com/d8a2zdtel9gy-w6zrwt"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#4285F4]/20 bg-[#4285F4]/5 px-4 py-2 text-xs font-medium text-[#4285F4] transition-colors hover:bg-[#4285F4]/10"
            >
              <Shield className="h-3.5 w-3.5" /> Netlify Partner — 100+ Sites Shipped with 100/100 Core Web Vitals
              <Rocket className="h-3.5 w-3.5" />
            </a>
          </BlurFade>
        </div>
      </section>

      <section className="border-y border-black/10 bg-black/[0.02] py-4">
        <Marquee pauseOnHover className="[--duration:30s]">
          {[...data.homepage.tech_marquee].map((tech, i) => (
            <span
              key={`tech-${i}`}
              className="mx-3 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-medium tracking-widest text-[#374151] uppercase"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: ["#4285f4", "#ea4335", "#fbbc05", "#34a853"][i % 4],
                }}
              />
              {tech}
            </span>
          ))}
        </Marquee>
      </section>

      {/* INSTANT-CHECKOUT SOVEREIGN CUSTOM BUILDS & PRO BUNDLE */}
      <section className="border-b border-black/10 bg-gradient-to-b from-slate-950 to-slate-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Zap className="h-3.5 w-3.5" /> Instant Turnkey Engineering • Code FOUNDER25 Saves 25%
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Launch Your Custom Website, AI Receptionist, or Agent Swarm Today
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Zero monthly retainers. 100% source code ownership. Pay via Stripe (Card, Apple Pay, Cash App) or Solana Wallet (<code className="text-amber-300">GG2eQbVh8ut1BK6j1A2tz7pSySdLpD38BgyEhGcxdXoK</code>).
              </p>
            </div>
            <a
              href="https://1nc0gn30.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20"
            >
              Explore All 44 Live Tools <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col justify-between rounded-2xl border border-amber-400/40 bg-slate-900/90 p-6 shadow-xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300">Risk-Free Kickoff</span>
                  <span className="text-2xl font-black text-white">$99 <span className="text-xs font-normal text-slate-400">deposit</span></span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">Custom Website or AI Agent — $99 Kickoff Deposit</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Start any custom 5-page website or AI agent build for $99 down. Approve your live working preview within 48 hours before paying the balance.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <a href="https://buy.stripe.com/eVqbJ05k1gWA3HacgEfw40V" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400">
                  Lock In $99 Kickoff Deposit <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href="https://1nc0gn30.github.io/solutions/custom-build-deposit-99.html" target="_blank" rel="noopener noreferrer" className="text-center text-xs text-slate-400 hover:text-white">
                  Read Full Deposit Guarantee →
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-white/15 bg-slate-900/90 p-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">24h Delivery</span>
                  <span className="text-2xl font-black text-white">$149 <span className="text-xs font-normal text-slate-400">one-time</span></span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">Done-For-You 1-Page Custom Website + Local SEO</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Custom 1-page high-speed site with your brand, 60-second instant quote calculator, Schema.org LocalBusiness JSON-LD &amp; domain setup.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <a href="https://buy.stripe.com/9B6fZg7s96hWa5ya8wfw40O" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400">
                  Order 1-Page Launch ($149) <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href="https://city-desk.netlify.app" target="_blank" rel="noopener noreferrer" className="text-center text-xs text-slate-400 hover:text-white">
                  Test Live City Desk Previews →
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-sky-400/30 bg-slate-900/90 p-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-bold text-sky-300">48h Delivery</span>
                  <span className="text-2xl font-black text-white">$299 <span className="text-xs font-normal text-slate-400">one-time</span></span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">24/7 Custom AI Receptionist &amp; Instant Quote Bot</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Trained on your services &amp; pricing. Answers customer questions 24/7, calculates instant quotes, and texts hot leads directly to your phone.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <a href="https://buy.stripe.com/00w8wO6o50XC2D60xWfw40S" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-sky-400">
                  Order 24/7 AI Receptionist ($299) <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href="https://1nc0gn30.github.io/solutions/ai-receptionist-299.html" target="_blank" rel="noopener noreferrer" className="text-center text-xs text-slate-400 hover:text-white">
                  View AI Receptionist Specs →
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-purple-400/30 bg-slate-900/90 p-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300">72h Turnkey</span>
                  <span className="text-2xl font-black text-white">$499 <span className="text-xs font-normal text-slate-400">one-time</span></span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">Turnkey 5-Page Website + AI Search Dominance</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Complete 5-page custom website (Home, Services, Quote Calculator, Reviews, Contact) + full Schema.org AI graph + 24/7 AI Receptionist included.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <a href="https://buy.stripe.com/3cIcN48wdbCgelOeoMfw40T" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-400">
                  Order 5-Page Turnkey Build ($499) <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href="https://1nc0gn30.github.io/solutions/custom-5page-launch-499.html" target="_blank" rel="noopener noreferrer" className="text-center text-xs text-slate-400 hover:text-white">
                  View 5-Page Package Specs →
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-rose-400/30 bg-slate-900/90 p-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-300">5-Day Sprint</span>
                  <span className="text-2xl font-black text-white">$997 <span className="text-xs font-normal text-slate-400">flat rate</span></span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">Custom AI Agent Swarm, MCP Server or SaaS MVP</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Bespoke multi-agent workflow, custom Claude/Cursor/Antigravity MCP server, or full-stack web application with 100% source code handoff.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <a href="https://buy.stripe.com/14A28qdQxdKo7XqfsQfw40U" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-400">
                  Order Custom AI Build ($997) <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href="https://1nc0gn30.github.io/solutions/custom-ai-swarm-997.html" target="_blank" rel="noopener noreferrer" className="text-center text-xs text-slate-400 hover:text-white">
                  View AI Swarm &amp; MCP Specs →
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-white/15 bg-slate-900/90 p-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300">All 44 Pro Tools</span>
                  <span className="text-2xl font-black text-white">$49 <span className="text-xs font-normal text-slate-400">lifetime</span></span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">All-Access Sovereign Pro Bundle (44 Tools)</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Lifetime Pro license to all 44 browser-native SEO, AEO, Core Web Vitals, Cybersecurity, AI Agent Governance &amp; E-Commerce tools.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <a href="https://buy.stripe.com/eVq14m5k16hW4Le0xWfw40M" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-400">
                  Unlock All 44 Pro Tools ($49) <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href="https://zoth.nullai.tech" target="_blank" rel="noopener noreferrer" className="text-center text-xs text-slate-400 hover:text-white">
                  Launch Zoth Studio Workstation →
                </a>
              </div>
            </div>
          </div>

          {/* Machine-Readable AI Agent & Answer Engine Web API Bar */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  🤖 Zero-Auth AI Agent, Answer Engine (AEO) &amp; MCP Web APIs (CORS * Enabled)
                </div>
                <p className="mt-1 text-xs text-slate-300">
                  Built for instant ingestion by ChatGPT Search, Perplexity, Claude, Gemini, Google SGE, and autonomous AI agents:
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 bg-slate-900 px-3 py-1.5 text-emerald-300 hover:border-emerald-400">/llms.txt</a>
                <a href="/llms-full.txt" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 bg-slate-900 px-3 py-1.5 text-emerald-300 hover:border-emerald-400">/llms-full.txt</a>
                <a href="/api/index.json" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 bg-slate-900 px-3 py-1.5 text-sky-300 hover:border-sky-400">/api/index.json</a>
                <a href="/api/services.json" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 bg-slate-900 px-3 py-1.5 text-sky-300 hover:border-sky-400">/api/services.json</a>
                <a href="/api/tools.json" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 bg-slate-900 px-3 py-1.5 text-sky-300 hover:border-sky-400">/api/tools.json</a>
                <a href="/api/faq.json" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 bg-slate-900 px-3 py-1.5 text-amber-300 hover:border-amber-400">/api/faq.json</a>
                <a href="/api/graph.json" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 bg-slate-900 px-3 py-1.5 text-purple-300 hover:border-purple-400">/api/graph.json</a>
                <a href="/.well-known/agent.json" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 bg-slate-900 px-3 py-1.5 text-rose-300 hover:border-rose-400">/.well-known/agent.json</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <BlurFade inView>
          <MagicCard className="mx-auto max-w-4xl p-8 md:p-12">
            <p className="editorial-kicker mb-4 text-[#6b7280]">Proof of Work</p>
            <h2 className="text-uplift mb-4 text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
              <Highlighter color="rgba(66,133,244,0.26)">{data.homepage.proof_banner.headline}</Highlighter>
            </h2>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#4b5563]">
              {data.homepage.proof_banner.description}
            </p>

            <div className="mb-8 grid grid-cols-3 gap-6">
              {data.homepage.proof_banner.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold md:text-4xl">
                    <StatValue raw={stat.value} />
                  </div>
                  <div className="mt-1 text-sm text-[#6b7280]">{stat.label}</div>
                </div>
              ))}
            </div>

            <a
              href={data.homepage.proof_banner.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-medium text-[#111111] transition-colors hover:bg-black/6"
            >
              View the Project
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </MagicCard>
        </BlurFade>
      </section>

      {/* NEW 757 VISUAL UI DESIGN & PORTFOLIO SHOWCASE */}
      <section className="border-t border-black/10 bg-slate-900 px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#4285F4]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#60a5fa]">
                <MapPin className="h-3.5 w-3.5" /> 757 Hampton Roads Regional Hub
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Web Systems Built for <span className="text-[#60a5fa]">Virginia Beach, Norfolk, Chesapeake</span> & All 757 Cities
              </h2>
              <p className="mt-3 max-w-2xl text-base text-slate-300">
                Live visual preview of custom web applications engineered for local businesses. Every build features sub-second edge loading, 100/100 Lighthouse performance, and built-in AI search engine (AEO) syndication.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/locations"
                className="inline-flex items-center gap-2 rounded-full bg-[#4285F4] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#2563eb]"
              >
                All 757 Cities Hub
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                Full Portfolio
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-800 transition-all hover:border-[#60a5fa]/50">
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src="/images/va-beach-resort.jpg"
                  alt="Virginia Beach Oceanfront Resort Booking Website UI"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  Virginia Beach, VA
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-[#60a5fa]">Ocean View Resort Booking Stack</h3>
                <p className="mt-2 text-xs text-slate-300">Dark glassmorphic booking interface with interactive room availability, sunset hero design, and local schema.</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-semibold text-emerald-400">Lighthouse: 100/100</span>
                  <Link to="/portfolio" className="text-xs font-bold text-[#60a5fa] hover:underline">Explore Build →</Link>
                </div>
              </div>
            </div>

            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-800 transition-all hover:border-[#60a5fa]/50">
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src="/images/norfolk-maritime.jpg"
                  alt="Norfolk Maritime & Logistics Web Portal UI"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  Norfolk, VA
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-[#60a5fa]">PortVue Maritime Command Portal</h3>
                <p className="mt-2 text-xs text-slate-300">Real-time AIS vessel tracking, logistics throughput analytics, and enterprise Netlify edge function routing.</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-semibold text-emerald-400">Lighthouse: 100/100</span>
                  <Link to="/portfolio" className="text-xs font-bold text-[#60a5fa] hover:underline">Explore Build →</Link>
                </div>
              </div>
            </div>

            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-800 transition-all hover:border-[#60a5fa]/50">
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src="/images/chesapeake-trades.jpg"
                  alt="Chesapeake Local Service Contractors Website UI"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  Chesapeake, VA
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-[#60a5fa]">Chesapeake Home Services High-Converting Stack</h3>
                <p className="mt-2 text-xs text-slate-300">Instant quote selector, 5-star customer review widgets, and #1 Google Map Pack local search optimization.</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-semibold text-emerald-400">Lighthouse: 99/100</span>
                  <Link to="/portfolio" className="text-xs font-bold text-[#60a5fa] hover:underline">Explore Build →</Link>
                </div>
              </div>
            </div>

            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-800 transition-all hover:border-[#60a5fa]/50">
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src="/images/aeo-dashboard.jpg"
                  alt="757 AEO and Local SEO Analytics Dashboard UI"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  757 AEO & Local Search
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-[#60a5fa]">757 AI Search & Local SEO Syndication Hub</h3>
                <p className="mt-2 text-xs text-slate-300">Structured JSON-LD schema graph, llms.txt syndication, and automated indexing across Google AI & ChatGPT.</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-semibold text-emerald-400">LLM Indexing: 100%</span>
                  <Link to="/ai" className="text-xs font-bold text-[#60a5fa] hover:underline">AI Agent Index →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black/[0.02] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade inView>
            <div className="mb-16 text-center">
              <p className="editorial-kicker mb-3 text-[#6b7280]">How It Works</p>
              <h2 className="text-uplift text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
                Simple process, {" "}
                <AnimatedGradientText colorFrom="#4285f4" colorTo="#34a853" className="text-stroke-soft">
                  real results
                </AnimatedGradientText>
              </h2>
            </div>
          </BlurFade>

          <div className="grid gap-8 md:grid-cols-3">
            {data.homepage.process_steps.map((step, i) => (
              <div key={step.number}>
                <BlurFade inView delay={i * 0.07}>
                  <MagicCard className="h-full p-6">
                    <div className="mb-4 text-5xl font-bold text-black/15">{step.number}</div>
                    <h3 className="mb-2 text-xl font-semibold text-[#111111]">{step.title}</h3>
                    <p className="leading-relaxed text-[#4b5563]">{step.description}</p>
                  </MagicCard>
                </BlurFade>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade inView>
            <div className="mb-12 text-center">
              <div className="editorial-kicker mb-4 inline-flex items-center gap-2 rounded-full border border-[#ea4335]/25 bg-[#ea4335]/8 px-4 py-1.5 font-medium text-[#c5221f]">
                <Calendar className="h-3.5 w-3.5" />
                Limited Time — Available Until September
              </div>
              <h2 className="text-uplift mb-4 text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
                I build fast, intelligent websites that actually work—powered by AI and built to convert.
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-[#4b5563]">
                Choose the tier that matches where you are. Every option ships fast and sells results, not just features.
              </p>
            </div>
          </BlurFade>

          <div className="relative">
            <div className="grid gap-6 blur-sm md:grid-cols-2">
              {[
                {
                  tier: "Starter",
                  price: "$20",
                  hook: "Get online TODAY",
                  deliverable: "1-page site, deployed",
                  color: "#4285f4",
                },
                {
                  tier: "Launch",
                  price: "$50",
                  hook: "Look legit instantly",
                  deliverable: "Multi-section landing page + branding",
                  color: "#34a853",
                },
                {
                  tier: "Growth",
                  price: "$100",
                  hook: "Start getting found",
                  deliverable: "SEO setup + analytics + optimization",
                  color: "#fbbc05",
                },
                {
                  tier: "Authority",
                  price: "$250",
                  hook: "Automate & scale",
                  deliverable: "AI integrations + advanced UX + automation",
                  color: "#ea4335",
                },
              ].map((item, i) => (
                <div key={item.tier}>
                  <BlurFade inView delay={i * 0.06}>
                    <MagicCard className="h-full p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-semibold tracking-wide text-[#6b7280] uppercase">
                            {item.tier}
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-[#111111]">{item.price}</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-[#111111]">{item.hook}</h3>
                      <p className="mb-4 text-[#4b5563]">{item.deliverable}</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-[#374151]">
                          <Zap className="mt-0.5 h-4 w-4 shrink-0" style={{ color: item.color }} />
                          <span>Fast turnaround</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-[#374151]">
                          <Zap className="mt-0.5 h-4 w-4 shrink-0" style={{ color: item.color }} />
                          <span>Netlify-native deploy</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-[#374151]">
                          <Zap className="mt-0.5 h-4 w-4 shrink-0" style={{ color: item.color }} />
                          <span>Real working product, not a mockup</span>
                        </li>
                      </ul>
                    </MagicCard>
                  </BlurFade>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#111111]/15 bg-[#111111] px-4 py-2 text-sm font-semibold text-white">
                <Calendar className="h-4 w-4" />
                All spots are filled for this special
              </div>
              <p className="mb-6 max-w-md text-center text-[#4b5563]">
                These intro tiers sold out. See current service packages with realistic pricing and real deliverables.
              </p>
              <Link to="/offerings">
                <ShimmerButton className="font-medium" shimmerColor="#4285f4">
                  View Services & Pricing
                  <ArrowRight className="h-4 w-4" />
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade inView>
            <MagicCard className="p-8 md:p-12">
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
                <div className="flex-1">
                  <p className="editorial-kicker mb-3 text-[#6b7280]">Featured Service</p>
                  <h2 className="text-uplift mb-2 text-3xl font-bold tracking-tight text-[#111111]">
                    {data.business_context.offerings[0].name}
                  </h2>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#fbbc05]/18 px-3 py-1 text-sm font-semibold text-[#7a5a00]">
                    {data.business_context.offerings[0].price_usd}
                  </div>
                  <ul className="space-y-3">
                    {data.business_context.offerings[0].features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#374151]">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#34a853]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 md:text-right">
                  <Link to="/offerings">
                    <ShimmerButton className="font-medium" shimmerColor="#34a853">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
            </MagicCard>
          </BlurFade>
        </div>
      </section>

      <section className="bg-black/[0.02] py-20 overflow-hidden">
        <div className="mx-auto max-w-4xl px-6">
          <BlurFade inView>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="editorial-kicker mb-3 text-[#6b7280]">Live Builds</p>
                <h2 className="text-uplift text-3xl font-bold tracking-tight text-[#111111]">
                  Things I&apos;m shipping right now
                </h2>
              </div>
              <Link
                to="/builds"
                className="hidden text-sm font-medium text-[#4285f4] hover:underline sm:block"
              >
                View all builds →
              </Link>
            </div>
          </BlurFade>
        </div>

        {/* Infinite Marquee Ticker */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/70 dark:from-[#0b0b0f]/70 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/70 dark:from-[#0b0b0f]/70 to-transparent z-10" />

          <Marquee pauseOnHover className="[--duration:40s] py-3">
            {liveBuilds.map((b) => (
              <a
                key={b.name}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-[280px] shrink-0 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a202c] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.05]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest"
                    style={{ color: b.accent, background: `${b.accent}14` }}
                  >
                    {b.kind}
                  </span>
                  <ExternalLink size={12} className="text-[#6b7280] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-sm font-bold leading-snug text-[#111111] dark:text-white group-hover:text-[#4285f4] transition-colors">{b.name}</h3>
                <p className="mt-1.5 text-xs text-[#6b7280] dark:text-[#9ca3af] leading-relaxed line-clamp-2">{b.desc}</p>
              </a>
            ))}
          </Marquee>
        </div>

        <div className="mx-auto max-w-4xl px-6 mt-6 sm:hidden">
          <Link
            to="/builds"
            className="inline-flex text-sm font-medium text-[#4285f4] hover:underline"
          >
            View all builds →
          </Link>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade inView>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="editorial-kicker mb-3 text-[#6b7280]">From the Blog</p>
                <h2 className="text-uplift text-3xl font-bold tracking-tight text-[#111111]">Latest stories</h2>
              </div>
              <Link to="/blog" className="hidden text-sm font-medium text-[#4285f4] hover:underline sm:block">
                View all →
              </Link>
            </div>
          </BlurFade>

          <div className="grid gap-6 md:grid-cols-3">
            {data.blog_stories.posts.map((post, i) => (
              <div key={post.id}>
                <BlurFade inView delay={i * 0.06}>
                  <Link to={`/blog/${post.id}`} className="block h-full">
                    <MagicCard className="h-full p-6">
                      <time className="text-xs font-medium tracking-wide text-[#6b7280] uppercase">{post.date}</time>
                      <h3 className="mt-2 mb-3 text-lg leading-snug font-semibold text-[#111111] transition-colors hover:text-[#ea4335]">
                        {post.title}
                      </h3>
                      <p className="line-clamp-3 text-sm leading-relaxed text-[#4b5563]">{post.content_summary}</p>
                    </MagicCard>
                  </Link>
                </BlurFade>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black/[0.02] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <BlurFade inView>
            <div className="mb-12 text-center">
              <p className="editorial-kicker mb-3 text-[#6b7280]">FAQ</p>
              <h2 className="text-uplift text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-sm text-[#4b5563]">
                Answers to common queries about 757 web development, local SEO, and IT automation.
              </p>
            </div>
          </BlurFade>

          <div className="space-y-4">
            {data.homepage.faq.map((item, i) => {
              const isOpen = activeFaq === i;
              return (
                <BlurFade inView delay={i * 0.05} key={i}>
                  <div className="overflow-hidden rounded-2xl border border-black/10 bg-white transition-all duration-200">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-[#111111] outline-none"
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>
                      <span className="ml-4 shrink-0 text-xl font-light text-[#6b7280]">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-200 ease-in-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-5 text-sm leading-relaxed text-[#4b5563]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
