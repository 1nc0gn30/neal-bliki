import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type RouteMeta = {
  route: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogImageAlt: string;
  keywords: string;
  /** og:type — "website" for pages, "article" for blog posts and wiki nodes */
  ogType: string;
  /** JSON-LD structured-data blocks to inject into <head> */
  jsonLd: string[];
  /** Optional article metadata for blog posts */
  articlePublishedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
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
      type: string;
      topic_id: string;
      tags: string[];
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
    }>;
  };
  business_context: {
    description: string;
    offerings: Array<{
      id: string;
      name: string;
      price_usd: string;
      description: string;
      features: string[];
    }>;
  };
  homepage: {
    faq: Array<{ question: string; answer: string }>;
  };
  taxonomy: {
    topics: Array<{ id: string; name: string }>;
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

const SITE_NAME = "Neal Frazier | 757 Tech Consultant & Hampton Roads Web Developer";
const AUTHOR = "Neal Frazier";
const TWITTER = "@nealfraziertech";
const DEFAULT_OG_ALT = "Neal Frazier — 757 Tech Consultant & Web Systems Developer";

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

/** Escape a string for safe embedding inside a JSON-LD <script> block. */
function escJsonLd(value: string): string {
  return JSON.stringify(value);
}

function websiteJsonLd(canonical: string, description: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": canonical,
    "description": description,
    "author": { "@type": "Person", "name": AUTHOR, "url": canonical },
    "publisher": { "@type": "Person", "name": AUTHOR, "url": canonical }
  });
}

function breadcrumbJsonLd(canonical: string, name: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": canonical.replace(/\/[^/]*$/, "") || "/" },
      { "@type": "ListItem", "position": 2, "name": name, "item": canonical }
    ]
  });
}

function articleJsonLd(
  canonical: string,
  title: string,
  description: string,
  image: string,
  datePublished: string,
  section: string,
  tags: string[],
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": { "@type": "Person", "name": AUTHOR, "url": "https://www.nealfrazier.tech/" },
    "publisher": {
      "@type": "Person",
      "name": AUTHOR,
      "url": "https://www.nealfrazier.tech/"
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
    "articleSection": section,
    "keywords": tags.join(", "),
    "about": tags.map((t) => ({ "@type": "Thing", "name": t }))
  });
}

function techArticleJsonLd(
  canonical: string,
  title: string,
  description: string,
  image: string,
  dateModified: string,
  tags: string[],
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": title,
    "description": description,
    "image": image,
    "dateModified": dateModified,
    "author": { "@type": "Person", "name": AUTHOR, "url": "https://www.nealfrazier.tech/" },
    "publisher": { "@type": "Person", "name": AUTHOR, "url": "https://www.nealfrazier.tech/" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
    "keywords": tags.join(", "),
    "about": tags.map((t) => ({ "@type": "Thing", "name": t }))
  });
}

function localBusinessJsonLd(baseUrl: string, name: string, description: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Neal Frazier | 757 Tech Consultant & Hampton Roads Web Developer",
    "description": description,
    "url": baseUrl,
    "image": `${baseUrl.replace(/\/+$/, "")}/og-image.png`,
    "priceRange": "$100 - $999+",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Virginia Beach",
      "addressRegion": "VA",
      "postalCode": "23451",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.8529,
      "longitude": -75.9780
    },
    "telephone": "+1-757-550-1490",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://linkedin.com/in/nealfrazier",
      "https://instagram.com/nealfraziertech",
      "https://x.com/nealfraziertech",
      "https://bsky.app/profile/nealfraziertech.bsky.social"
    ],
    "areaServed": [
      { "@type": "City", "name": "Virginia Beach" },
      { "@type": "City", "name": "Norfolk" },
      { "@type": "City", "name": "Chesapeake" },
      { "@type": "City", "name": "Newport News" },
      { "@type": "City", "name": "Hampton" },
      { "@type": "City", "name": "Portsmouth" },
      { "@type": "City", "name": "Suffolk" }
    ],
    "knowsAbout": [
      "Web Development",
      "Local SEO",
      "Answer Engine Optimization (AEO)",
      "AI Automation",
      "IT Systems Architecture",
      "Netlify",
      "Jamstack",
      "Search Engine Optimization",
      "Booking Funnels"
    ]
  });
}

function topicName(data: DataFile, topicId: string): string {
  const topic = data.taxonomy.topics.find((t) => t.id === topicId);
  return topic ? topic.name : "General";
}

function faqPageJsonLd(faqs: Array<{ question: string; answer: string }>): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  });
}

function serviceJsonLd(
  canonical: string,
  name: string,
  description: string,
  price: string,
  features: string[],
): string {
  // Normalize price — extract numeric value if present
  const priceMatch = price.match(/\$[\d,]+/);
  const offers = priceMatch
    ? {
        "@type": "Offer",
        "price": priceMatch[0].replace(/[$,]/g, ""),
        "priceCurrency": "USD",
        "description": price,
        "url": canonical,
        "availability": "https://schema.org/InStock"
      }
    : undefined;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": { "@type": "Person", "name": AUTHOR, "url": "https://www.nealfrazier.tech/" },
    "areaServed": [
      { "@type": "City", "name": "Virginia Beach" },
      { "@type": "City", "name": "Norfolk" },
      { "@type": "City", "name": "Chesapeake" },
      { "@type": "City", "name": "Newport News" },
      { "@type": "City", "name": "Hampton" },
      { "@type": "City", "name": "Portsmouth" },
      { "@type": "City", "name": "Suffolk" }
    ],
    "url": canonical,
    ...(offers ? { offers } : {}),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "itemListElement": features.map((f) => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Thing", "name": f }
      }))
    }
  });
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
    // --- Blog posts: rich article metadata ---
    if (pattern === "/blog/:id") {
      for (const post of data.blog_stories.posts) {
        const route = `/blog/${post.id}`;
        const canonical = buildCanonical(baseUrl, route);
        const section = topicName(data, post.topic_id);
        const keywords = [post.title, AUTHOR, "blog", section, "757 tech", "Hampton Roads", "Virginia Beach", ...post.tags]
          .join(", ");
        routes.push({
          route,
          title: `${post.title} | Neal Frazier Bliki`,
          description: post.content_summary,
          canonical,
          ogImage: defaultOgImage,
          ogImageAlt: `${post.title} — ${AUTHOR}`,
          keywords,
          ogType: "article",
          articlePublishedTime: post.date,
          articleAuthor: AUTHOR,
          articleSection: section,
          articleTags: post.tags,
          jsonLd: [
            articleJsonLd(
              canonical,
              post.title,
              post.content_summary,
              defaultOgImage,
              post.date,
              section,
              post.tags,
            ),
            breadcrumbJsonLd(canonical, post.title),
          ],
        });
      }
      continue;
    }

    // --- Wiki nodes: TechArticle structured data ---
    if (pattern === "/wiki/:id") {
      for (const node of data.wiki_nodes.entities) {
        const route = `/wiki/${node.id}`;
        const canonical = buildCanonical(baseUrl, route);
        const section = topicName(data, node.topic_id);
        const keywords = [node.title, AUTHOR, "wiki", section, "757 tech consultant", "Hampton Roads IT", ...node.tags]
          .join(", ");
        routes.push({
          route,
          title: `${node.title} | Neal Frazier Bliki`,
          description: node.content,
          canonical,
          ogImage: defaultOgImage,
          ogImageAlt: `${node.title} — ${AUTHOR}`,
          keywords,
          ogType: "article",
          articlePublishedTime: node.last_updated,
          articleAuthor: AUTHOR,
          articleSection: section,
          articleTags: node.tags,
          jsonLd: [
            techArticleJsonLd(
              canonical,
              node.title,
              node.content,
              defaultOgImage,
              node.last_updated,
              node.tags,
            ),
            breadcrumbJsonLd(canonical, node.title),
          ],
        });
      }
      continue;
    }

    // --- Homepage ---
    if (pattern === "/") {
      const canonical = buildCanonical(baseUrl, "/");
      routes.push({
        route: "/",
        title: data.bliki_metadata.title,
        description: data.bliki_metadata.description,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: DEFAULT_OG_ALT,
        keywords: `${AUTHOR}, 757 tech consultant, Hampton Roads web developer, Virginia Beach web design, Norfolk SEO, Chesapeake IT systems, Netlify partner, local SEO, Jamstack, booking funnels, AI automation`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, data.bliki_metadata.description),
          faqPageJsonLd(data.homepage.faq),
          localBusinessJsonLd(baseUrl, AUTHOR, data.bliki_metadata.description),
        ],
      });
      continue;
    }

    // --- Blog index ---
    if (pattern === "/blog") {
      const canonical = buildCanonical(baseUrl, "/blog");
      routes.push({
        route: "/blog",
        title: `Stories & Tech Articles | Neal Frazier Bliki`,
        description: data.blog_stories.description,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `Stories — ${SITE_NAME}`,
        keywords: `${AUTHOR}, blog, stories, web development, local SEO, 757 tech, Hampton Roads, Norfolk, booking funnels, AI automation`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, data.blog_stories.description),
          breadcrumbJsonLd(canonical, "Stories"),
        ],
      });
      continue;
    }

    // --- Wiki index ---
    if (pattern === "/wiki") {
      const canonical = buildCanonical(baseUrl, "/wiki");
      routes.push({
        route: "/wiki",
        title: `Wiki Knowledge Base | Neal Frazier Bliki`,
        description: data.wiki_nodes.description,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `Wiki Nodes — ${SITE_NAME}`,
        keywords: `${AUTHOR}, wiki, knowledge base, web systems, local SEO, Jamstack, 757 tech, Norfolk IT, AI automation, booking funnels`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, data.wiki_nodes.description),
          breadcrumbJsonLd(canonical, "Wiki Nodes"),
        ],
      });
      continue;
    }

    // --- Offerings ---
    if (pattern === "/offerings") {
      const canonical = buildCanonical(baseUrl, "/offerings");
      const desc = data.business_context.description;
      const serviceBlocks = data.business_context.offerings.map((svc) =>
        serviceJsonLd(canonical, svc.name, svc.description, svc.price_usd, svc.features),
      );
      routes.push({
        route: "/offerings",
        title: `Services & Pricing | Neal Frazier Bliki`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `Services — ${SITE_NAME}`,
        keywords: `${AUTHOR}, services, web development, Netlify, Jamstack, AI automation, IT consulting 757, local SEO Virginia Beach, Norfolk web dev`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "Services"),
          ...serviceBlocks,
        ],
      });
      continue;
    }

    // --- Contact ---
    if (pattern === "/contact") {
      const canonical = buildCanonical(baseUrl, "/contact");
      const desc = "Hire Neal Frazier for custom web systems development, local SEO optimization, and AI automation consulting in Virginia Beach, Norfolk, and Chesapeake.";
      routes.push({
        route: "/contact",
        title: `Contact & Hire | Neal Frazier Bliki`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `Contact — ${SITE_NAME}`,
        keywords: `${AUTHOR}, contact, hire, 757 tech consultant, website design Norfolk, AI automation Virginia Beach, IT support Chesapeake`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "Contact"),
        ],
      });
      continue;
    }

    // --- Netlify partner page ---
    if (pattern === "/netlify") {
      const canonical = buildCanonical(baseUrl, "/netlify");
      const desc = "Why I deploy 100+ sites on Netlify and why you should too. Composable static architecture for Hampton Roads businesses.";
      routes.push({
        route: "/netlify",
        title: `Netlify Certified Partner | Neal Frazier Bliki`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `Netlify Certified Partner — ${SITE_NAME}`,
        keywords: `${AUTHOR}, Netlify, certified partner, Jamstack, 757 tech developer, serverless functions, enterprise migration Norfolk`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "Netlify Partner"),
        ],
      });
      continue;
    }

    // --- Jamstack guide ---
    if (pattern === "/jamstack") {
      const canonical = buildCanonical(baseUrl, "/jamstack");
      const desc = "Honest guide to Jamstack architecture: pros, cons, pain points, and why it is the optimal stack for local 757 ranking speed.";
      routes.push({
        route: "/jamstack",
        title: `Jamstack Guide & Performance | Neal Frazier Bliki`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `Jamstack Guide — ${SITE_NAME}`,
        keywords: `${AUTHOR}, Jamstack, static site, static web systems, 757 web dev, performance, local SEO`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "Jamstack Guide"),
        ],
      });
      continue;
    }

    // --- Builds showcase ---
    if (pattern === "/builds") {
      const canonical = buildCanonical(baseUrl, "/builds");
      const desc = "Live showcase of web tools and projects built in public. Proven credibility engine for local Hampton Roads businesses.";
      routes.push({
        route: "/builds",
        title: `Builds Showcase | Neal Frazier Bliki`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `Builds Showcase — ${SITE_NAME}`,
        keywords: `${AUTHOR}, builds, showcase, 100 websites, 757 tech guy, portfolio, deployed projects, Netlify`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "Builds Showcase"),
        ],
      });
      continue;
    }

    // --- AI agent index ---
    if (pattern === "/ai") {
      const canonical = buildCanonical(baseUrl, "/ai");
      const desc = "Agent-accessible index of machine-readable resources and structured page data optimized for Answer Engine Optimization (AEO).";
      routes.push({
        route: "/ai",
        title: `AI Agent Index & AEO | Neal Frazier Bliki`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `AI Agent Index — ${SITE_NAME}`,
        keywords: `${AUTHOR}, AI agent index, LLM index, AEO, answer engine optimization, 757 tech specialist, metadata, JSON-LD`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "AI Agent Index"),
        ],
      });
      continue;
    }

    // --- Social / X feed ---
    if (pattern === "/social") {
      const canonical = buildCanonical(baseUrl, "/social");
      const desc = "Live build log and tech updates from Neal Frazier. Follow experiments with autonomous AI agents, Termux mobile developer terminals, and Hampton Roads web deployments.";
      routes.push({
        route: "/social",
        title: `Social Feed & Build Log | Neal Frazier Bliki`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `Social Feed — ${SITE_NAME}`,
        keywords: `${AUTHOR}, social feed, twitter, build in public, Hermes agent, Termux mobile developer, AI automation Norfolk, local SEO Virginia Beach`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "Social Feed"),
        ],
      });
      continue;
    }

    // --- Locations Hub (757 Region) ---
    if (pattern === "/locations") {
      const canonical = buildCanonical(baseUrl, "/locations");
      const desc = "Top website developer serving all 7 cities in 757 Hampton Roads: Virginia Beach, Norfolk, Chesapeake, Newport News, Hampton, Portsmouth, Suffolk, Williamsburg, and Yorktown.";
      routes.push({
        route: "/locations",
        title: `757 Web Developer & City Service Areas | Neal Frazier`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `757 Web Developer Service Areas — ${SITE_NAME}`,
        keywords: `757 web developer, Virginia Beach web design, Norfolk IT consultant, Chesapeake website development, Hampton Roads local SEO, Newport News web apps, Suffolk developer`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "757 Locations Hub"),
          localBusinessJsonLd(baseUrl, AUTHOR, desc),
        ],
      });
      continue;
    }

    // --- City Landing Pages ---
    if (pattern === "/locations/:cityId") {
      const cities = [
        { id: "virginia-beach", name: "Virginia Beach" },
        { id: "norfolk", name: "Norfolk" },
        { id: "chesapeake", name: "Chesapeake" },
        { id: "newport-news", name: "Newport News" },
        { id: "hampton", name: "Hampton" },
        { id: "portsmouth", name: "Portsmouth" },
        { id: "suffolk", name: "Suffolk" },
        { id: "williamsburg", name: "Williamsburg" },
        { id: "yorktown", name: "Yorktown" },
      ];
      for (const city of cities) {
        const route = `/locations/${city.id}`;
        const canonical = buildCanonical(baseUrl, route);
        const desc = `Top website developer and local SEO specialist in ${city.name}, VA. High-performance React web systems, sub-second edge loading, and automated booking funnels for local businesses.`;
        routes.push({
          route,
          title: `Website Developer in ${city.name}, VA | Neal Frazier`,
          description: desc,
          canonical,
          ogImage: defaultOgImage,
          ogImageAlt: `Website Developer ${city.name} VA — ${SITE_NAME}`,
          keywords: `${city.name} web developer, website design ${city.name} VA, local SEO ${city.name}, hire web developer ${city.name}, 757 web development`,
          ogType: "website",
          jsonLd: [
            websiteJsonLd(canonical, desc),
            breadcrumbJsonLd(canonical, `${city.name} Web Developer`),
            localBusinessJsonLd(baseUrl, `${AUTHOR} - ${city.name} Web Developer`, desc),
          ],
        });
      }
      continue;
    }

    // --- Portfolio Showcase ---
    if (pattern === "/portfolio") {
      const canonical = buildCanonical(baseUrl, "/portfolio");
      const desc = "Visual showcase of custom web applications, booking funnels, and local SEO systems built for 757 Hampton Roads businesses with 100/100 Lighthouse performance.";
      routes.push({
        route: "/portfolio",
        title: `Web Design & Systems Portfolio | Neal Frazier`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `Web Systems Portfolio — ${SITE_NAME}`,
        keywords: `web design portfolio, 757 website developer work, Virginia Beach web builds, Norfolk web app showcase, Netlify case studies`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "Portfolio"),
        ],
      });
      continue;
    }

    // --- Calculator / Estimator ---
    if (pattern === "/calculator") {
      const canonical = buildCanonical(baseUrl, "/calculator");
      const desc = "Interactive 757 website cost & ROI calculator. Get instant transparent estimates for website design, local SEO, and AI booking funnels in Virginia Beach, Norfolk, & Chesapeake.";
      routes.push({
        route: "/calculator",
        title: `757 Website Cost Calculator & ROI Estimator | Neal Frazier`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `Website Cost Calculator — ${SITE_NAME}`,
        keywords: `website cost calculator 757, web design pricing Virginia Beach, how much does a website cost Norfolk, local SEO quote Chesapeake`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "Project Estimator"),
        ],
      });
      continue;
    }

    // --- Process Page ---
    if (pattern === "/process") {
      const canonical = buildCanonical(baseUrl, "/process");
      const desc = "Neal Frazier's 3-day launch sprint and web systems playbook. How local 757 business owners get fast, 100/100 Lighthouse sites without slow agency delay.";
      routes.push({
        route: "/process",
        title: `3-Day Sprint Web Architecture & Process | Neal Frazier`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `3-Day Sprint Web Architecture — ${SITE_NAME}`,
        keywords: `3 day web sprint, fast web development 757, React 19 Vite architecture, Netlify Edge deployment process`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "Process"),
        ],
      });
      continue;
    }

    // --- Knowledge Graph ---
    if (pattern === "/graph") {
      const canonical = buildCanonical(baseUrl, "/graph");
      const desc = "Interactive 757 web systems & entity graph visualizer. Inspect connections between React 19, 757 cities, AEO schema, and Netlify Edge.";
      routes.push({
        route: "/graph",
        title: `Interactive Knowledge & Entity Graph | Neal Frazier`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `Knowledge Graph Visualizer — ${SITE_NAME}`,
        keywords: `knowledge graph 757, web systems visualizer, local SEO entity graph, AEO taxonomy network`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "Knowledge Graph"),
        ],
      });
      continue;
    }

    // --- SEO Audit Tool ---
    if (pattern === "/audit") {
      const canonical = buildCanonical(baseUrl, "/audit");
      const desc = "Instant 757 website local SEO & AEO audit inspector. Check your website speed, local schema health, and AI Search readiness for Virginia Beach, Norfolk, and Chesapeake.";
      routes.push({
        route: "/audit",
        title: `757 Local SEO & AEO Audit Tool | Neal Frazier`,
        description: desc,
        canonical,
        ogImage: defaultOgImage,
        ogImageAlt: `SEO & AEO Audit Tool — ${SITE_NAME}`,
        keywords: `local SEO audit 757, website speed checker Virginia Beach, AEO health check Norfolk, Google Map Pack audit Chesapeake`,
        ogType: "website",
        jsonLd: [
          websiteJsonLd(canonical, desc),
          breadcrumbJsonLd(canonical, "SEO Audit Tool"),
        ],
      });
      continue;
    }

    // --- Fallback for any unhandled route pattern ---
    routes.push({
      route: pattern,
      title: data.bliki_metadata.title,
      description: data.bliki_metadata.description,
      canonical: buildCanonical(baseUrl, pattern),
      ogImage: defaultOgImage,
      ogImageAlt: DEFAULT_OG_ALT,
      keywords: `${AUTHOR}, Hampton Roads web systems, local SEO, 757 tech`,
      ogType: "website",
      jsonLd: [websiteJsonLd(buildCanonical(baseUrl, pattern), data.bliki_metadata.description)],
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