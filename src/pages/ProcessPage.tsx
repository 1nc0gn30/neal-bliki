import { Link } from "react-router-dom";
import { Zap, ShieldCheck, CheckCircle2, Rocket, PhoneCall, Code, Layers, Sparkles } from "lucide-react";

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4285F4]/10 px-3.5 py-1 text-xs font-bold text-[#4285F4]">
          <Rocket className="h-3.5 w-3.5" /> High-Velocity 757 Launch Playbook
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
          The 3-Day Sprint <span className="bg-gradient-to-r from-[#4285F4] to-[#174ea6] bg-clip-text text-transparent">Web Architecture</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#4b5563]">
          How Neal Frazier ships high-converting, 100/100 Lighthouse websites for Virginia Beach, Norfolk, and Chesapeake businesses in days — not months.
        </p>
      </div>

      {/* Process Steps */}
      <div className="mt-16 space-y-12">
        <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-black/10 bg-white p-8 md:grid-cols-12 md:p-12 shadow-sm">
          <div className="md:col-span-3">
            <span className="text-5xl font-black text-[#4285F4]/30">DAY 01</span>
            <h2 className="mt-2 text-2xl font-bold text-[#111111]">Discovery & Keyword Blueprint</h2>
          </div>
          <div className="md:col-span-9 text-sm text-[#4b5563] space-y-3">
            <p>
              We map your core target audience across 757 cities (Virginia Beach, Norfolk, Chesapeake, etc.), select primary search intent keywords, and define your single primary CTA (booking form, phone call, or quote request).
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#4285F4]">Keyword Targeting</span>
              <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#4285F4]">Competitor Gap Audit</span>
              <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#4285F4]">Offer Copywriting</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-black/10 bg-white p-8 md:grid-cols-12 md:p-12 shadow-sm">
          <div className="md:col-span-3">
            <span className="text-5xl font-black text-indigo-500/30">DAY 02</span>
            <h2 className="mt-2 text-2xl font-bold text-[#111111]">Engineering & Schema Integration</h2>
          </div>
          <div className="md:col-span-9 text-sm text-[#4b5563] space-y-3">
            <p>
              I build your site using React 19, Vite 6, and Tailwind CSS 4. Full JSON-LD structured data (LocalBusiness, Service, FAQPage) is injected for complete indexing across Google, Bing, and AI models.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">React 19 & Vite 6</span>
              <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">JSON-LD Schema Graph</span>
              <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">AEO Optimization</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-black/10 bg-white p-8 md:grid-cols-12 md:p-12 shadow-sm">
          <div className="md:col-span-3">
            <span className="text-5xl font-black text-emerald-500/30">DAY 03</span>
            <h2 className="mt-2 text-2xl font-bold text-[#111111]">Deploy, Index & Hand-off</h2>
          </div>
          <div className="md:col-span-9 text-sm text-[#4b5563] space-y-3">
            <p>
              Deployed to Netlify Edge CDN with automatic HTTPS, static prerendering, sitemap submission to Google Search Console, and automated LLM indexing via llms.txt.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Netlify Edge Global CDN</span>
              <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Google Indexing</span>
              <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Client Handoff</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Comparison */}
      <section className="mt-20 rounded-3xl border border-black/10 bg-slate-900 p-8 md:p-12 text-white shadow-xl">
        <h2 className="text-3xl font-extrabold">The Neal Frazier Web Systems vs. Slow WordPress Agencies</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold uppercase text-slate-400">
                <th className="pb-3">Feature</th>
                <th className="pb-3 text-[#60a5fa]">Neal Frazier Web Systems</th>
                <th className="pb-3 text-red-400">Traditional 757 Agencies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-4 font-semibold text-white">Time to Launch</td>
                <td className="py-4 font-bold text-emerald-400">3 to 7 Days</td>
                <td className="py-4 text-slate-400">60 to 90 Days</td>
              </tr>
              <tr>
                <td className="py-4 font-semibold text-white">Lighthouse Speed Score</td>
                <td className="py-4 font-bold text-emerald-400">100 / 100 Guarantee</td>
                <td className="py-4 text-slate-400">35–65 / 100 (Bloated plugins)</td>
              </tr>
              <tr>
                <td className="py-4 font-semibold text-white">AI Search (AEO) Ready</td>
                <td className="py-4 font-bold text-emerald-400">Native llms.txt + JSON-LD</td>
                <td className="py-4 text-slate-400">None (Legacy HTML)</td>
              </tr>
              <tr>
                <td className="py-4 font-semibold text-white">Hosting Reliability</td>
                <td className="py-4 font-bold text-emerald-400">Netlify Global Edge CDN</td>
                <td className="py-4 text-slate-400">Slow shared hosting</td>
              </tr>
              <tr>
                <td className="py-4 font-semibold text-white">Security & SSL</td>
                <td className="py-4 font-bold text-emerald-400">Immutable Static HTML (No DB hacks)</td>
                <td className="py-4 text-slate-400">Vulnerable SQL databases</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link
          to="/calculator"
          className="inline-flex items-center gap-2 rounded-full bg-[#4285F4] px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#2563eb]"
        >
          Calculate Your 757 Project Estimate
          <Sparkles className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
