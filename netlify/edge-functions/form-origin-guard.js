// Same-origin guard for state-changing POSTs (Netlify Forms).
// This site has no session cookie and no custom API writes. Contact and
// lead-capture forms POST to "/". Browsers attach Origin and Sec-Fetch-Site
// on those requests; a page on another origin cannot match this host.
// Non-POST traffic is not handled (config.method). onError bypasses so a
// runtime fault does not take the static site offline.

export function isAllowedFormPost(request) {
  if (request.method !== "POST") return true;

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  let originHost = "";
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  const host = request.headers.get("host") || "";
  return originHost === host;
}

export default async (request, context) => {
  if (isAllowedFormPost(request)) {
    return context.next();
  }

  return new Response("Forbidden", {
    status: 403,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
};

export const config = {
  path: "/*",
  method: "POST",
  onError: "bypass",
};
