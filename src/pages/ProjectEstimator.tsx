import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, Check, Sparkles, PhoneCall, ShieldCheck, ArrowRight, DollarSign, Clock } from "lucide-react";

export default function ProjectEstimator() {
  const [projectType, setProjectType] = useState<"starter" | "growth" | "enterprise">("growth");
  const [includeLocalSEO, setIncludeLocalSEO] = useState(true);
  const [includeAEO, setIncludeAEO] = useState(true);
  const [includeBooking, setIncludeBooking] = useState(true);
  const [includeAIWorkflows, setIncludeAIWorkflows] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Virginia Beach");

  const [submitted, setSubmitted] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // Calculation Logic
  let basePrice = projectType === "starter" ? 499 : projectType === "growth" ? 999 : 1999;
  let estimatedDays = projectType === "starter" ? 3 : projectType === "growth" ? 7 : 14;

  if (includeLocalSEO) { basePrice += 250; }
  if (includeAEO) { basePrice += 200; }
  if (includeBooking) { basePrice += 150; }
  if (includeAIWorkflows) { basePrice += 400; estimatedDays += 2; }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4285F4]/10 px-3.5 py-1 text-xs font-bold text-[#4285F4]">
          <Calculator className="h-3.5 w-3.5" /> Interactive 757 Web Project Calculator
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
          Website Cost & ROI <span className="bg-gradient-to-r from-[#4285F4] to-[#174ea6] bg-clip-text text-transparent">Estimator</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#4b5563]">
          Transparent, upfront pricing for Virginia Beach, Norfolk, Chesapeake, and 757 area businesses. Select your features below to calculate an instant cost estimate and launch timeline.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Estimator Controls */}
        <div className="space-y-8 lg:col-span-7">
          {/* Step 1: Project Type */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#111111]">1. Select Package Tier</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setProjectType("starter")}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  projectType === "starter"
                    ? "border-[#4285F4] bg-[#4285F4]/5 ring-2 ring-[#4285F4]"
                    : "border-black/10 hover:border-black/20"
                }`}
              >
                <div className="text-xs font-bold uppercase text-[#6b7280]">1-Page Sprint</div>
                <div className="mt-1 text-xl font-extrabold text-[#111111]">$499</div>
                <p className="mt-2 text-xs text-[#4b5563]">High-speed local launchpad site with essential contact CTAs.</p>
              </button>

              <button
                type="button"
                onClick={() => setProjectType("growth")}
                className={`rounded-2xl border p-4 text-left transition-all relative ${
                  projectType === "growth"
                    ? "border-[#4285F4] bg-[#4285F4]/5 ring-2 ring-[#4285F4]"
                    : "border-black/10 hover:border-black/20"
                }`}
              >
                <span className="absolute -top-2.5 right-3 rounded-full bg-[#4285F4] px-2 py-0.5 text-[10px] font-bold text-white">
                  Most Popular
                </span>
                <div className="text-xs font-bold uppercase text-[#4285F4]">Growth Stack</div>
                <div className="mt-1 text-xl font-extrabold text-[#111111]">$999</div>
                <p className="mt-2 text-xs text-[#4b5563]">Full multi-page site, local schema, and customer booking flow.</p>
              </button>

              <button
                type="button"
                onClick={() => setProjectType("enterprise")}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  projectType === "enterprise"
                    ? "border-[#4285F4] bg-[#4285F4]/5 ring-2 ring-[#4285F4]"
                    : "border-black/10 hover:border-black/20"
                }`}
              >
                <div className="text-xs font-bold uppercase text-[#6b7280]">Enterprise / Custom</div>
                <div className="mt-1 text-xl font-extrabold text-[#111111]">$1,999+</div>
                <p className="mt-2 text-xs text-[#4b5563]">Custom React app, AI workflows, and advanced edge architecture.</p>
              </button>
            </div>
          </div>

          {/* Step 2: Location Target */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#111111]">2. Target 757 City Location</h2>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
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

          {/* Step 3: Add-on Features */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#111111]">3. Optional Growth Add-ons</h2>
            <div className="mt-4 space-y-3">
              <label className="flex items-center justify-between rounded-xl border border-black/5 bg-slate-50 p-4 transition-colors hover:bg-slate-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeLocalSEO}
                    onChange={(e) => setIncludeLocalSEO(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#111111]">757 Local SEO & Schema Package</div>
                    <div className="text-xs text-[#6b7280]">Google Map Pack optimization, local JSON-LD, city keywords.</div>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#4285F4]">+$250</span>
              </label>

              <label className="flex items-center justify-between rounded-xl border border-black/5 bg-slate-50 p-4 transition-colors hover:bg-slate-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeAEO}
                    onChange={(e) => setIncludeAEO(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#111111]">AEO (Answer Engine Optimization) AI Setup</div>
                    <div className="text-xs text-[#6b7280]">Structured data for ChatGPT, Perplexity, Claude, & Google AI.</div>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#4285F4]">+$200</span>
              </label>

              <label className="flex items-center justify-between rounded-xl border border-black/5 bg-slate-50 p-4 transition-colors hover:bg-slate-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeBooking}
                    onChange={(e) => setIncludeBooking(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#111111]">Instant Customer Booking Funnel</div>
                    <div className="text-xs text-[#6b7280]">Integrated Calendly, appointment scheduling, & Netlify forms.</div>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#4285F4]">+$150</span>
              </label>

              <label className="flex items-center justify-between rounded-xl border border-black/5 bg-slate-50 p-4 transition-colors hover:bg-slate-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeAIWorkflows}
                    onChange={(e) => setIncludeAIWorkflows(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#111111]">Custom AI Chat & Lead Automation</div>
                    <div className="text-xs text-[#6b7280]">Automated email responses and AI lead scoring assistant.</div>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#4285F4]">+$400</span>
              </label>
            </div>
          </div>
        </div>

        {/* Live Price Summary Box */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border border-black/10 bg-slate-900 p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Total</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                <ShieldCheck className="h-3 w-3" /> No Hidden Fees
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">${basePrice.toLocaleString()}</span>
              <span className="text-xs text-slate-400">USD One-Time</span>
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-300">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4 text-[#60a5fa]" /> Est. Launch: {estimatedDays} Business Days
              </span>
              <span>• Target: {selectedCity}</span>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Base Architecture Tier:</span>
                <span className="font-bold text-white uppercase">{projectType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Netlify Edge Hosting:</span>
                <span className="font-bold text-emerald-400">Included Free</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Lighthouse 100 Guarantee:</span>
                <span className="font-bold text-emerald-400">Included</span>
              </div>
            </div>

            {/* Proposal Form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name / Company"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-[#60a5fa] focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-[#60a5fa] focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-[#60a5fa] focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#4285F4] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#2563eb] shadow-lg shadow-blue-500/25"
                >
                  Request Proposal at ${basePrice}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <div className="mt-8 rounded-2xl bg-emerald-500/20 p-6 text-center text-emerald-300">
                <Check className="mx-auto h-8 w-8 text-emerald-400" />
                <h3 className="mt-2 text-base font-bold text-white">Proposal Request Received!</h3>
                <p className="mt-1 text-xs text-slate-300">
                  Thanks {clientName}! Neal Frazier will contact you at {clientEmail} within 2 hours to confirm your project scope for {selectedCity}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
