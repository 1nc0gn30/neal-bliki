import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { BUILDS, BUILD_KINDS, type Build } from "@/data/builds";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card } from "@/components/ui/card";

function BuildPreview({ build }: { build: Build }) {
  const accent = build.accent;
  const Icon = build.icon;
  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-t-2xl border-b border-black/5"
      style={{
        background: `radial-gradient(120% 120% at 0% 0%, ${accent}22, transparent 55%), radial-gradient(120% 120% at 100% 100%, ${accent}18, transparent 50%), linear-gradient(135deg, #0b0b0f, #15151c)`,
      }}
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* accent glow blob */}
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: `${accent}55` }}
      />

      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between">
          <span
            className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: accent, borderColor: `${accent}55`, background: `${accent}12` }}
          >
            {build.kind}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.7)]" />
            LIVE
          </span>
        </div>

        <div className="flex items-end gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl border"
            style={{ borderColor: `${accent}55`, background: `${accent}1a`, color: accent }}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              {build.previewEyebrow}
            </div>
            <div className="text-sm font-semibold text-white/90">{build.name}</div>
          </div>
        </div>
      </div>

      {/* hover overlay */}
      <a
        href={build.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 flex items-center justify-center gap-2 bg-black/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 hover:opacity-100"
      >
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-black"
          style={{ background: accent }}
        >
          Open live site <ArrowUpRight className="h-4 w-4" />
        </span>
      </a>
    </div>
  );
}

function BuildCard({ build, index }: { build: Build; index: number }) {
  return (
    <BlurFade inView delay={index * 0.05}>
      <Card className="group h-full overflow-hidden p-0">
        <a href={build.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${build.name}`}>
          <BuildPreview build={build} />
        </a>
        <div className="flex flex-col p-5">
          <h3 className="text-lg font-bold tracking-tight text-[#111111]">
            {build.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-[#374151]">{build.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
            {build.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {build.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-1 text-xs font-medium text-[#374151]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-black/5 pt-4">
            {build.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-base font-bold text-[#111111]">{stat.value}</div>
                <div className="text-[11px] leading-tight text-[#6b7280]">{stat.label}</div>
              </div>
            ))}
          </div>

          <a
            href={build.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-sm font-semibold text-[#111111] transition-colors hover:bg-black/[0.04]"
          >
            Visit site <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </Card>
    </BlurFade>
  );
}

export default function Builds() {
  const [filter, setFilter] = useState<(typeof BUILD_KINDS)[number]>("All");

  const visible = useMemo(
    () => (filter === "All" ? BUILDS : BUILDS.filter((b) => b.kind === filter)),
    [filter]
  );

  return (
    <div>
      <section className="relative overflow-hidden px-6 pb-12 pt-32">
        <BlurFade inView>
          <div className="mx-auto max-w-5xl text-center">
            <div className="editorial-kicker mb-6 inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#4285f4]/10 px-4 py-1.5 font-medium text-[#1f4db3]">
              <Sparkles className="h-3.5 w-3.5" />
              Live from my workshop
            </div>
            <h1 className="text-uplift mb-4 text-4xl font-bold leading-[1.05] tracking-tight text-[#111111] sm:text-5xl md:text-6xl">
              Builds I&apos;ve shipped
            </h1>
            <p className="text-uplift mx-auto max-w-2xl text-lg leading-relaxed text-[#374151] md:text-xl">
              A running collection of the products, challenges, and tools I&apos;m building in public —
              from AI workshops to live leaderboards and build sprints. Every link is a real, deployed site.
            </p>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.08}>
          <div className="mx-auto mt-9 flex max-w-4xl flex-wrap items-center justify-center gap-2">
            {BUILD_KINDS.map((kind) => {
              const active = filter === kind;
              return (
                <button
                  key={kind}
                  onClick={() => setFilter(kind)}
                  className={
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 " +
                    (active
                      ? "border-[#111111] bg-[#111111] text-white"
                      : "border-black/10 bg-white/70 text-[#374151] hover:border-black/25 hover:bg-white")
                  }
                >
                  {kind}
                  {kind !== "All" && (
                    <span className="ml-1.5 text-xs opacity-60">
                      {` ${BUILDS.filter((b) => b.kind === kind).length}`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </BlurFade>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((build, i) => (
            <BuildCard key={build.id} build={build} index={i} />
          ))}
        </div>

        <BlurFade inView>
          <div className="mx-auto mt-16 max-w-4xl text-center">
            <div className="rounded-2xl border border-[#4285F4]/15 bg-[#4285F4]/[0.03] p-8">
              <h2 className="text-uplift text-2xl font-bold tracking-tight text-[#111111]">
                Want one of these for your business?
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-[#4b5563]">
                The same build systems behind these projects are available as client work — fast sites,
                live dashboards, and AI helpers that run your business while you sleep.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/offerings"
                  className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
                >
                  See services <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-[#111111] transition-colors hover:bg-black/[0.04]"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>
    </div>
  );
}
