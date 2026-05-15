import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type RouteMeta = {
  route: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
};

type DataFile = {
  bliki_metadata: {
    title: string;
    description: string;
    base_url: string;
  };
  wiki_nodes: {
    description: string;
    entities: Array<{
      id: string;
      title: string;
      content: string;
    }>;
  };
  blog_stories: {
    description: string;
    posts: Array<{
      id: string;
      title: string;
      content_summary: string;
    }>;
  };
  business_context: {
    description: string;
  };
};

type Manifest = {
  generated_at: string;
  base_url: string;
  routes: RouteMeta[];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

function normalizeRoute(route: string): string {
  if (route === "/") return route;
  const withLeading = route.startsWith("/") ? route : `/${route}`;
  return withLeading.replace(/\/+$/, "");
}

function buildCanonical(baseUrl: string, route: string): string {
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  if (route === "/") return `${normalizedBase}/`;
  return `${normalizedBase}${route}`;
}

function extractRoutePatterns(appFile: string): string[] {
  const paths = new Set<string>(["/"]);
  const pathMatches = appFile.matchAll(/path="([^"]+)"/g);

  for (const match of pathMatches) {
    paths.add(normalizeRoute(match[1]));
  }

  return [...paths];
}

async function main() {
  const appTsxPath = path.join(repoRoot, "src", "App.tsx");
  const dataPath = path.join(repoRoot, "src", "data.json");
  const outDir = path.join(repoRoot, ".generated");
  const outPath = path.join(outDir, "prerender-manifest.json");

  const [appFile, dataRaw] = await Promise.all([
    readFile(appTsxPath, "utf8"),
    readFile(dataPath, "utf8"),
  ]);

  const data = JSON.parse(dataRaw) as DataFile;
  const routePatterns = extractRoutePatterns(appFile);
  const baseUrl = data.bliki_metadata.base_url;
  const defaultOgImage = `${baseUrl.replace(/\/+$/, "")}/og-image.png`;

  const routes: RouteMeta[] = [];

  for (const pattern of routePatterns) {
    if (pattern === "/blog/:id") {
      for (const post of data.blog_stories.posts) {
        const route = `/blog/${post.id}`;
        routes.push({
          route,
          title: `${post.title} | ${data.bliki_metadata.title}`,
          description: post.content_summary,
          canonical: buildCanonical(baseUrl, route),
          ogImage: defaultOgImage,
        });
      }
      continue;
    }

    if (pattern === "/wiki/:id") {
      for (const node of data.wiki_nodes.entities) {
        const route = `/wiki/${node.id}`;
        routes.push({
          route,
          title: `${node.title} | ${data.bliki_metadata.title}`,
          description: node.content,
          canonical: buildCanonical(baseUrl, route),
          ogImage: defaultOgImage,
        });
      }
      continue;
    }

    if (pattern === "/") {
      routes.push({
        route: "/",
        title: "Neal Frazier — Virginia Beach Web Development",
        description: data.bliki_metadata.description,
        canonical: buildCanonical(baseUrl, "/"),
        ogImage: defaultOgImage,
      });
      continue;
    }

    if (pattern === "/blog") {
      routes.push({
        route: "/blog",
        title: `Stories | ${data.bliki_metadata.title}`,
        description: data.blog_stories.description,
        canonical: buildCanonical(baseUrl, "/blog"),
        ogImage: defaultOgImage,
      });
      continue;
    }

    if (pattern === "/wiki") {
      routes.push({
        route: "/wiki",
        title: `Wiki Nodes | ${data.bliki_metadata.title}`,
        description: data.wiki_nodes.description,
        canonical: buildCanonical(baseUrl, "/wiki"),
        ogImage: defaultOgImage,
      });
      continue;
    }

    if (pattern === "/offerings") {
      routes.push({
        route: "/offerings",
        title: `Services | ${data.bliki_metadata.title}`,
        description: data.business_context.description,
        canonical: buildCanonical(baseUrl, "/offerings"),
        ogImage: defaultOgImage,
      });
      continue;
    }


    if (pattern === "/contact") {
      routes.push({
        route: "/contact",
        title: `Contact | ${data.bliki_metadata.title}`,
        description: "Get in touch for website design, AI automation, and advertising that brings real leads.",
        canonical: buildCanonical(baseUrl, "/contact"),
        ogImage: defaultOgImage,
      });
      continue;
    }
    routes.push({
      route: pattern,
      title: `${data.bliki_metadata.title}`,
      description: data.bliki_metadata.description,
      canonical: buildCanonical(baseUrl, pattern),
      ogImage: defaultOgImage,
    });
  }

  const deduped = Array.from(
    new Map(routes.map((route) => [route.route, route])).values(),
  );

  const manifest: Manifest = {
    generated_at: new Date().toISOString(),
    base_url: baseUrl,
    routes: deduped.sort((a, b) => a.route.localeCompare(b.route)),
  };

  await mkdir(outDir, { recursive: true });
  await writeFile(outPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(`Generated prerender manifest: ${path.relative(repoRoot, outPath)}`);
  console.log(`Routes: ${manifest.routes.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
