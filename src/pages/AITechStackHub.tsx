import { Link } from "react-router-dom";
import { Bot, Terminal, Cpu, Cloud, Server, Sparkles, ShieldCheck, ExternalLink, ArrowRight, Code2, Globe } from "lucide-react";

export default function AITechStackHub() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      {/* Hero Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4285F4]/10 px-3.5 py-1 text-xs font-bold text-[#4285F4]">
          <Cpu className="h-3.5 w-3.5" /> Next-Generation AI &amp; Infrastructure Ecosystem
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
          Nous Research, Hermes, <span className="bg-gradient-to-r from-[#4285F4] via-purple-600 to-[#174ea6] bg-clip-text text-transparent">Google Antigravity</span> &amp; Cloud Edge
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base text-[#4b5563]">
          How Neal Frazier combines open-weights LLM reasoning (Nous Research / Hermes Agent), Google DeepMind Agentic SDK (Google Antigravity &amp; AI Studio), Netlify Edge AI Gateway, and Hostinger Horizon Cloud VPS to build the world's fastest web systems.
        </p>
      </div>

      {/* 4 CORE TECH PLATFORMS GRID */}
      <div className="mt-16 space-y-16">
        {/* 1. NOUS RESEARCH & HERMES AGENT */}
        <section className="overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-950 via-slate-900 to-[#0b0b0f] p-8 text-white shadow-2xl md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3.5 py-1 text-xs font-bold text-purple-300">
              <Terminal className="h-3.5 w-3.5" /> Nous Research Ecosystem
            </span>
            <span className="text-xs font-semibold text-purple-400">Hermes 3 &amp; Mobile Termux Agents</span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
            Nous Research &amp; Hermes Agent Autonomous Reasoning
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
            <strong>Nous Research</strong> leads open-weights AI model training, reasoning architectures, and function-calling benchmarks. <strong>Hermes Agent</strong> empowers fully autonomous AI agents to execute local commands, refactor codebases, parse JSON schemas, and run fully offline on Termux mobile developer setups.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-5">
              <div className="text-xs font-bold uppercase text-purple-400">Hermes Function Calling</div>
              <div className="mt-2 text-sm font-semibold text-white">Structured Tool Execution</div>
              <p className="mt-1 text-xs text-slate-400">Native tool schema parsing without proprietary vendor lock-in.</p>
            </div>
            <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-5">
              <div className="text-xs font-bold uppercase text-purple-400">Termux Mobile Agents</div>
              <div className="mt-2 text-sm font-semibold text-white">Autonomous Android CLI</div>
              <p className="mt-1 text-xs text-slate-400">Run Gemma and Hermes models directly on mobile ARM hardware.</p>
            </div>
            <div className="rounded-2xl border border-purple-500/20 bg-purple-900/20 p-5">
              <div className="text-xs font-bold uppercase text-purple-400">Open-Weights Reasoning</div>
              <div className="mt-2 text-sm font-semibold text-white">Full Privacy &amp; Control</div>
              <p className="mt-1 text-xs text-slate-400">Deployable locally on client servers or cloud VPS without API fees.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/pets"
              className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-xs font-bold text-white transition-all hover:bg-purple-500"
            >
              <Bot className="h-4 w-4" />
              Equip Hermes Cyber Fox Pet
            </Link>
            <a
              href="https://x.com/nealfraziertech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-6 py-3 text-xs font-bold text-white hover:bg-purple-500/20"
            >
              View Hermes Mobile Logs on X
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        {/* 2. GOOGLE ANTIGRAVITY (AGY) & GOOGLE AI STUDIO */}
        <section className="overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-slate-900 via-blue-950 to-[#0b0b0f] p-8 text-white shadow-2xl md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4285F4]/20 px-3.5 py-1 text-xs font-bold text-[#60a5fa]">
              <Sparkles className="h-3.5 w-3.5" /> Google DeepMind &amp; Agentic SDK
            </span>
            <span className="text-xs font-semibold text-[#60a5fa]">Gemini 3.6 Flash / Pro</span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
            Google Antigravity (AGY) &amp; Google AI Studio
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
            <strong>Google Antigravity (AGY)</strong> is Google's AI-first agentic developer framework and SDK. Combined with <strong>Google AI Studio</strong> and Gemini 3.6 Flash/Pro models, it powers multi-agent subagent delegation, structured Pydantic/JSON outputs, and 1M+ context window reasoning.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#4285F4]/20 bg-[#4285F4]/10 p-5">
              <div className="text-xs font-bold uppercase text-[#60a5fa]">Gemini 3.6 Flash</div>
              <div className="mt-2 text-sm font-semibold text-white">Sub-Second Agent Loops</div>
              <p className="mt-1 text-xs text-slate-400">Ultra-fast reasoning model for real-time web agents and local tools.</p>
            </div>
            <div className="rounded-2xl border border-[#4285F4]/20 bg-[#4285F4]/10 p-5">
              <div className="text-xs font-bold uppercase text-[#60a5fa]">Subagent Delegation</div>
              <div className="mt-2 text-sm font-semibold text-white">Parallel Task Execution</div>
              <p className="mt-1 text-xs text-slate-400">Main agents spawn specialized research &amp; code subagents dynamically.</p>
            </div>
            <div className="rounded-2xl border border-[#4285F4]/20 bg-[#4285F4]/10 p-5">
              <div className="text-xs font-bold uppercase text-[#60a5fa]">Multimodal Vision &amp; PDF</div>
              <div className="mt-2 text-sm font-semibold text-white">1M+ Token Window</div>
              <p className="mt-1 text-xs text-slate-400">Ingest entire documentation codebases and wireframes instantly.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://aistudio.google.com/app/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#4285F4] px-6 py-3 text-xs font-bold text-white transition-all hover:bg-[#2563eb]"
            >
              Get API Key on Google AI Studio
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Link
              to="/ai"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold text-white hover:bg-white/20"
            >
              View AI Agent Index
            </Link>
          </div>
        </section>

        {/* 3. NETLIFY & NETLIFY AI */}
        <section className="overflow-hidden rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-950 via-slate-900 to-[#0b0b0f] p-8 text-white shadow-2xl md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-3.5 py-1 text-xs font-bold text-teal-300">
              <Cloud className="h-3.5 w-3.5" /> Netlify Ecosystem
            </span>
            <span className="text-xs font-semibold text-teal-400">Netlify Partner Certified</span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
            Netlify Edge Architecture &amp; Netlify AI Gateway
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
            <strong>Netlify</strong> provides composable edge delivery, serverless edge functions, stateful Netlify Blobs, and the <strong>Netlify AI Gateway</strong> for AI model governance. Neal Frazier deploys 100+ production sites on Netlify to deliver 100/100 Lighthouse performance.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-teal-500/20 bg-teal-900/20 p-5">
              <div className="text-xs font-bold uppercase text-teal-400">Global Edge CDN</div>
              <div className="mt-2 text-sm font-semibold text-white">0.2s TTFB Worldwide</div>
              <p className="mt-1 text-xs text-slate-400">Immutable static HTML distribution across hundreds of edge nodes.</p>
            </div>
            <div className="rounded-2xl border border-teal-500/20 bg-teal-900/20 p-5">
              <div className="text-xs font-bold uppercase text-teal-400">Netlify AI Gateway</div>
              <div className="mt-2 text-sm font-semibold text-white">Model Governance</div>
              <p className="mt-1 text-xs text-slate-400">Centralized rate-limiting, cost control, and model routing for apps.</p>
            </div>
            <div className="rounded-2xl border border-teal-500/20 bg-teal-900/20 p-5">
              <div className="text-xs font-bold uppercase text-teal-400">Netlify Blobs</div>
              <div className="mt-2 text-sm font-semibold text-white">Stateful Agent Memory</div>
              <p className="mt-1 text-xs text-slate-400">Durable object storage pattern without heavy database bloat.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/netlify"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-xs font-bold text-white transition-all hover:bg-teal-500"
            >
              Read Netlify Partner Story
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href="https://join.netlify.com/d8a2zdtel9gy-w6zrwt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-6 py-3 text-xs font-bold text-white hover:bg-teal-500/20"
            >
              Deploy Free on Netlify
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        {/* 4. HOSTINGER & HOSTINGER HORIZON AI */}
        <section className="overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-950 via-slate-900 to-[#0b0b0f] p-8 text-white shadow-2xl md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-300">
              <Server className="h-3.5 w-3.5" /> Hostinger &amp; Cloud Infrastructure
            </span>
            <span className="text-xs font-semibold text-amber-400">Hostinger Horizon AI VPS</span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
            Hostinger Cloud Infrastructure &amp; Horizon AI
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
            <strong>Hostinger</strong> delivers enterprise Cloud VPS hosting, high-NVMe storage, and <strong>Hostinger Horizon AI</strong> for automated server management, site building, and infrastructure scaling for local 757 enterprises.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-amber-500/20 bg-amber-900/20 p-5">
              <div className="text-xs font-bold uppercase text-amber-400">Cloud VPS Scaling</div>
              <div className="mt-2 text-sm font-semibold text-white">NVMe Speed Storage</div>
              <p className="mt-1 text-xs text-slate-400">Dedicated CPU resources for heavy AI models and backend workloads.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-900/20 p-5">
              <div className="text-xs font-bold uppercase text-amber-400">Horizon AI Builder</div>
              <div className="mt-2 text-sm font-semibold text-white">Automated Provisioning</div>
              <p className="mt-1 text-xs text-slate-400">Rapid deployment tools for modern business platforms.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-900/20 p-5">
              <div className="text-xs font-bold uppercase text-amber-400">24/7 Security &amp; Backups</div>
              <div className="mt-2 text-sm font-semibold text-white">Enterprise Redundancy</div>
              <p className="mt-1 text-xs text-slate-400">Automated daily backups and DDoS protection.</p>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Box */}
      <div className="mt-20 rounded-3xl bg-[#111111] p-8 text-center text-white shadow-xl md:p-12">
        <h2 className="text-3xl font-extrabold md:text-4xl">Want This Tech Stack for Your Business?</h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Get a fast, modern website powered by React 19, Netlify Edge, Google AI Studio, and local 757 search optimization.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/calculator"
            className="rounded-full bg-[#4285F4] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#2563eb]"
          >
            Calculate Your Project Cost
          </Link>
        </div>
      </div>
    </div>
  );
}
