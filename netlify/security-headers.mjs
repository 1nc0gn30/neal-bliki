import fs from "node:fs";

// Reads the global `for = "/*"` header block from netlify.toml so local
// `vite preview` enforces the same policy Netlify will send. Preview strips
// upgrade-insecure-requests because that directive rewrites an HTTP preview
// origin to HTTPS and breaks asset loads.
/**
 * @param {string} tomlPath
 * @param {{ forPreview?: boolean }} [options]
 * @returns {Record<string, string>}
 */
export function readProductionSecurityHeaders(tomlPath, { forPreview = false } = {}) {
  const toml = fs.readFileSync(tomlPath, "utf8");
  const headers = {};
  let inGlobal = false;
  let inValues = false;

  for (const line of toml.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("[[headers]]")) {
      if (inGlobal && inValues) break;
      inGlobal = false;
      inValues = false;
      continue;
    }
    if (!inGlobal && trimmed === 'for = "/*"') {
      inGlobal = true;
      continue;
    }
    if (inGlobal && trimmed === "[headers.values]") {
      inValues = true;
      continue;
    }
    if (!inGlobal || !inValues || trimmed.startsWith("#") || trimmed === "") continue;
    const match = trimmed.match(/^([A-Za-z0-9-]+)\s*=\s*"(.*)"\s*$/);
    if (match) headers[match[1]] = match[2].replace(/\\"/g, '"');
  }

  if (forPreview && headers["Content-Security-Policy"]) {
    headers["Content-Security-Policy"] = headers["Content-Security-Policy"]
      .replace(/;\s*upgrade-insecure-requests/, "")
      .trim();
  }

  return headers;
}
