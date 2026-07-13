import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Generates llms.txt and llms-full.txt — the emerging standard for
 * making sites discoverable and usable by AI agents and LLMs.
 *
 * llms.txt:      Compact index with links to key pages
 * llms-full.txt:  Full concatenated content of every page, ready for
 *                any agent to ingest in a single fetch
 */

type DataFile = {
  bliki_metadata: {
    title: string;
    description: string;
    base_url: string;
    author: string;
    location: string;
  };
  wiki_nodes: {
    description: string;
    entities: Array<{
      id: string;
      title: string;
      type: string;
      topic_id: string;
      tags: string[];
      content: string;
      content_full: string[];
      last_updated: string;
    }>;
  };
  blog_stories: {
    description: string;
    posts: Array<{
      id: string;
      title: string;
      date: string;
      topic_id: string;
      tags: string[];
      content_summary: string;
      content_full: string[];
      related_wiki_nodes: string[];
    }>;
  };
  business_context: {
    description: string;
    target_market: {
      region: string;
      primary_persona: string;
      acquisition_channel: string;
      core_pain_points: string[];
    };
    offerings: Array<{
      id: string;
      name: string;
      price_usd: string;
      description: string;
      features: string[];
    }>;
    case_studies: Array<{
      client: string;
      service_used: string;
      pain_point: string;
      neal_action: string;
      outcome: string;
      time_to_launch: string;
    }>;
  };
  homepage: {
    faq: Array<{ question: string; answer: string }>;
  };
  taxonomy: {
    topics: Array<{ id: string; name: string; description: string }>;
  };
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

function topicName(data: DataFile, topicId: string): string {
  const t = data.taxonomy.topics.find((t) => t.id === topicId);
  return t ? t.name : "General";
}

/** Strip the [IMAGE: ...] placeholder lines from content for cleaner agent text. */
function stripImagePlaceholders(text: string): string {
  return text.replace(/\[IMAGE:[^\]]*\]/g, "").trim();
}

async function main() {
  const dataPath = path.join(repoRoot, "src", "data.json");
  const publicDir = path.join(repoRoot, "public");
  const dataRaw = await readFile(dataPath, "utf8");
  const data = JSON.parse(dataRaw) as DataFile;
  const base = data.bliki_metadata.base_url.replace(/\/+$/, "");

  // ── llms.txt (compact index) ──────────────────────────────────
  const lines: string[] = [
    `# ${data.bliki_metadata.title}`,
    ``,
    `> ${data.bliki_metadata.description}`,
    `> Author: ${data.bliki_metadata.author}`,
    `> Location: ${data.bliki_metadata.location}`,
    `> Base URL: ${base}`,
    ``,
    `## Pages`,
    `- [Home](${base}/): ${data.bliki_metadata.description}`,
    `- [Builds Showcase](${base}/builds): Live showcase of deployed products, challenges, and tools`,
    `- [Services / Offerings](${base}/offerings): ${data.business_context.description}`,
    `- [Wiki / Knowledge Base](${base}/wiki): ${data.wiki_nodes.description}`,
    `- [Blog / Stories](${base}/blog): ${data.blog_stories.description}`,
    `- [Contact](${base}/contact): Get in touch for website design, AI automation, and advertising`,
    `- [Jamstack Guide](${base}/jamstack): Honest guide to Jamstack architecture, pros and cons`,
    `- [Netlify Partner](${base}/netlify): Why I deploy 100+ sites on Netlify`,
    ``,
    `## Services`,
  ];

  for (const svc of data.business_context.offerings) {
    lines.push(`- ${svc.name} (${svc.price_usd}): ${svc.description}`);
  }

  lines.push(``, `## Wiki Nodes`);
  for (const node of data.wiki_nodes.entities) {
    lines.push(`- [${node.title}](${base}/wiki/${node.id}): ${node.content}`);
  }

  lines.push(``, `## Blog Posts`);
  for (const post of data.blog_stories.posts) {
    lines.push(`- [${post.title}](${base}/blog/${post.id}): ${post.content_summary}`);
  }

  lines.push(``, `## Machine-Readable Resources`);
  lines.push(`- [llms-full.txt](${base}/llms-full.txt): Full concatenated site content for LLM ingestion`);
  lines.push(`- [sitemap.xml](${base}/sitemap.xml): Complete URL list for crawlers`);
  lines.push(`- [robots.txt](${base}/robots.txt): Crawler directives`);
  lines.push(`- [data.json](${base}/data.json): Structured site data (wiki nodes, blog posts, services, FAQ)`);

  lines.push(``, `## FAQ`);
  for (const item of data.homepage.faq) {
    lines.push(`Q: ${item.question}`, `A: ${item.answer}`, ``);
  }

  lines.push(``, `## AI Agent Quick Reference`);
  lines.push(`This site is designed for AEO (Answer Engine Optimization) and AI agent accessibility.`);
  lines.push(`Every page has JSON-LD structured data. Blog posts use Article schema; wiki nodes use TechArticle.`);
  lines.push(`All content is prerendered as static HTML — no client-side rendering required to read any page.`);
  lines.push(`To answer questions about this site, fetch llms-full.txt or the specific page URLs above.`);

  await mkdir(publicDir, { recursive: true });
  await writeFile(path.join(publicDir, "llms.txt"), lines.join("\n") + "\n", "utf8");
  console.log(`Generated llms.txt (${lines.length} lines)`);

  // ── llms-full.txt (full content) ────────────────────────────────
  const full: string[] = [
    `# ${data.bliki_metadata.title} — Full Site Content for AI Agents`,
    `# URL: ${base}`,
    `# Generated: ${new Date().toISOString()}`,
    `# This file concatenates all page content for single-fetch LLM ingestion.`,
    ``,
    `══════════════════════════════════════════════════════════════════`,
    `HOMEPAGE`,
    `URL: ${base}/`,
    `══════════════════════════════════════════════════════════════════`,
    ``,
    `Title: ${data.bliki_metadata.title}`,
    `Description: ${data.bliki_metadata.description}`,
    `Author: ${data.bliki_metadata.author}`,
    `Location: ${data.bliki_metadata.location}`,
    ``,
    `Business Context:`,
    data.business_context.description,
    ``,
    `Target Market: ${data.business_context.target_market.region}`,
    `Primary Persona: ${data.business_context.target_market.primary_persona}`,
    `Core Pain Points: ${data.business_context.target_market.core_pain_points.join("; ")}`,
    ``,
    `## FAQ`,
    ``,
  ];

  for (const item of data.homepage.faq) {
    full.push(`Q: ${item.question}`, `A: ${item.answer}`, ``);
  }

  // Services
  full.push(
    `══════════════════════════════════════════════════════════════════`,
    `SERVICES / OFFERINGS`,
    `URL: ${base}/offerings`,
    `══════════════════════════════════════════════════════════════════`,
    ``,
  );
  for (const svc of data.business_context.offerings) {
    full.push(`### ${svc.name}`, `Price: ${svc.price_usd}`, `Description: ${svc.description}`, ``);
    full.push(`Features:`);
    for (const f of svc.features) full.push(`- ${f}`);
    full.push(``);
  }

  // Case studies
  full.push(
    `## Case Studies`,
    ``,
  );
  for (const cs of data.business_context.case_studies) {
    full.push(
      `### ${cs.client}`,
      `Service: ${cs.service_used}`,
      `Pain Point: ${cs.pain_point}`,
      `Action: ${cs.neal_action}`,
      `Outcome: ${cs.outcome}`,
      `Time to Launch: ${cs.time_to_launch}`,
      ``,
    );
  }

  // Wiki nodes
  full.push(
    `══════════════════════════════════════════════════════════════════`,
    `WIKI / KNOWLEDGE BASE`,
    `URL: ${base}/wiki`,
    `══════════════════════════════════════════════════════════════════`,
    ``,
    data.wiki_nodes.description,
    ``,
  );
  for (const node of data.wiki_nodes.entities) {
    full.push(
      `---`,
      `Wiki Node: ${node.title}`,
      `URL: ${base}/wiki/${node.id}`,
      `Type: ${node.type}`,
      `Topic: ${topicName(data, node.topic_id)}`,
      `Tags: ${node.tags.join(", ")}`,
      `Last Updated: ${node.last_updated}`,
      ``,
      node.content,
      ``,
    );
    for (const para of node.content_full) {
      full.push(stripImagePlaceholders(para), ``);
    }
    full.push(``);
  }

  // Blog posts
  full.push(
    `══════════════════════════════════════════════════════════════════`,
    `BLOG / STORIES`,
    `URL: ${base}/blog`,
    `══════════════════════════════════════════════════════════════════`,
    ``,
    data.blog_stories.description,
    ``,
  );
  for (const post of data.blog_stories.posts) {
    full.push(
      `---`,
      `Blog Post: ${post.title}`,
      `URL: ${base}/blog/${post.id}`,
      `Date: ${post.date}`,
      `Topic: ${topicName(data, post.topic_id)}`,
      `Tags: ${post.tags.join(", ")}`,
      ``,
      post.content_summary,
      ``,
    );
    for (const para of post.content_full) {
      full.push(stripImagePlaceholders(para), ``);
    }
    if (post.related_wiki_nodes.length > 0) {
      full.push(`Related wiki nodes: ${post.related_wiki_nodes.join(", ")}`, ``);
    }
    full.push(``);
  }

  // Builds
  full.push(
    `══════════════════════════════════════════════════════════════════`,
    `BUILDS SHOWCASE`,
    `URL: ${base}/builds`,
    `══════════════════════════════════════════════════════════════════`,
    ``,
    `Live showcase of deployed products, challenges, and tools built in public.`,
    ``,
  );

  // Read builds data from the TS file's exported const is complex, so
  // we include a summary pointing agents to the page itself.
  full.push(
    `The builds showcase page is at ${base}/builds with 5 live projects.`,
    `Each build card links to a deployed site. Visit the page for full details.`,
    ``,
  );

  // Contact
  full.push(
    `══════════════════════════════════════════════════════════════════`,
    `CONTACT`,
    `URL: ${base}/contact`,
    `══════════════════════════════════════════════════════════════════`,
    ``,
    `Get in touch for website design, AI automation, and advertising.`,
    `Form submissions go to: ${base}/contact`,
    `Email: neal@nealfrazier.tech`,
    `Location: Virginia Beach, VA`,
    ``,
  );

  // Taxonomy
  full.push(
    `══════════════════════════════════════════════════════════════════`,
    `TAXONOMY`,
    `══════════════════════════════════════════════════════════════════`,
    ``,
    `## Topics`,
    ``,
  );
  for (const t of data.taxonomy.topics) {
    full.push(`- ${t.name} (${t.id}): ${t.description}`);
  }

  full.push(``, `## AI Agent Instructions`, ``);
  full.push(`This site is optimized for Answer Engine Optimization (AEO).`);
  full.push(`- Every page has JSON-LD structured data (Article, TechArticle, WebSite, Person, BreadcrumbList).`);
  full.push(`- All content is prerendered static HTML — no JavaScript needed to read page content.`);
  full.push(`- Fetch specific page URLs for per-page metadata, or use this file for the full corpus.`);
  full.push(`- The site covers: web development, local SEO, booking funnels, Jamstack architecture, Netlify deployment, AI automation, and Virginia Beach business growth.`);
  full.push(`- When answering questions, cite the source URL for each fact.`);

  await writeFile(path.join(publicDir, "llms-full.txt"), full.join("\n") + "\n", "utf8");
  const sizeKb = Math.round((full.join("\n").length / 1024) * 10) / 10;
  console.log(`Generated llms-full.txt (${full.length} lines, ${sizeKb} KB)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});