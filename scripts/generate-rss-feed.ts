import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type DataFile = {
  bliki_metadata: {
    title: string;
    description: string;
    base_url: string;
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
    }>;
  };
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

function xmlEscape(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function main() {
  const dataPath = path.join(repoRoot, "src", "data.json");
  const publicDir = path.join(repoRoot, "public");
  const dataRaw = await readFile(dataPath, "utf8");
  const data = JSON.parse(dataRaw) as DataFile;
  const base = data.bliki_metadata.base_url.replace(/\/+$/, "");

  const posts = [...data.blog_stories.posts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const updated = posts[0]
    ? new Date(posts[0].date).toISOString()
    : new Date().toISOString();

  const lines: string[] = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    `  <channel>`,
    `    <title>${xmlEscape(data.bliki_metadata.title)} — Stories</title>`,
    `    <link>${base}/blog</link>`,
    `    <description>${xmlEscape(data.blog_stories.description)}</description>`,
    `    <language>en-us</language>`,
    `    <lastBuildDate>${updated}</lastBuildDate>`,
    `    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />`,
  ];

  for (const post of posts) {
    const url = `${base}/blog/${post.id}`;
    lines.push(
      `    <item>`,
      `      <title>${xmlEscape(post.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <description>${xmlEscape(post.content_summary)}</description>`,
      `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
      `      <category>${xmlEscape(post.tags.join(", "))}</category>`,
      `    </item>`,
    );
  }

  lines.push(`  </channel>`, `</rss>`);

  await mkdir(publicDir, { recursive: true });
  await writeFile(path.join(publicDir, "feed.xml"), lines.join("\n") + "\n", "utf8");
  console.log(`Generated feed.xml (${posts.length} posts)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});