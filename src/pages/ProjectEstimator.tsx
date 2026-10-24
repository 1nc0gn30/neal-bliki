import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calculator, ShieldCheck, ArrowRight, Clock, PhoneCall } from "lucide-react";

const PACKAGES = [
  {
    id: "one-page",
    label: "1-Page Launch",
    price: 149,
    days: "24 hours",
    blurb: "Done-for-you one-page site, local SEO, and a 60-second quote calculator.",
    includes: ["Custom one-page site", "LocalBusiness JSON-LD", "Netlify deploy", "$0 monthly hosting"],
  },
  {
    id: "receptionist",
    label: "AI Receptionist",
    price: 299,
    days: "48 hours",
    blurb: "24/7 answers, instant quotes, and SMS lead capture trained on your services.",
    includes: ["Trained on your pricing", "Quote capture", "SMS and email leads", "$0 monthly SaaS fee"],
  },
  {
    id: "five-page",
    label: "5-Page Turnkey",
    price: 499,
    days: "72 hours",
    popular: true,
    blurb: "Home, services, quote calculator, reviews, and contact, with the AI receptionist included.",
    includes: ["Five custom pages", "AI receptionist included", "AEO graph and llms.txt", "100/100 Core Web Vitals target"],
  },
  {
    id: "swarm",
    label: "AI Swarm / MCP",
    price: 997,
    days: "5 days",
    blurb: "Custom agent workflow, MCP server, or SaaS MVP with source-code handoff.",
    includes: ["Multi-agent workflow or MCP server", "Source handoff", "Production deploy", "Starts from the $99 deposit"],
  },
] as const;

type PackageId = (typeof PACKAGES)[number]["id"];

export default function ProjectEstimator() {
  const navigate = useNavigate();
  const [packageId, setPackageId] = useState<PackageId>("five-page");
  const [selectedCity, setSelectedCity] = useState("Virginia Beach");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const selected = PACKAGES.find((item) => item.id === packageId) ?? PACKAGES[2];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const context = [
      `Estimator quote: ${selected.label} for ${selectedCity}`,
      `Published price: $${selected.price.toLocaleString()} (${selected.days})`,
      "Any custom build can start with the $99 kickoff deposit.",
      `Name: ${clientName}`,
      `Email: ${clientEmail}`,
      clientPhone ? `Phone: ${clientPhone}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    navigate(`/contact?context=${encodeURIComponent(context)}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4285F4]/10 px-3.5 py-1 text-xs font-bold text-[#4285F4]">
          <Calculator className="h-3.5 w-3.5" /> Interactive 757 Web Project Calculator
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
          Website Cost & ROI <span className="bg-gradient-to-r from-[#4285F4] to-[#174ea6] bg-clip-text text-transparent">Estimator</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#4b5563]">
          These are the published Neal Frazier Tech packages for Virginia Beach, Norfolk, Chesapeake, and the rest of 757. Promo code FOUNDER25 saves 25% at Stripe checkout. Any custom build can start with the $99 kickoff deposit.
        </p>
        <p className="mt-3 text-sm font-semibold text-[#111111]">
          <a href="tel:+19482047987" className="inline-flex items-center gap-1 text-[#4285F4]">
            <PhoneCall className="h-4 w-4" /> (948) 204-7987
          </a>
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-lg font-bold text-[#111111]">1. Select a published package</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PACKAGES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPackageId(item.id)}
                  className={`relative rounded-2xl border p-4 text-left transition-all ${
                    packageId === item.id
                      ? "border-[#4285F4] bg-[#4285F4]/5 ring-2 ring-[#4285F4]"
                      : "border-black/10 hover:border-black/20"
                  }`}
                >
                  {"popular" in item && item.popular && (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-[#4285F4] px-2 py-0.5 text-[10px] font-bold text-white">
                      Most Popular
                    </span>
                  )}
                  <div className="text-xs font-bold uppercase text-[#6b7280]">{item.label}</div>
                  <div className="mt-1 text-xl font-extrabold text-[#111111]">${item.price.toLocaleString()}</div>
                  <p className="mt-2 text-xs text-[#4b5563]">{item.blurb}</p>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#6b7280]">
              Custom work begins with the{" "}
              <a className="font-semibold text-[#4285F4]" href="https://buy.stripe.com/eVqbJ05k1gWA3HacgEfw40V" target="_blank" rel="noopener noreferrer">
                $99 kickoff deposit
              </a>
              . The balance is due after you approve a live preview.
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-lg font-bold text-[#111111]">2. Target 757 City Location</h2>
            <select
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
              className="mt-4 w-full rounded-xl border border-black/15 bg-slate-50 px-4 py-3 text-sm font-semibold text-[#111111] focus:border-[#4285F4] focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
            >
              <option value="Virginia Beach">Virginia Beach, VA</option>
              <option value="Norfolk">Norfolk, VA</option>
              <option value="Chesapeake">Chesapeake, VA</option>
              <option value="Newport News">Newport News, VA</option>
              <option value="Hampton">Hampton, VA</option>
              <option value="Portsmouth">Portsmouth, VA</option>
              <option value="Suffolk">Suffolk, VA</option>
              <option value="Williamsburg">Williamsburg, VA</option>
              <option value="Yorktown">Yorktown & Poquoson, VA</option>
            </select>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-lg font-bold text-[#111111]">3. Included in {selected.label}</h2>
            <ul className="mt-4 space-y-2">
              {selected.includes.map((feature) => (
                <li key={feature} className="rounded-xl border border-black/5 bg-slate-50 px-4 py-3 text-sm font-medium text-[#111111]">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border border-black/10 bg-slate-900 p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Published price</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                <ShieldCheck className="h-3 w-3" /> Matches /offerings
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">${selected.price.toLocaleString()}</span>
              <span className="text-xs text-slate-400">USD one-time</span>
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-300">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4 text-[#60a5fa]" /> Delivery: {selected.days}
              </span>
              <span>• Target: {selectedCity}</span>
            </div>

            <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Package:</span>
                <span className="font-bold text-white">{selected.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Kickoff deposit option:</span>
                <span className="font-bold text-emerald-400">$99</span>
              </div>
              <div className="flex items-center justify-between">
                <span>44-tool bundle:</span>
                <span className="font-bold text-white">$49 lifetime</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-3">
              <input
                type="text"
                required
                placeholder="Your Name / Company"
                value={clientName}
                onChange={(event) => setClientName(event.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-[#60a5fa] focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={clientEmail}
                onChange={(event) => setClientEmail(event.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-[#60a5fa] focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number (Optional)"
                value={clientPhone}
                onChange={(event) => setClientPhone(event.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-[#60a5fa] focus:outline-none"
              />
              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#4285F4] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#2563eb]"
              >
                Send this ${selected.price.toLocaleString()} quote
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-4 text-center text-[11px] text-slate-400">
              This opens the contact form with the package filled in. Or call (948) 204-7987.{" "}
              <Link to="/offerings" className="font-semibold text-[#60a5fa]">
                View services
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
