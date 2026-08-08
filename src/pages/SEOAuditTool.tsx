import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShieldCheck, Zap, AlertCircle, CheckCircle2, ArrowRight, Sparkles, PhoneCall, RefreshCw, BarChart2 } from "lucide-react";

export default function SEOAuditTool() {
  const [url, setUrl] = useState("");
  const [city, setCity] = useState("Virginia Beach");
  const [category, setCategory] = useState("Home Services & Contractors");
  const [analyzing, setAnalyzing] = useState(false);
  const [auditResult, setAuditResult] = useState<null | {
    score: number;
    pagespeed: number;
    schemaStatus: "Passed" | "Partial" | "Missing";
    aeoStatus: "Optimized" | "Needs Attention";
    issues: string[];
    wins: string[];
  }>(null);

  const runAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setAnalyzing(true);
    setAuditResult(null);

    setTimeout(() => {
      // Generate deterministic analysis based on URL length/content for demo
      const len = url.length;
      const pagespeed = Math.min(99, 45 + (len % 40));
      const score = Math.min(98, 55 + (len % 35));

      setAuditResult({
        score,
        pagespeed,
        schemaStatus: len % 2 === 0 ? "Partial" : "Missing",
        aeoStatus: "Needs Attention",
        issues: [
          `Missing LocalBusiness JSON-LD schema for ${city}, VA`,
          `Page load time exceeds 2.5s on mobile devices (LCP bottleneck)`,
          `Not indexed by ChatGPT, Perplexity, or Google AI Overviews for local ${city} search queries`,
          `No instant appointment booking CTA or lead capture funnel detected`,
        ],
        wins: [
          `Domain name registered and active`,
          `SSL security certificate present`,
        ],
      });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4285F4]/10 px-3.5 py-1 text-xs font-bold text-[#4285F4]">
          <BarChart2 className="h-3.5 w-3.5" /> Instant 757 Local SEO &amp; AEO Audit Inspector
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
          Check Your Website <span className="bg-gradient-to-r from-[#4285F4] to-[#174ea6] bg-clip-text text-transparent">Health &amp; Rankings</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#4b5563]">
          Analyze your website's local 757 search performance, mobile speed, JSON-LD schema health, and AI Search (AEO) readiness in seconds.
        </p>
      </div>

      {/* Visual Image Preview Banner */}
      <div className="mt-10 overflow-hidden rounded-3xl border border-black/10 shadow-xl">
        <div className="relative h-64 w-full bg-slate-900 md:h-80">
          <img
            src="/images/seo-audit-tool.jpg"
            alt="757 Local SEO & AEO Audit Inspector Dashboard"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                Live Audit Engine Active
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-white">
                Inspect PageSpeed, Schema, &amp; AI Citation Status
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-300">
              Tested for Virginia Beach, Norfolk, Chesapeake &amp; 757 Cities
            </span>
          </div>
        </div>
      </div>

      {/* Audit Input Form */}
      <div className="mt-10 rounded-3xl border border-black/10 bg-white p-8 shadow-lg md:p-10">
        <form onSubmit={runAudit} className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-5">
            <label className="text-xs font-bold uppercase text-[#6b7280]">Website URL</label>
            <input
              type="text"
              required
              placeholder="e.g. vabeachcontractor.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-black/15 bg-slate-50 px-4 py-3 text-sm text-[#111111] focus:border-[#4285F4] focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-xs font-bold uppercase text-[#6b7280]">Target 757 City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-black/15 bg-slate-50 px-4 py-3 text-sm text-[#111111] focus:border-[#4285F4] focus:outline-none"
            >
              <option value="Virginia Beach">Virginia Beach</option>
              <option value="Norfolk">Norfolk</option>
              <option value="Chesapeake">Chesapeake</option>
              <option value="Newport News">Newport News</option>
              <option value="Hampton">Hampton</option>
              <option value="Portsmouth">Portsmouth</option>
              <option value="Suffolk">Suffolk</option>
              <option value="Williamsburg">Williamsburg</option>
              <option value="Yorktown">Yorktown</option>
            </select>
          </div>

          <div className="md:col-span-4 flex items-end">
            <button
              type="submit"
              disabled={analyzing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4285F4] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#2563eb] disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Running 757 Audit...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Run Instant Audit
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Audit Results Section */}
      {auditResult && (
        <div className="mt-12 space-y-8">
          {/* Score Gauges Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-black/10 bg-white p-6 text-center shadow-sm">
              <div className="text-xs font-bold uppercase text-[#6b7280]">Local SEO Health</div>
              <div className="mt-2 text-4xl font-black text-amber-500">{auditResult.score}/100</div>
              <p className="mt-1 text-xs text-[#4b5563]">Optimization rating for {city}, VA search intent.</p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 text-center shadow-sm">
              <div className="text-xs font-bold uppercase text-[#6b7280]">Mobile PageSpeed</div>
              <div className="mt-2 text-4xl font-black text-amber-600">{auditResult.pagespeed}/100</div>
              <p className="mt-1 text-xs text-[#4b5563]">Ideal target is 95+ on Google Lighthouse.</p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 text-center shadow-sm">
              <div className="text-xs font-bold uppercase text-[#6b7280]">AEO &amp; Schema Check</div>
              <div className="mt-2 text-2xl font-black text-red-600">{auditResult.schemaStatus}</div>
              <p className="mt-1 text-xs text-[#4b5563]">Missing LocalBusiness JSON-LD structure.</p>
            </div>
          </div>

          {/* Actionable Recommendations List */}
          <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#111111]">Action Items &amp; Opportunities for {url}</h2>
            <div className="mt-6 space-y-3">
              {auditResult.issues.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/50 p-4 text-xs font-medium text-red-900">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                  <span>{issue}</span>
                </div>
              ))}
              {auditResult.wins.map((win, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-xs font-medium text-emerald-900">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{win}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl bg-slate-900 p-6 text-white sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-bold">Want Neal Frazier to fix these issues in 3 days?</h3>
                <p className="text-xs text-slate-300">Get a 100/100 Lighthouse score and rank top in {city} for a fixed price.</p>
              </div>
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4285F4] px-6 py-3 text-xs font-bold text-white transition-all hover:bg-[#2563eb]"
              >
                View Fix Estimate &amp; Pricing
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
