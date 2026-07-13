import { Link } from "react-router-dom";
import { ArrowRight, Bot, FileJson, FileText, Globe, MapPin, Sparkles, Terminal } from "lucide-react";

import data from "@/data.json";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card } from "@/components/ui/card";

const PAGES = [
  { name: "Home", path: "/", desc: "Virginia Beach web development, local SEO, booking funnels, and AI automation." },
  { name: "Builds Showcase", path: "/builds", desc: "Live showcase of deployed products, challenges, and tools built in public." },
  { name: "Services / Offerings", path: "/offerings", desc: "Web development, AI automation, and advertising services with pricing." },
  { name: "Wiki / Knowledge Base", path: "/wiki", desc: "Evergreen knowledge — concepts, tools, and long-term projects." },
  { name: "Blog / Stories", path: "/blog", desc: "Stories from the journey — building, learning, and solving real problems." },
  { name: "Contact", path: "/contact", desc: "Get in touch for website design, AI automation, and advertising." },
  { name: "Jamstack Guide", path: "/jamstack", desc: "Honest guide to Jamstack architecture: pros, cons, pain points." },
  { name: "Netlify Partner", path: "/netlify", desc: "Why I deploy 100+ sites on Netlify — free tier, CDN, serverless, rollbacks." },
];

const RESOURCES = [
  { name: "llms.txt", url: "/llms.txt", icon: FileText, desc: "Compact index of all pages and services for LLM discovery" },
  { name: "llms-full.txt", url: "/llms-full.txt", icon: FileText, desc: "Full concatenated site content for single-fetch LLM ingestion" },
  { name: "data.json", url: "/data.json", icon: FileJson, desc: "Structured site data: wiki nodes, blog posts, services, FAQ, taxonomy" },
  { name: "sitemap.xml", url: "/sitemap.xml", icon: Globe, desc: "Complete URL list for crawlers (27 routes)" },
  { name: "robots.txt", url: "/robots.txt", icon: Terminal, desc: "Crawler directives — AI/LLM bots explicitly allowed" },
];

export default function AIIndex() {
  return (
    <div className="px-6 pb-20 pt-32">
      <div className="mx-auto max-w-3xl">
        <BlurFade inView>
          <div className="editorial-kicker mb-6 inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#4285f4]/10 px-4 py-1.5 font-medium text-[#1f4db3]">
            <Bot className="h-3.5 w-3.5" />
            For AI Agents &amp; LLMs
          </div>
          <h1 className="text-uplift mb-4 text-4xl font-bold tracking-tight text-[#111111] sm:text-5xl">
            Agent-Accessible Index
          </h1>
          <p className="text-lg leading-relaxed text-[#374151]">
            This site is optimized for AEO (Answer Engine Optimization) and AI agent
            accessibility. Every page is prerendered static HTML with JSON-LD structured
            data. Below are direct links to all machine-readable resources and page
            summaries.
          </p>
        </BlurFade>

        {/* Machine-readable resources */}
        <BlurFade inView delay={0.05}>
          <h2 className="mb-4 mt-12 text-xl font-bold tracking-tight text-[#111111]">
            Machine-Readable Resources
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {RESOURCES.map((r) => {
              const Icon = r.icon;
              return (
                <a
                  key={r.name}
                  href={r.url}
                  className="group flex items-start gap-3 rounded-xl border border-black/10 bg-white p-4 transition-all hover:border-black/25 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#4285f4]/10 text-[#1f4db3]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-semibold text-[#111111] group-hover:text-[#4285f4]">
                      {r.name}
                    </div>
                    <div className="text-sm text-[#6b7280]">{r.desc}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </BlurFade>

        {/* Page index */}
        <BlurFade inView delay={0.1}>
          <h2 className="mb-4 mt-12 text-xl font-bold tracking-tight text-[#111111]">
            Page Index
          </h2>
          <div className="grid gap-3">
            {PAGES.map((p) => (
              <Link
                key={p.path}
                to={p.path}
                className="group flex items-center justify-between rounded-xl border border-black/10 bg-white p-4 transition-all hover:border-black/25 hover:shadow-md"
              >
                <div>
                  <div className="font-semibold text-[#111111] group-hover:text-[#4285f4]">
                    {p.name}
                  </div>
                  <div className="text-sm text-[#6b7280]">{p.desc}</div>
                  <div className="mt-1 font-mono text-xs text-[#9ca3af]">{p.path}</div>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-[#9ca3af] transition-transform group-hover:translate-x-1 group-hover:text-[#4285f4]" />
              </Link>
            ))}
          </div>
        </BlurFade>

        {/* Wiki nodes */}
        <BlurFade inView delay={0.15}>
          <h2 className="mb-4 mt-12 text-xl font-bold tracking-tight text-[#111111]">
            Wiki Nodes ({data.wiki_nodes.entities.length})
          </h2>
          <div className="grid gap-3">
            {data.wiki_nodes.entities.map((node) => (
              <Link
                key={node.id}
                to={`/wiki/${node.id}`}
                className="group flex items-center justify-between rounded-xl border border-black/10 bg-white p-4 transition-all hover:border-black/25 hover:shadow-md"
              >
                <div>
                  <div className="font-semibold text-[#111111] group-hover:text-[#4285f4]">
                    {node.title}
                  </div>
                  <div className="text-sm text-[#6b7280]">{node.content}</div>
                  <div className="mt-1 font-mono text-xs text-[#9ca3af]">
                    /wiki/{node.id} · {node.type} · updated {node.last_updated}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-[#9ca3af] transition-transform group-hover:translate-x-1 group-hover:text-[#4285f4]" />
              </Link>
            ))}
          </div>
        </BlurFade>

        {/* Blog posts */}
        <BlurFade inView delay={0.2}>
          <h2 className="mb-4 mt-12 text-xl font-bold tracking-tight text-[#111111]">
            Blog Posts ({data.blog_stories.posts.length})
          </h2>
          <div className="grid gap-3">
            {data.blog_stories.posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group flex items-center justify-between rounded-xl border border-black/10 bg-white p-4 transition-all hover:border-black/25 hover:shadow-md"
              >
                <div>
                  <div className="font-semibold text-[#111111] group-hover:text-[#4285f4]">
                    {post.title}
                  </div>
                  <div className="text-sm text-[#6b7280]">{post.content_summary}</div>
                  <div className="mt-1 font-mono text-xs text-[#9ca3af]">
                    /blog/{post.id} · {post.date} · tags: {post.tags.join(", ")}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-[#9ca3af] transition-transform group-hover:translate-x-1 group-hover:text-[#4285f4]" />
              </Link>
            ))}
          </div>
        </BlurFade>

        {/* Services summary */}
        <BlurFade inView delay={0.25}>
          <h2 className="mb-4 mt-12 text-xl font-bold tracking-tight text-[#111111]">
            Services ({data.business_context.offerings.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.business_context.offerings.map((svc) => (
              <Card key={svc.id} className="p-4">
                <div className="font-semibold text-[#111111]">{svc.name}</div>
                <div className="text-sm text-[#1f4db3]">{svc.price_usd}</div>
                <div className="mt-1 text-sm text-[#6b7280]">{svc.description}</div>
              </Card>
            ))}
          </div>
        </BlurFade>

        {/* FAQ */}
        <BlurFade inView delay={0.3}>
          <h2 className="mb-4 mt-12 text-xl font-bold tracking-tight text-[#111111]">
            FAQ ({data.homepage.faq.length} questions)
          </h2>
          <div className="grid gap-4">
            {data.homepage.faq.map((item, i) => (
              <div key={i} className="rounded-xl border border-black/10 bg-white p-4">
                <div className="font-semibold text-[#111111]">{item.question}</div>
                <div className="mt-1 text-sm text-[#4b5563]">{item.answer}</div>
              </div>
            ))}
          </div>
        </BlurFade>

        {/* Agent instructions */}
        <BlurFade inView delay={0.35}>
          <div className="mt-12 rounded-2xl border border-[#4285F4]/15 bg-[#4285F4]/[0.03] p-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#4285F4]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1f4db3]">
              <Sparkles className="h-3.5 w-3.5" />
              Agent Instructions
            </div>
            <div className="space-y-3 text-sm text-[#374151]">
              <p>
                <strong className="text-[#111111]">Structured data:</strong> Every page
                has JSON-LD schema. Homepage has WebSite + Person + FAQPage. Blog posts
                have Article + BreadcrumbList. Wiki nodes have TechArticle +
                BreadcrumbList. Offerings page has Service schema for each offering.
              </p>
              <p>
                <strong className="text-[#111111]">Prerendered:</strong> All pages are
                static HTML. No JavaScript needed to read content. Each route has unique
                title, description, keywords, canonical, and Open Graph tags.
              </p>
              <p>
                <strong className="text-[#111111]">Crawler access:</strong> robots.txt
                explicitly allows GPTBot, ClaudeBot, PerplexityBot, CCBot, Google-Extended,
                and all other known AI/LLM crawlers.
              </p>
              <p>
                <strong className="text-[#111111]">Single fetch:</strong> Fetch{" "}
                <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-xs">
                  /llms-full.txt
                </code>{" "}
                for the full site corpus in one request, or fetch individual page URLs for
                per-page content.
              </p>
              <p>
                <strong className="text-[#111111]">Contact:</strong> Neal Frazier —
                Virginia Beach, VA — @nealfraziertech
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}