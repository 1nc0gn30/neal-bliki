import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import data from "@/data.json";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Highlighter } from "@/components/magicui/highlighter";
import { MagicCard } from "@/components/magicui/magic-card";
import { GeneratedPlaceholderImage } from "@/components/GeneratedPlaceholderImage";
import { ReadingProgress } from "@/components/ReadingProgress";

export default function BlogPost() {
  const { id } = useParams();
  const post = data.blog_stories.posts.find((p) => p.id === id);

  if (!post) {
    return <div className="px-6 pt-28 pb-20 text-center text-[#4b5563]">Post not found.</div>;
  }

  const topic = data.taxonomy.topics.find((t) => t.id === post.topic_id);
  const contentBlocks =
    "content_full" in post && Array.isArray(post.content_full)
      ? post.content_full
      : [post.content_summary];
  const painPointLine = contentBlocks.find((line) => /^Pain point:/i.test(line.trim()));
  const useCaseLine = contentBlocks.find((line) => /^Use case:/i.test(line.trim()));
  const solutionLine = contentBlocks.find((line) => /^Solution:/i.test(line.trim()));

  const painPointRecap = painPointLine
    ? painPointLine.replace(/^Pain point:\s*/i, "").trim()
    : "Business owners often publish content without connecting it to a clear conversion path, so traffic does not turn into inquiries.";

  const useCaseRecap = useCaseLine
    ? useCaseLine.replace(/^Use case:\s*/i, "").trim()
    : "A practical implementation opportunity exists, but the current page flow does not clearly guide visitors toward action.";

  const solutionRecap = solutionLine
    ? solutionLine.replace(/^Solution:\s*/i, "").trim()
    : "Pair story-driven content with direct offer framing, internal links to service pages, and a consistent contact CTA near the decision moment.";

  return (
    <div className="px-6 pb-20 pt-28">
      <ReadingProgress />
      <div className="mx-auto max-w-3xl">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#6b7280] transition-colors hover:text-[#4285f4]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Stories
        </Link>

        <BlurFade inView>
          <header className="mb-10 border-b border-black/10 pb-10">
            <div className="mb-4 flex items-center gap-4 text-sm">
              <time className="flex items-center gap-2 font-medium text-[#4285f4]">
                <Calendar className="h-4 w-4" /> {post.date}
              </time>
              {topic && <span className="text-[#6b7280]">{topic.name}</span>}
            </div>

            <h1 className="text-uplift mb-6 text-4xl leading-tight font-bold tracking-tight text-[#111111] md:text-5xl">
              <Highlighter color="rgba(251,188,5,0.35)">{post.title}</Highlighter>
            </h1>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#374151]">
                  {tag}
                </span>
              ))}
            </div>
          </header>
        </BlurFade>

        <BlurFade inView delay={0.06}>
          <MagicCard className="p-8 md:p-10">
            <div className="mb-6 rounded-2xl border border-black/10 bg-black/[0.02] p-5">
              <p className="editorial-kicker mb-2 text-[#6b7280]">Reader Outcome</p>
              <p className="text-[#374151]">
                By the end of this story you should be able to identify the bottleneck, map a practical fix, and ship
                one high-impact update that moves inquiries forward.
              </p>
            </div>
            {contentBlocks.map((block, index) => {
              const line = block.trim();
              if (line.startsWith("[IMAGE:") && line.endsWith("]")) {
                const descriptor = line
                  .replace("[IMAGE:", "")
                  .replace("]", "")
                  .trim();
                return (
                  <div key={`${post.id}-image-${index}`}>
                    <GeneratedPlaceholderImage
                      title={post.title}
                      kind="story"
                      descriptor={descriptor}
                      localSrc={`/generated/placeholders/story-${post.id}-${index}.webp`}
                    />
                  </div>
                );
              }

              return (
                <p
                  key={`${post.id}-text-${index}`}
                  className={`leading-relaxed text-[#374151] ${index === 0 ? "mb-4 text-xl marker-green" : "mt-5 text-lg"}`}
                >
                  {line}
                </p>
              );
            })}
          </MagicCard>
        </BlurFade>

        {post.related_wiki_nodes.length > 0 && (
          <div className="mt-10 border-t border-black/10 pt-10">
            <h2 className="editorial-kicker mb-4 flex items-center gap-2 text-[#6b7280]">
              <BookOpen className="h-4 w-4" /> Related Knowledge
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {post.related_wiki_nodes.map((nodeId, i) => {
                const node = data.wiki_nodes.entities.find((n) => n.id === nodeId);
                if (!node) return null;

                return (
                  <div key={nodeId}>
                    <BlurFade inView delay={i * 0.05}>
                      <Link to={`/wiki/${nodeId}`} className="group block">
                        <MagicCard className="p-5">
                          <div className="mb-1 text-xs font-medium text-[#6b7280]">{node.type}</div>
                          <div className="font-medium text-[#111111] transition-colors group-hover:text-[#4285f4]">
                            {node.title}
                          </div>
                        </MagicCard>
                      </Link>
                    </BlurFade>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <BlurFade inView className="mt-10 border-t border-black/10 pt-10">
          <MagicCard className="p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/logo-neal-avatar-transparent-bg.webp"
                alt="Neal Frazier avatar"
                className="h-10 w-10 rounded-full border border-black/10 object-cover"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold text-[#111111]">Need this result for your business?</p>
                <p className="text-xs text-[#6b7280]">I can help you implement it quickly.</p>
              </div>
            </div>
            <h2 className="text-uplift mb-3 text-2xl font-bold text-[#111111]">Pain Point → Solution Recap</h2>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#EA4335]">Pain Point</p>
            <p className="mb-4 text-[#4b5563]">{painPointRecap}</p>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#4285F4]">Use Case</p>
            <p className="mb-4 text-[#4b5563]">{useCaseRecap}</p>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#34A853]">Solution</p>
            <p className="mb-5 text-[#4b5563]">{solutionRecap}</p>
            <Link
              to={`/contact?context=${encodeURIComponent(`Help me apply the approach from ${post.title}`)}`}
              className="inline-flex items-center rounded-full border border-[#4285F4]/30 bg-[#4285F4]/8 px-4 py-2 text-sm font-medium text-[#111111] hover:bg-[#4285F4]/14"
            >
              Contact Neal About This Story
            </Link>
          </MagicCard>
        </BlurFade>
      </div>
    </div>
  );
}
