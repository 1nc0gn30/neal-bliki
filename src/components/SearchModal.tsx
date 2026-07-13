import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";

import data from "@/data.json";

type SearchResult = {
  type: "blog" | "wiki";
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  url: string;
};

export function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const blog: SearchResult[] = data.blog_stories.posts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content_summary.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .map((p) => ({
        type: "blog" as const,
        id: p.id,
        title: p.title,
        excerpt: p.content_summary,
        tags: p.tags,
        url: `/blog/${p.id}`,
      }));

    const wiki: SearchResult[] = data.wiki_nodes.entities
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .map((n) => ({
        type: "wiki" as const,
        id: n.id,
        title: n.title,
        excerpt: n.content,
        tags: n.tags,
        url: `/wiki/${n.id}`,
      }));

    return [...blog, ...wiki].slice(0, 12);
  }, [query]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 pt-24 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search the site"
    >
      <div
        className="mx-4 w-full max-w-xl rounded-2xl border border-black/10 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-black/10 px-5 py-4">
          <Search className="h-5 w-5 text-[#6b7280]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blog posts and wiki nodes..."
            className="flex-1 bg-transparent text-base text-[#111111] placeholder:text-[#9ca3af] focus:outline-none"
            aria-label="Search query"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="rounded-lg p-1 text-[#6b7280] transition-colors hover:bg-black/5 hover:text-[#111111]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {query.trim() && (
          <div className="max-h-96 overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-[#6b7280]">
                No results for "{query}"
              </p>
            ) : (
              results.map((r) => (
                <Link
                  key={`${r.type}-${r.id}`}
                  to={r.url}
                  onClick={onClose}
                  className="block rounded-xl px-3 py-3 transition-colors hover:bg-[#4285f4]/5"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">
                      {r.type}
                    </span>
                    <span className="font-medium text-[#111111]">{r.title}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-[#6b7280]">{r.excerpt}</p>
                  {r.tags.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {r.tags.slice(0, 4).map((t) => (
                        <span key={t} className="text-xs text-[#9ca3af]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}