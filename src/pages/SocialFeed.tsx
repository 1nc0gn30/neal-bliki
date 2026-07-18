import { useState } from "react";
import { Heart, Repeat, MessageCircle, Share2, Twitter, ExternalLink, Sparkles, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

import data from "@/data.json";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { Highlighter } from "@/components/magicui/highlighter";
import { TextAnimate } from "@/components/magicui/text-animate";
import { cn } from "@/lib/utils";

type SocialPost = {
  id: string;
  date: string;
  content: string;
  media_url: string | null;
  likes: string;
  retweets: string;
};

export default function SocialFeed() {
  const [filter, setFilter] = useState<"all" | "media" | "agents">("all");
  const posts = (data as any).social_posts as SocialPost[] || [];

  // Parse text to highlight tags, hashtags, and handles
  const renderContent = (text: string) => {
    const parts = text.split(/(\s+)/);
    return parts.map((part, index) => {
      if (part.startsWith("#")) {
        return (
          <span key={index} className="text-[#4285F4] hover:underline cursor-pointer font-medium">
            {part}
          </span>
        );
      }
      if (part.startsWith("@")) {
        return (
          <span key={index} className="text-[#34a853] hover:underline cursor-pointer font-medium">
            {part}
          </span>
        );
      }
      if (part === "Hermes" || part === "CreatorPlaybooks") {
        return (
          <span key={index} className="font-semibold text-[#111111] dark:text-white">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === "media") return post.media_url !== null;
    if (filter === "agents") return post.content.toLowerCase().includes("agent") || post.content.toLowerCase().includes("hermes");
    return true;
  });

  return (
    <div className="px-6 pb-20 pt-28">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12">
          <p className="editorial-kicker mb-3 text-[#6b7280]">Build in Public</p>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <TextAnimate
                as="h1"
                by="word"
                animation="blurInUp"
                className="text-uplift mb-3 text-4xl font-bold tracking-tight text-[#111111] dark:text-white"
              >
                X.com Feed &amp; Build Log
              </TextAnimate>
              <p className="max-w-xl text-base text-[#4b5563] dark:text-[#9ca3af]">
                Follow live updates, terminal recordings, and system architecture updates directly from my social log.
              </p>
            </div>
            <div>
              <a
                href="https://x.com/nealfraziertech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#111111] hover:bg-black/80 text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <Twitter className="h-4 w-4" />
                Follow on X
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </header>

        {/* Filter Navigation */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-black/10 pb-4">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition-all border",
              filter === "all"
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-transparent text-[#4b5563] border-black/10 hover:border-black/20"
            )}
          >
            All Updates
          </button>
          <button
            onClick={() => setFilter("media")}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition-all border flex items-center gap-1.5",
              filter === "media"
                ? "bg-[#4285F4] text-white border-[#4285F4]"
                : "bg-transparent text-[#4b5563] border-black/10 hover:border-black/20"
            )}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            Media &amp; Mockups
          </button>
          <button
            onClick={() => setFilter("agents")}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition-all border flex items-center gap-1.5",
              filter === "agents"
                ? "bg-[#34a853] text-white border-[#34a853]"
                : "bg-transparent text-[#4b5563] border-black/10 hover:border-black/20"
            )}
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI &amp; Agents
          </button>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <BlurFade inView>
              <div className="text-center py-12 text-[#6b7280] font-mono text-sm border border-dashed border-black/10 rounded-2xl">
                No matching posts found.
              </div>
            </BlurFade>
          ) : (
            filteredPosts.map((post, i) => (
              <article key={post.id}>
                <BlurFade inView delay={i * 0.05}>
                  <MagicCard className="p-6 md:p-8">
                    {/* User Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="/logo-white-bg.webp"
                          alt="Neal Frazier avatar logo"
                          className="h-10 w-10 rounded-full border border-black/10 object-cover"
                          loading="lazy"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-[#111111] dark:text-white leading-tight">Neal Frazier</span>
                            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#4285F4] text-white p-0.5">
                              <CheckCircleFill />
                            </span>
                          </div>
                          <div className="text-xs text-[#6b7280] leading-none mt-0.5">@nealfraziertech</div>
                        </div>
                      </div>
                      <time className="text-xs font-mono text-[#9ca3af]">{post.date}</time>
                    </div>

                    {/* Post Content */}
                    <p className="text-base leading-relaxed text-[#374151] dark:text-[#d1d5db] mb-4 whitespace-pre-wrap">
                      {renderContent(post.content)}
                    </p>

                    {/* Media Attachment */}
                    {post.media_url && (
                      <div className="mb-5 overflow-hidden rounded-2xl border border-black/10 bg-black max-h-[380px] flex items-center justify-center group relative">
                        <img
                          src={post.media_url}
                          alt="Feed visual attachment"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-4 text-[#6b7280] max-w-md">
                      <button className="flex items-center gap-2 group hover:text-[#4285f4] transition-colors cursor-pointer text-xs font-mono">
                        <span className="p-2 rounded-full group-hover:bg-[#4285f4]/8 transition-colors">
                          <MessageCircle size={15} />
                        </span>
                        <span>0</span>
                      </button>
                      <button className="flex items-center gap-2 group hover:text-[#34a853] transition-colors cursor-pointer text-xs font-mono">
                        <span className="p-2 rounded-full group-hover:bg-[#34a853]/8 transition-colors">
                          <Repeat size={15} />
                        </span>
                        <span>{post.retweets}</span>
                      </button>
                      <button className="flex items-center gap-2 group hover:text-[#ea4335] transition-colors cursor-pointer text-xs font-mono">
                        <span className="p-2 rounded-full group-hover:bg-[#ea4335]/8 transition-colors">
                          <Heart size={15} />
                        </span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 group hover:text-black dark:hover:text-white transition-colors cursor-pointer text-xs font-mono">
                        <span className="p-2 rounded-full group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors">
                          <Share2 size={15} />
                        </span>
                      </button>
                    </div>
                  </MagicCard>
                </BlurFade>
              </article>
            ))
          )}
        </div>

        {/* CTA Footer */}
        <BlurFade inView className="mt-12">
          <MagicCard className="p-8 text-center bg-gradient-to-tr from-black/[0.02] to-transparent">
            <h2 className="text-uplift mb-3 text-2xl font-bold text-[#111111] dark:text-white">
              Following my build logs?
            </h2>
            <p className="mb-6 max-w-md mx-auto text-sm text-[#4b5563] dark:text-[#9ca3af]">
              I build custom systems, AI lead pipelines, and web dashboards for Hampton Roads businesses. Reach out to collaborate or consult.
            </p>
            <div className="flex justify-center">
              <Link
                to="/contact?context=Collaborating%20on%20AI%20systems"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:bg-black/5"
              >
                Let&rsquo;s Connect
              </Link>
            </div>
          </MagicCard>
        </BlurFade>
      </div>
    </div>
  );
}

// Inline Blue Verified Badge for X feed aesthetics
function CheckCircleFill() {
  return (
    <svg viewBox="0 0 24 24" aria-label="Verified account" className="h-full w-full fill-current text-white">
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.94.1-1.348.27C14.825 2.515 13.512 1.5 12 1.5s-2.825 1.015-3.422 2.28c-.408-.17-.868-.27-1.348-.27-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .94-.1 1.348-.27.597 1.265 1.91 2.28 3.422 2.28s2.825-1.015 3.422-2.28c.408.17.868.27 1.348.27 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.72 4.28L6.48 13.48l1.414-1.414 1.886 1.88 5.714-5.71 1.414 1.414-7.128 7.12z" />
    </svg>
  );
}
