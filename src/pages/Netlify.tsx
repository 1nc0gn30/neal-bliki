import { Rocket, Upload, Shield, Globe, Zap, ArrowRight, Server, Clock, Layers, Cloud } from "lucide-react";
import { Link } from "react-router-dom";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { TextAnimate } from "@/components/magicui/text-animate";

const REFERRAL_LINKS = [
  {
    name: "Netlify.com",
    url: "https://join.netlify.com/d8a2zdtel9gy-w6zrwt",
    badge: "Official",
    badgeColor: "#4285F4",
    icon: Globe,
    desc: "The fastest way to host modern web projects. Start free, scale forever.",
  },
  {
    name: "Netlify Signup",
    url: "https://join.netlify.com/yoso7wqaix15",
    badge: "Free Tier",
    badgeColor: "#34A853",
    icon: Rocket,
    desc: "Create your account and deploy your first site in under 60 seconds.",
  },
  {
    name: "Netlify Drop",
    url: "https://join.netlify.com/3f80mtpfoaxa-96ld6",
    badge: "Drag \u0026 Drop",
    badgeColor: "#FBBC05",
    icon: Upload,
    desc: "Drag a folder, get a live URL. The simplest deploy flow on the internet.",
  },
  {
    name: "Netlify.com — Recommended",
    url: "https://join.netlify.com/vyxpinavj32l-1crlbg",
    badge: "Recommended",
    badgeColor: "#EA4335",
    icon: Shield,
    desc: "Netlify's top-recommended onboarding path for serious builders.",
  },
];

const FEATURES = [
  { icon: Zap, title: "Global Edge CDN", desc: "Sub-50ms latency worldwide. Your site is fast everywhere, not just Virginia Beach." },
  { icon: Server, title: "Serverless Functions", desc: "APIs, form handlers, auth — all without managing a server. Just write and deploy." },
  { icon: Cloud, title: "Git-Based Workflow", desc: "Push to GitHub, watch it build. Preview URLs for every branch. No FTP. No cPanel." },
  { icon: Layers, title: "Forms \u0026 Identity", desc: "Built-in form handling, user auth, and edge logic. No plugins required." },
  { icon: Clock, title: "Instant Rollbacks", desc: "Every deploy is a snapshot. One click to revert. Sleep easy after late-night pushes." },
  { icon: Shield, title: "Free SSL + Custom Domains", desc: "Automatic HTTPS, custom domains, branch subdomains. Production-grade from day one." },
];

export default function Netlify() {
  return (
    <div className="px-6 pb-20 pt-28">
      <div className="mx-auto max-w-4xl">
        <header className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#4285F4]/10 px-4 py-1.5 text-sm font-bold text-[#4285F4]">
            <Shield className="h-4 w-4" /> Netlify Certified Partner
          </div>
          <TextAnimate
            as="h1"
            by="word"
            animation="blurInUp"
            className="text-uplift mb-4 text-4xl font-bold tracking-tight text-[#111111] md:text-5xl"
          >
            Why I Deploy on Netlify
          </TextAnimate>
          <p className="text-lg leading-relaxed text-[#4b5563]">
            I am a certified Netlify partner because I have shipped over 100 sites on the platform
            and it is the only host I trust for production. Here is why you should join too.
          </p>
        </header>

        <BlurFade inView>
          <div className="mb-16 grid gap-4 sm:grid-cols-2">
            {REFERRAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12)] hover:border-[#4285F4]/20"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4285F4]/8">
                      <link.icon className="h-5 w-5 text-[#4285F4]" />
                    </div>
                    <span className="text-sm font-bold text-[#111111]">{link.name}</span>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: link.badgeColor + "14", color: link.badgeColor }}
                  >
                    {link.badge}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[#4b5563]">{link.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4285F4] transition-colors group-hover:text-[#1d4ed8]">
                  Get Started <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </BlurFade>

        <section className="mb-16">
          <h2 className="text-uplift mb-8 text-center text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
            What You Get
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <BlurFade key={f.title} inView delay={i * 0.05}>
                <MagicCard className="h-full p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#4285F4]/8">
                    <f.icon className="h-5 w-5 text-[#4285F4]" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-[#111111]">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4b5563]">{f.desc}</p>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </section>

        <BlurFade inView>
          <MagicCard className="relative overflow-hidden border-[#4285F4]/20 bg-gradient-to-br from-[#4285F4]/5 to-white p-8 text-center md:p-12">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-[#4285F4]/10 blur-2xl" />
            <h2 className="text-uplift mb-3 text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
              Ready to deploy like a pro?
            </h2>
            <p className="mx-auto mb-6 max-w-md text-[#4b5563]">
              Join Netlify through my partner link and start shipping faster today.
              Free tier. No credit card. No lock-in.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://join.netlify.com/d8a2zdtel9gy-w6zrwt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <ShimmerButton className="font-medium" shimmerColor="#4285F4">
                  <Rocket className="h-4 w-4" /> Sign Up Free on Netlify
                </ShimmerButton>
              </a>
              <Link
                to="/offerings"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-medium text-[#111111] transition-colors hover:bg-black/5"
              >
                See My Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </MagicCard>
        </BlurFade>
      </div>
    </div>
  );
}
