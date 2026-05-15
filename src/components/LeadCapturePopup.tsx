import { useState, useEffect, useCallback } from "react";
import { X, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const POPUP_SEEN_KEY = "nf_popup_seen_v1";
const POPUP_SUBMITTED_KEY = "nf_popup_submitted_v1";

const interests = [
  { value: "", label: "What are you interested in?" },
  { value: "website", label: "Website Design / Development" },
  { value: "ai", label: "AI Automation & Tools" },
  { value: "ads", label: "Advertising & Business Leads" },
  { value: "all", label: "All of the above" },
];

function getPopupState(): { seen: boolean; submitted: boolean } {
  try {
    return {
      seen: localStorage.getItem(POPUP_SEEN_KEY) === "true",
      submitted: localStorage.getItem(POPUP_SUBMITTED_KEY) === "true",
    };
  } catch {
    return { seen: false, submitted: false };
  }
}

function markPopupSeen() {
  try {
    localStorage.setItem(POPUP_SEEN_KEY, "true");
  } catch { /* noop */ }
}

function markPopupSubmitted() {
  try {
    localStorage.setItem(POPUP_SUBMITTED_KEY, "true");
  } catch { /* noop */ }
}

export default function LeadCapturePopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const state = getPopupState();
    if (state.submitted) return;

    const timer = setTimeout(() => {
      setOpen(true);
      markPopupSeen();
    }, 8000);

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.4 && !getPopupState().seen) {
        setOpen(true);
        markPopupSeen();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const validate = useCallback(() => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required";
    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email";
    }
    if (!interest) next.interest = "Select what you need help with";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [name, email, interest]);

  const isValid =
    name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    interest.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, interest: true });
    if (!validate()) return;

    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data as any).toString(),
    })
      .then(() => {
        setSubmitted(true);
        markPopupSubmitted();
      })
      .catch(() => {
        setSubmitted(true);
        markPopupSubmitted();
      });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_32px_80px_-24px_rgba(0,0,0,0.25)]">
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 rounded-full p-1.5 text-[#9ca3af] transition-colors hover:bg-black/5 hover:text-[#111111]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-8 pt-10 pb-8">
          {submitted ? (
            <div className="text-center py-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#34A853]/10">
                <TrendingUp className="h-8 w-8 text-[#34A853]" />
              </div>
              <h3 className="text-uplift mb-2 text-2xl font-bold text-[#111111]">You&rsquo;re on the list</h3>
              <p className="text-[#4b5563]">
                I&rsquo;ll reach out within 24 hours with next steps.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center rounded-full bg-[#111111] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black/80"
              >
                Got it
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <img
                  src="/logo-neal-avatar-transparent-bg.webp"
                  alt="Neal Frazier"
                  className="mx-auto mb-4 h-14 w-14 rounded-full object-cover ring-2 ring-[#4285F4]/20"
                />
                <h2 className="text-uplift mb-2 text-2xl font-bold tracking-tight text-[#111111]">
                  Ready to grow?
                </h2>
                <p className="text-sm leading-relaxed text-[#4b5563]">
                  I build fast websites, AI workflows, and
                  <span className="mx-1 inline-flex items-center gap-1 rounded-md bg-[#EA4335]/10 px-1.5 py-0.5 text-sm font-bold text-[#EA4335]">
                    <TrendingUp className="h-3.5 w-3.5" />
                    advertising that brings real leads
                  </span>
                  .
                </p>
              </div>

              <form
                name="lead-capture"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field-popup"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="lead-capture" />
                <p className="hidden">
                  <label>
                    Don&rsquo;t fill this out:
                    <input name="bot-field-popup" />
                  </label>
                </p>

                <div>
                  <label htmlFor="popup-name" className="mb-1 block text-sm font-medium text-[#111111]">
                    Name
                  </label>
                  <input
                    id="popup-name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    autoComplete="name"
                    className={cn(
                      "w-full rounded-xl border bg-white px-4 py-2.5 text-[#111111] outline-none transition-colors",
                      touched.name && errors.name
                        ? "border-[#EA4335] focus:border-[#EA4335]"
                        : "border-black/15 focus:border-[#4285F4]"
                    )}
                    placeholder="Your name"
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-[#EA4335]">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="popup-email" className="mb-1 block text-sm font-medium text-[#111111]">
                    Email
                  </label>
                  <input
                    id="popup-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    autoComplete="email"
                    className={cn(
                      "w-full rounded-xl border bg-white px-4 py-2.5 text-[#111111] outline-none transition-colors",
                      touched.email && errors.email
                        ? "border-[#EA4335] focus:border-[#EA4335]"
                        : "border-black/15 focus:border-[#4285F4]"
                    )}
                    placeholder="you@company.com"
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-[#EA4335]">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="popup-interest" className="mb-1 block text-sm font-medium text-[#111111]">
                    What do you need?
                  </label>
                  <select
                    id="popup-interest"
                    name="interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, interest: true }))}
                    className={cn(
                      "w-full rounded-xl border bg-white px-4 py-2.5 text-[#111111] outline-none transition-colors",
                      touched.interest && errors.interest
                        ? "border-[#EA4335] focus:border-[#EA4335]"
                        : "border-black/15 focus:border-[#FBBC05]"
                    )}
                  >
                    {interests.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {touched.interest && errors.interest && (
                    <p className="mt-1 text-xs text-[#EA4335]">{errors.interest}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className={cn(
                    "w-full rounded-full px-5 py-3 text-sm font-semibold transition-all",
                    isValid
                      ? "bg-[#111111] text-white hover:bg-black/80"
                      : "cursor-not-allowed bg-black/10 text-[#9ca3af]"
                  )}
                >
                  Get Contacted Today
                </button>

                <p className="text-center text-xs text-[#9ca3af]">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
