import { ArrowLeft, BookOpen, Calendar, Hash, Link as LinkIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import data from "@/data.json";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Highlighter } from "@/components/magicui/highlighter";
import { MagicCard } from "@/components/magicui/magic-card";
import { GeneratedPlaceholderImage } from "@/components/GeneratedPlaceholderImage";
import { ReadingProgress } from "@/components/ReadingProgress";

export default function WikiNode() {
  const { id } = useParams();
  const node = data.wiki_nodes.entities.find((n) => n.id === id);

  if (!node) {
    return <div className="px-6 pt-28 pb-20 text-center text-[#4b5563]">Node not found.</div>;
  }

  const topic = data.taxonomy.topics.find((t) => t.id === node.topic_id);
  const relatedPosts = data.blog_stories.posts.filter((p) => p.related_wiki_nodes.includes(node.id));
  const contentBlocks =
    "content_full" in node && Array.isArray(node.content_full) ? node.content_full : [node.content];

  return (
    <div className="px-6 pb-20 pt-28">
      <ReadingProgress />
      <div className="mx-auto max-w-3xl">
        <Link
          to="/wiki"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#6b7280] transition-colors hover:text-[#4285f4]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Wiki
        </Link>

        <BlurFade inView>
          <header className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-[#4285F4]/12 px-2.5 py-1 text-xs font-medium text-[#4285F4]">
                {node.type}
              </span>
              {topic && (
                <span className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EA4335]" />
                  {topic.name}
                </span>
              )}
            </div>
            <h1 className="text-uplift mb-4 text-4xl font-bold tracking-tight text-[#111111]">{node.title}</h1>
            <div className="flex items-center gap-4 text-sm text-[#6b7280]">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {node.last_updated}
              </span>
            </div>
          </header>
        </BlurFade>

        <BlurFade inView delay={0.06}>
          <MagicCard className="p-8 md:p-10">
            <div className="mb-6 rounded-2xl border border-black/10 bg-black/[0.02] p-5">
              <p className="editorial-kicker mb-2 text-[#6b7280]">How To Use This Node</p>
              <p className="text-[#374151]">
                Read the problem first, pull one tactical action from the explanation, and apply it to your current
                page before moving on to the next node.
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
                  <div key={`${node.id}-image-${index}`}>
                    <GeneratedPlaceholderImage
                      title={node.title}
                      kind="knowledge"
                      descriptor={descriptor}
                      localSrc={`/generated/placeholders/knowledge-${node.id}-${index}.webp`}
                    />
                  </div>
                );
              }

              return (
                <p
                  key={`${node.id}-text-${index}`}
                  className={`leading-relaxed text-[#374151] ${index === 0 ? "mb-4 text-lg marker-yellow" : "mt-5 text-base"}`}
                >
                  {line}
                </p>
              );
            })}
          </MagicCard>
        </BlurFade>

        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/10 pt-10 md:grid-cols-2">
          <BlurFade inView>
            <div>
              <h2 className="editorial-kicker mb-4 flex items-center gap-2 text-[#6b7280]">
                <Hash className="h-4 w-4" /> Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {node.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#374151]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.05}>
            <div>
              <h2 className="editorial-kicker mb-4 flex items-center gap-2 text-[#6b7280]">
                <LinkIcon className="h-4 w-4" /> Linked Nodes
              </h2>
              <ul className="space-y-2">
                {node.linked_nodes.map((linkId) => {
                  const linkedNode = data.wiki_nodes.entities.find((n) => n.id === linkId);
                  if (!linkedNode) return null;

                  return (
                    <li key={linkId}>
                      <Link
                        to={`/wiki/${linkId}`}
                        className="inline-flex items-center gap-2 text-sm text-[#4285f4] hover:underline"
                      >
                        <BookOpen className="h-3.5 w-3.5" /> {linkedNode.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </BlurFade>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-10 border-t border-black/10 pt-10">
            <h2 className="editorial-kicker mb-4 text-[#6b7280]">Related Stories</h2>
            <div className="grid gap-4">
              {relatedPosts.map((post, i) => (
                <div key={post.id}>
                  <BlurFade inView delay={i * 0.05}>
                    <Link to={`/blog/${post.id}`} className="group block">
                      <MagicCard className="p-5">
                        <time className="text-xs font-medium text-[#6b7280]">{post.date}</time>
                        <div className="mt-1 font-medium text-[#111111] transition-colors group-hover:text-[#EA4335]">
                          <Highlighter color="rgba(251,188,5,0.35)">{post.title}</Highlighter>
                        </div>
                      </MagicCard>
                    </Link>
                  </BlurFade>
                </div>
              ))}
            </div>
          </div>
        )}

        <BlurFade inView className="mt-10 border-t border-black/10 pt-10">
          <MagicCard className="p-6 md:p-8">
            <h2 className="text-uplift mb-3 text-2xl font-bold text-[#111111]">Pain Point → Solution</h2>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#EA4335]">Pain Point</p>
            <p className="mb-4 text-[#4b5563]">
              Most teams know this topic matters, but they ship without a repeatable system, so pages stay unclear and
              conversions stay flat.
            </p>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#34A853]">Solution</p>
            <p className="mb-5 text-[#4b5563]">
              Use this node as a production checklist, then prioritize one actionable update this week and measure the
              result before the next change.
            </p>
            <Link
              to={`/contact?context=${encodeURIComponent(`Help me implement ${node.title}`)}`}
              className="inline-flex items-center rounded-full border border-[#4285F4]/30 bg-[#4285F4]/8 px-4 py-2 text-sm font-medium text-[#111111] hover:bg-[#4285F4]/14"
            >
              Contact Neal About This Topic
            </Link>
          </MagicCard>
        </BlurFade>
      </div>
    </div>
  );
}
