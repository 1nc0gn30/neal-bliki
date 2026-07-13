import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

type RouteMeta = {
  route: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogImageAlt: string;
  keywords: string;
  ogType: string;
  jsonLd: string[];
  articlePublishedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
};

type PrerenderManifest = {
  routes: RouteMeta[];
};

function upsertTag(html: string, matcher: RegExp, tag: string): string {
  if (matcher.test(html)) {
    return html.replace(matcher, tag);
  }
  return html.replace('</head>', `  ${tag}\n  </head>`);
}

function applyRouteMeta(html: string, meta: RouteMeta): string {
  let next = html;

  next = next.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);
  next = upsertTag(
    next,
    /<meta\s+name="description"[\s\S]*?>/i,
    `<meta name="description" content="${meta.description}" />`,
  );
  next = upsertTag(
    next,
    /<meta\s+name="keywords"[\s\S]*?>/i,
    `<meta name="keywords" content="${meta.keywords}" />`,
  );
  next = upsertTag(
    next,
    /<link\s+rel="canonical"[\s\S]*?>/i,
    `<link rel="canonical" href="${meta.canonical}" />`,
  );
  next = upsertTag(
    next,
    /<meta\s+property="og:title"[\s\S]*?>/i,
    `<meta property="og:title" content="${meta.title}" />`,
  );
  next = upsertTag(
    next,
    /<meta\s+property="og:description"[\s\S]*?>/i,
    `<meta property="og:description" content="${meta.description}" />`,
  );
  next = upsertTag(
    next,
    /<meta\s+property="og:type"[\s\S]*?>/i,
    `<meta property="og:type" content="${meta.ogType}" />`,
  );
  next = upsertTag(
    next,
    /<meta\s+property="og:url"[\s\S]*?>/i,
    `<meta property="og:url" content="${meta.canonical}" />`,
  );
  next = upsertTag(
    next,
    /<meta\s+property="og:image"[\s\S]*?>/i,
    `<meta property="og:image" content="${meta.ogImage}" />`,
  );
  next = upsertTag(
    next,
    /<meta\s+property="og:image:alt"[\s\S]*?>/i,
    `<meta property="og:image:alt" content="${meta.ogImageAlt}" />`,
  );

  // Article-specific Open Graph tags (blog posts + wiki nodes)
  if (meta.ogType === "article") {
    if (meta.articlePublishedTime) {
      next = upsertTag(
        next,
        /<meta\s+property="article:published_time"[\s\S]*?>/i,
        `<meta property="article:published_time" content="${meta.articlePublishedTime}" />`,
      );
    }
    if (meta.articleAuthor) {
      next = upsertTag(
        next,
        /<meta\s+property="article:author"[\s\S]*?>/i,
        `<meta property="article:author" content="${meta.articleAuthor}" />`,
      );
    }
    if (meta.articleSection) {
      next = upsertTag(
        next,
        /<meta\s+property="article:section"[\s\S]*?>/i,
        `<meta property="article:section" content="${meta.articleSection}" />`,
      );
    }
    if (meta.articleTags && meta.articleTags.length > 0) {
      // Remove any existing article:tag metas so we don't duplicate on re-runs
      next = next.replace(/<meta\s+property="article:tag"[\s\S]*?>\s*/gi, "");
      const tagMetas = meta.articleTags
        .map(
          (tag) =>
            `  <meta property="article:tag" content="${tag.replace(/"/g, "&quot;")}" />\n`,
        )
        .join("");
      next = next.replace("</head>", `${tagMetas}  </head>`);
    }
  }

  // Twitter Card tags
  next = upsertTag(
    next,
    /<meta\s+name="twitter:card"[\s\S]*?>/i,
    '<meta name="twitter:card" content="summary_large_image" />',
  );
  next = upsertTag(
    next,
    /<meta\s+name="twitter:title"[\s\S]*?>/i,
    `<meta name="twitter:title" content="${meta.title}" />`,
  );
  next = upsertTag(
    next,
    /<meta\s+name="twitter:description"[\s\S]*?>/i,
    `<meta name="twitter:description" content="${meta.description}" />`,
  );
  next = upsertTag(
    next,
    /<meta\s+name="twitter:image"[\s\S]*?>/i,
    `<meta name="twitter:image" content="${meta.ogImage}" />`,
  );
  next = upsertTag(
    next,
    /<meta\s+name="twitter:image:alt"[\s\S]*?>/i,
    `<meta name="twitter:image:alt" content="${meta.ogImageAlt}" />`,
  );

  // Inject JSON-LD structured data blocks before </head>.
  // Remove any previously-injected route-specific JSON-LD markers first
  // so re-runs don't accumulate duplicates.
  next = next.replace(
    /<!--route-jsonld-start-->[\s\S]*?<!--route-jsonld-end-->\s*/g,
    "",
  );
  if (meta.jsonLd && meta.jsonLd.length > 0) {
    const blocks = meta.jsonLd
      .map(
        (json) =>
          `  <script type="application/ld+json">${json}</script>`,
      )
      .join("\n");
    next = next.replace(
      "</head>",
      `<!--route-jsonld-start-->\n${blocks}\n  <!--route-jsonld-end-->\n  </head>`,
    );
  }

  return next;
}

function prerenderPerRoutePlugin() {
  return {
    name: 'prerender-per-route',
    apply: 'build' as const,
    closeBundle() {
      const root = process.cwd();
      const distDir = path.join(root, 'dist');
      const templatePath = path.join(distDir, 'index.html');
      const manifestPath = path.join(root, '.generated', 'prerender-manifest.json');

      if (!fs.existsSync(templatePath) || !fs.existsSync(manifestPath)) {
        console.warn(
          '[prerender-per-route] Missing dist/index.html or .generated/prerender-manifest.json. Skipping route prerender.',
        );
        return;
      }

      const templateHtml = fs.readFileSync(templatePath, 'utf8');
      const manifest = JSON.parse(
        fs.readFileSync(manifestPath, 'utf8'),
      ) as PrerenderManifest;

      for (const routeMeta of manifest.routes) {
        const routePath = routeMeta.route === '/' ? '' : routeMeta.route.replace(/^\/+/, '');
        const outFile = routePath
          ? path.join(distDir, routePath, 'index.html')
          : path.join(distDir, 'index.html');

        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, applyRouteMeta(templateHtml, routeMeta), 'utf8');
      }

      console.log(`[prerender-per-route] Wrote ${manifest.routes.length} route HTML files.`);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), prerenderPerRoutePlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('react-dom')) return 'vendor-react-dom';
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('motion')) return 'vendor-motion';
            if (id.includes('lucide-react')) return 'vendor-icons';
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // Optional toggle to disable HMR in specific local workflows.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
