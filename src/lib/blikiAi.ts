/**
 * Bliki AI facts and the on-device model id.
 *
 * To change the WebGPU model, edit `BLIKI_WEBGPU_MODEL_ID`.
 * The id must exist in `@mlc-ai/web-llm`'s `prebuiltAppConfig.model_list`.
 *
 * Current choice: Qwen2.5-0.5B-Instruct, q4f16 WebGPU build.
 * It is the smallest instruct model from the requested set. Weight files are
 * a few hundred MB; WebLLM budgets about 945 MB of VRAM including the KV cache.
 * Drop-in alternatives:
 *   "Llama-3.2-1B-Instruct-q4f16_1-MLC"  (~879 MB VRAM)
 *   "Phi-3.5-mini-instruct-q4f16_1-MLC"  (larger; needs more GPU memory)
 *
 * The runtime stores weights in Cache Storage (`cacheBackend: "cache"` in
 * `src/lib/blikiWebGpu.ts`). Set that field to `"indexeddb"` to use IndexedDB.
 * The WebLLM bundle is imported only after the assistant opens.
 */
export const BLIKI_WEBGPU_MODEL_ID = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";

export const VERIFIED_PHONE = "(948) 204-7987";
export const VERIFIED_PHONE_TEL = "+19482047987";

export const BLIKI_SYSTEM_PROMPT = `You are Neal Frazier's Bliki assistant on nealfrazier.tech. You help visitors learn about his 757 Hampton Roads (Virginia Beach, Norfolk, Chesapeake, and nearby) web and AI services. Reply in short plain sentences.

Facts you must follow:
- Neal Frazier, Neal Frazier Tech, Virginia Beach, VA. Phone: (948) 204-7987. Email: neal@nealfrazier.tech. Also published: contact@nealfrazier.tech.
- Site routes: /contact, /calculator, /locations, /offerings, /process, /portfolio, /netlify.
- Published prices in USD, promo code FOUNDER25 saves 25%: $99 risk-free kickoff deposit (balance after a live preview within 48 hours); $149 one-page site (24 hours); $299 24/7 AI receptionist (48 hours); $499 five-page turnkey site (72 hours); $997 custom AI agent swarm, MCP server, or SaaS MVP (5 days); $49 lifetime bundle of 44 browser tools.
- Products: Zoth Studio at https://zoth.nullai.tech, ZOTHOS at https://zothos.nullai.tech, NullAI Tech at https://nullai.tech.
- Neal uses Netlify, including the Netlify CLI (local dev, deploys, environment variables) and Netlify Flows (event-driven site workflows), plus React, Vite, and answer-engine optimization.
- Authorized phishing simulation for small businesses is security awareness testing. It starts only after a signed one-page authorization, stays inside that written scope, stores no credentials, and the deliverable is a ranked report of fixes. It starts with the $99 kickoff deposit. Describe it only in those terms.
- Never invent phone numbers, prices, emails, or credentials. If you are unsure, send the visitor to /contact or (948) 204-7987.
When a page would help, include its path.`;

export type AssistantLink = {
  link: string;
  linkText: string;
};

const ROUTE_LINKS: Array<{ test: RegExp } & AssistantLink> = [
  { test: /\/calculator\b/i, link: "/calculator", linkText: "Open the estimator" },
  { test: /\/locations\b/i, link: "/locations", linkText: "Explore 757 cities" },
  { test: /\/offerings\b/i, link: "/offerings", linkText: "View services and pricing" },
  { test: /\/process\b/i, link: "/process", linkText: "See the delivery process" },
  { test: /\/netlify\b/i, link: "/netlify", linkText: "Netlify, CLI, and Flows" },
  { test: /\/contact\b/i, link: "/contact", linkText: "Contact Neal" },
  { test: /\/portfolio\b/i, link: "/portfolio", linkText: "View the portfolio" },
];

export function firstSiteLink(text: string): AssistantLink | undefined {
  return ROUTE_LINKS.find((route) => route.test.test(text));
}

/** Keep published contact details if a small local model invents another number. */
export function scrubAssistantText(text: string): string {
  const withoutBanned = text.replace(/\bpentesters?\b/gi, "security testers");
  return withoutBanned.replace(
    /(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/g,
    (match) => {
      const digits = match.replace(/\D/g, "");
      if (digits.endsWith("9482047987")) return VERIFIED_PHONE;
      return VERIFIED_PHONE;
    },
  );
}

export function describeLoadProgress(report: { progress: number; text: string }): {
  label: "Downloading model…" | "Compiling WebGPU…" | "Ready";
  detail: string;
  progress: number;
} {
  const detail = report.text?.trim() || "Preparing the on-device model";
  const lower = detail.toLowerCase();
  const progress = Number.isFinite(report.progress)
    ? Math.max(0, Math.min(1, report.progress))
    : 0;

  if (progress >= 1 || lower.includes("finish")) {
    return { label: "Ready", detail, progress: 1 };
  }
  if (
    lower.includes("shader") ||
    lower.includes("compil") ||
    lower.includes("pipeline") ||
    lower.includes("webgpu")
  ) {
    return { label: "Compiling WebGPU…", detail, progress };
  }
  return { label: "Downloading model…", detail, progress };
}

const LIMITED_PREFIX =
  "Limited offline answers — this reply is keyword matching, not the WebGPU model. ";

export function limitedOfflineAnswer(prompt: string): { text: string } & Partial<AssistantLink> {
  const lower = prompt.toLowerCase();

  if (lower.includes("phish") || lower.includes("awareness") || lower.includes("simulation")) {
    return {
      text:
        LIMITED_PREFIX +
        "Neal Frazier Tech offers authorized phishing simulation for small businesses. It starts only after a signed one-page authorization, stays inside that written scope, stores no credentials, and the deliverable is a ranked report of fixes. Start with the $99 kickoff deposit or call (948) 204-7987.",
      link: "/contact",
      linkText: "Start an authorized simulation",
    };
  }

  if (lower.includes("zothos") || lower.includes("zoth os")) {
    return {
      text:
        LIMITED_PREFIX +
        "ZOTHOS (https://zothos.nullai.tech) is Neal Frazier's sovereign AI-oriented Linux distribution. Zoth Studio, the local-first agent studio, is at https://zoth.nullai.tech. NullAI Tech is at https://nullai.tech.",
      link: "/builds",
      linkText: "See live builds",
    };
  }

  if (lower.includes("zoth") || lower.includes("nullai") || lower.includes("null ai")) {
    return {
      text:
        LIMITED_PREFIX +
        "Neal publishes Zoth Studio (https://zoth.nullai.tech), ZOTHOS (https://zothos.nullai.tech), and NullAI Tech (https://nullai.tech), alongside client sites on nealfrazier.tech.",
      link: "/builds",
      linkText: "See live builds",
    };
  }

  if (lower.includes("cli") || lower.includes("flows") || lower.includes("netlify")) {
    return {
      text:
        LIMITED_PREFIX +
        "Neal Frazier Tech deploys on Netlify and works in the Netlify CLI (local dev, deploys, environment variables) and Netlify Flows (event-driven site workflows), with React, Vite, and answer-engine optimization.",
      link: "/netlify",
      linkText: "Why Netlify",
    };
  }

  if (
    lower.includes("cost") ||
    lower.includes("price") ||
    lower.includes("how much") ||
    lower.includes("package") ||
    lower.includes("$")
  ) {
    return {
      text:
        LIMITED_PREFIX +
        "Current packages: $99 risk-free kickoff deposit, $149 one-page site (24 hours), $299 AI receptionist (48 hours), $499 five-page turnkey site (72 hours), $997 custom AI swarm or MCP build (5 days), and a $49 lifetime 44-tool bundle. Promo code FOUNDER25 saves 25%. Call (948) 204-7987.",
      link: "/calculator",
      linkText: "Open the estimator",
    };
  }

  if (lower.includes("phone") || lower.includes("call") || lower.includes("contact") || lower.includes("email")) {
    return {
      text:
        LIMITED_PREFIX +
        "Call Neal Frazier at (948) 204-7987, email neal@nealfrazier.tech, or use the contact form. City pages live at /locations.",
      link: "/contact",
      linkText: "Contact Neal",
    };
  }

  if (lower.includes("aeo") || lower.includes("ai search") || lower.includes("chatgpt") || lower.includes("schema")) {
    return {
      text:
        LIMITED_PREFIX +
        "Answer Engine Optimization formats a site with JSON-LD and llms.txt so assistants can cite a 757 business. Every package on /offerings includes that structure.",
      link: "/offerings",
      linkText: "View services and pricing",
    };
  }

  if (lower.includes("fast") || lower.includes("launch") || lower.includes("how long") || lower.includes("sprint")) {
    return {
      text:
        LIMITED_PREFIX +
        "A one-page site ships in 24 hours, the AI receptionist in 48 hours, and a five-page site in 72 hours. Custom agent work is a 5-day sprint. The $99 deposit starts a custom build and the balance is due after you approve a live preview.",
      link: "/process",
      linkText: "See the delivery process",
    };
  }

  if (
    lower.includes("who") ||
    lower.includes("developer") ||
    lower.includes("757") ||
    lower.includes("virginia") ||
    lower.includes("norfolk") ||
    lower.includes("chesapeake")
  ) {
    return {
      text:
        LIMITED_PREFIX +
        "Neal Frazier (nealfrazier.tech) builds React and Vite sites on Netlify for Virginia Beach, Norfolk, Chesapeake, and the rest of 757 Hampton Roads, plus AI receptionists and agent workflows. Phone: (948) 204-7987.",
      link: "/locations",
      linkText: "Explore 757 cities",
    };
  }

  return {
    text:
      LIMITED_PREFIX +
      "Neal Frazier builds web systems and AI workflows for Hampton Roads businesses, and publishes Zoth Studio, ZOTHOS, and NullAI. Ask about pricing, or call (948) 204-7987.",
    link: "/contact",
    linkText: "Contact Neal",
  };
}
