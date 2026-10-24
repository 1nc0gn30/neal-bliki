export const MOTION_SERIES = [
  { id: "fan-edit", label: "Fan edits" },
  { id: "zoth", label: "Zoth" },
  { id: "studio-tool", label: "Studio tools" },
  { id: "works-with", label: "Works with" },
  { id: "launch", label: "Launch" },
  { id: "netlify", label: "Netlify" },
  { id: "other", label: "Other" },
] as const;

export type MotionSeriesId = (typeof MOTION_SERIES)[number]["id"];

export type MotionReel = {
  id: string;
  title: string;
  series: MotionSeriesId;
  posterUrl?: string;
  videoUrl: string;
  postedOnX?: string;
};

const SERIES_LABEL = Object.fromEntries(
  MOTION_SERIES.map((series) => [series.id, series.label]),
) as Record<MotionSeriesId, string>;

const SERIES_ALIASES: Record<string, MotionSeriesId> = {
  "fan-edit": "fan-edit",
  fanedit: "fan-edit",
  "fan edit": "fan-edit",
  "fan edits": "fan-edit",
  zoth: "zoth",
  zothos: "zoth",
  "studio-tool": "studio-tool",
  studiotool: "studio-tool",
  "studio tool": "studio-tool",
  "studio tools": "studio-tool",
  "works-with": "works-with",
  workswith: "works-with",
  "works with": "works-with",
  launch: "launch",
  netlify: "netlify",
  "netlify showcase": "netlify",
  other: "other",
};

export function motionSeriesLabel(series: MotionSeriesId): string {
  return SERIES_LABEL[series];
}

export function normalizeMotionSeries(value: unknown): MotionSeriesId {
  if (typeof value !== "string") return "other";
  const key = value
    .trim()
    .toLowerCase()
    .replace(/[_/]+/g, "-")
    .replace(/\s+/g, " ");
  return SERIES_ALIASES[key] ?? SERIES_ALIASES[key.replace(/-/g, " ")] ?? "other";
}

export function joinMediaUrl(base: string, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const root = base.trim().replace(/\/+$/, "");
  const relative = path.startsWith("/") ? path : `/${path}`;
  return `${root}${relative}`;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function pickString(record: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

function postedOnX(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^\d{6,}$/.test(trimmed)) return `https://x.com/i/web/status/${trimmed}`;
  return undefined;
}

function extractItems(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  const record = asRecord(data);
  if (!record) return [];
  if (Array.isArray(record.items)) return record.items;
  return [];
}

export function parseMotionManifest(data: unknown, mediaBase: string): MotionReel[] {
  const reels: MotionReel[] = [];

  extractItems(data).forEach((entry, index) => {
    const record = asRecord(entry);
    if (!record) return;

    const web = pickString(record, ["web", "web_url", "webUrl"]);
    const video = pickString(record, ["video", "video_url", "videoUrl"]);
    const playback = web || video;
    if (!playback) return;

    const title = pickString(record, ["title", "name"]) ?? "Untitled reel";
    const explicitId = pickString(record, ["id", "slug"]);
    const poster = pickString(record, ["poster", "poster_url", "posterUrl", "thumbnail"]);
    const series = normalizeMotionSeries(record.series ?? record.category);

    reels.push({
      id: explicitId ?? `reel-${index + 1}`,
      title,
      series,
      posterUrl: poster ? joinMediaUrl(mediaBase, poster) : undefined,
      videoUrl: joinMediaUrl(mediaBase, playback),
      postedOnX: postedOnX(record.posted_on_x ?? record.postedOnX),
    });
  });

  return reels;
}

export function motionManifestUrl(mediaBase: string): string {
  return joinMediaUrl(mediaBase, "/manifest.json");
}
