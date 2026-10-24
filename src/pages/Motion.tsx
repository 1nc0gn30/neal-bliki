import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { Film, Play, X } from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Card } from "@/components/ui/card";
import {
  MOTION_SERIES,
  motionManifestUrl,
  motionSeriesLabel,
  parseMotionManifest,
  type MotionReel,
  type MotionSeriesId,
} from "@/lib/motionManifest";
import { cn } from "@/lib/utils";

type LoadState =
  | { status: "loading" }
  | { status: "unset" }
  | { status: "error" }
  | { status: "ready"; reels: MotionReel[] };

type SeriesFilter = "all" | MotionSeriesId;

function mediaBase(): string {
  return (import.meta.env.VITE_MOTION_MEDIA_BASE ?? "").trim();
}

function ReelPoster({ reel }: { reel: MotionReel }) {
  const [failed, setFailed] = useState(false);

  if (!reel.posterUrl || failed) {
    return (
      <div className="flex h-full w-full items-end bg-[radial-gradient(circle_at_18%_12%,rgba(66,133,244,0.45),transparent_42%),linear-gradient(160deg,#111111,#1c1c24)] p-4">
        <span className="line-clamp-2 text-sm font-semibold text-white/85">{reel.title}</span>
      </div>
    );
  }

  return (
    <img
      src={reel.posterUrl}
      alt=""
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export default function Motion() {
  const [load, setLoad] = useState<LoadState>({ status: "loading" });
  const [filter, setFilter] = useState<SeriesFilter>("all");
  const [active, setActive] = useState<MotionReel | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const base = mediaBase();
    if (!base) {
      setLoad({ status: "unset" });
      return;
    }

    const controller = new AbortController();
    setLoad({ status: "loading" });

    fetch(motionManifestUrl(base), { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Manifest responded ${response.status}`);
        return response.json() as Promise<unknown>;
      })
      .then((data) => {
        setLoad({ status: "ready", reels: parseMotionManifest(data, base) });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoad({ status: "error" });
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const reels = load.status === "ready" ? load.reels : [];
  const visible = useMemo(
    () => (filter === "all" ? reels : reels.filter((reel) => reel.series === filter)),
    [filter, reels],
  );
  const counts = useMemo(() => {
    const tally = Object.fromEntries(MOTION_SERIES.map((series) => [series.id, 0])) as Record<
      MotionSeriesId,
      number
    >;
    for (const reel of reels) tally[reel.series] += 1;
    return tally;
  }, [reels]);

  function openReel(reel: MotionReel) {
    setVideoFailed(false);
    setActive(reel);
  }

  return (
    <div className="px-6 pb-24 pt-32">
      <BlurFade inView>
        <div className="mx-auto max-w-5xl text-center">
          <div className="editorial-kicker mb-6 inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#4285f4]/10 px-4 py-1.5 font-medium text-[#1f4db3]">
            <Film className="h-3.5 w-3.5" />
            Brand motion
          </div>
          <h1 className="text-uplift mb-4 text-4xl font-bold leading-[1.05] tracking-tight text-[#111111] sm:text-5xl md:text-6xl">
            Motion reels
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#374151] md:text-xl">
            Fan edits, Zoth, studio tools, works-with films, launches, and Netlify showcases.
            Posters stay light, and the video file loads only when a reel is opened.
          </p>
        </div>
      </BlurFade>

      {load.status === "loading" && (
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
              <div className="aspect-video animate-pulse bg-black/5" />
              <div className="space-y-2 p-4">
                <div className="h-3 w-16 animate-pulse rounded bg-black/5" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-black/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {load.status === "unset" && (
        <StatusMessage title="Motion media is not connected">
          Set <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.85em]">VITE_MOTION_MEDIA_BASE</code> to
          the media site origin, then redeploy. The gallery reads <span className="font-mono text-[0.85em]">/manifest.json</span> from
          that host.
        </StatusMessage>
      )}

      {load.status === "error" && (
        <StatusMessage title="The reel manifest could not be loaded">
          Check that <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.85em]">VITE_MOTION_MEDIA_BASE</code> points
          at the deployed media site, then confirm <span className="font-mono text-[0.85em]">manifest.json</span> allows this
          site to fetch it.
        </StatusMessage>
      )}

      {load.status === "ready" && reels.length === 0 && (
        <StatusMessage title="No reels in the manifest yet">
          The media host responded, and the manifest does not list any playable videos.
        </StatusMessage>
      )}

      {load.status === "ready" && reels.length > 0 && (
        <>
          <div className="mx-auto mt-9 flex max-w-4xl flex-wrap items-center justify-center gap-2">
            <FilterChip active={filter === "all"} count={reels.length} onClick={() => setFilter("all")}>
              All
            </FilterChip>
            {MOTION_SERIES.map((series) => (
              <FilterChip
                key={series.id}
                active={filter === series.id}
                count={counts[series.id]}
                onClick={() => setFilter(series.id)}
              >
                {series.label}
              </FilterChip>
            ))}
          </div>

          {visible.length === 0 ? (
            <StatusMessage title="Nothing in this series yet">
              This filter has no reels. Choose another series to keep browsing.
            </StatusMessage>
          ) : (
            <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((reel, index) => (
                <BlurFade key={reel.id} inView delay={Math.min(index, 8) * 0.04}>
                  <Card className="group h-full overflow-hidden p-0">
                    <button
                      type="button"
                      onClick={() => openReel(reel)}
                      aria-label={`Play ${reel.title}`}
                      className="block w-full text-left"
                    >
                      <span className="relative block aspect-video overflow-hidden bg-[#111111]">
                        <ReelPoster reel={reel} />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#111111] shadow-lg transition-transform duration-200 group-hover:scale-105">
                            <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
                          </span>
                        </span>
                        <span className="absolute left-3 top-3 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                          {motionSeriesLabel(reel.series)}
                        </span>
                      </span>
                      <span className="block px-4 pb-4 pt-3">
                        <span className="block text-base font-bold tracking-tight text-[#111111]">
                          {reel.title}
                        </span>
                        {reel.postedOnX && (
                          <span className="mt-1 block text-xs font-medium text-[#1f4db3]">Posted on X</span>
                        )}
                      </span>
                    </button>
                  </Card>
                </BlurFade>
              ))}
            </div>
          )}
        </>
      )}

      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-4xl overflow-hidden rounded-2xl bg-[#0b0b0f] text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-4 py-3 sm:px-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  {motionSeriesLabel(active.series)}
                </p>
                <h2 id={titleId} className="text-lg font-semibold tracking-tight">
                  {active.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close reel"
                className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {videoFailed ? (
              <p className="px-5 pb-8 text-sm text-white/70">
                This reel could not be loaded from the media host.
              </p>
            ) : (
              <video
                key={active.videoUrl}
                src={active.videoUrl}
                poster={active.posterUrl}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="aspect-video max-h-[70vh] w-full bg-black"
                onError={() => setVideoFailed(true)}
              />
            )}
            {active.postedOnX && (
              <div className="px-5 py-3">
                <a
                  href={active.postedOnX}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#8ab4f8] hover:underline"
                >
                  View the post on X
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
        active
          ? "border-[#111111] bg-[#111111] text-white"
          : "border-black/10 bg-white/70 text-[#374151] hover:border-black/25 hover:bg-white",
      )}
    >
      {children}
      <span className="ml-1.5 text-xs opacity-60">{count}</span>
    </button>
  );
}

function StatusMessage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-black/10 bg-white px-6 py-10 text-center shadow-sm">
      <h2 className="text-lg font-bold tracking-tight text-[#111111]">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{children}</p>
    </div>
  );
}
