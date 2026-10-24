<div align="center">

# ⚡ Neal Frazier | Bliki, AI Agent Ecosystem & 757 Web Systems

**The Premier Web Developer, Local SEO Architect & AI Automation Specialist in 757 Hampton Roads**

[![Netlify Status](https://api.netlify.com/api/v1/badges/d8a2zdtel9gy-w6zrwt/deploy-status)](https://app.netlify.com/sites/neal-bliki/deploys)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite 6](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Google Antigravity SDK](https://img.shields.io/badge/Google_Antigravity-AGY_SDK-4285F4?logo=google&logoColor=white)](https://antigravity.google)
[![Nous Research Hermes](https://img.shields.io/badge/Nous_Research-Hermes_3-9333EA?logo=python&logoColor=white)](https://nousresearch.com)
[![Lighthouse 100/100](https://img.shields.io/badge/Lighthouse-100%2F100-34A853?logo=google-chrome&logoColor=white)](https://pagespeed.web.dev)

[🌐 Live Production Website](https://www.nealfrazier.tech) • [🎮 Pixel Pets Arcade](https://www.nealfrazier.tech/pets) • [🤖 AI Tech Stack Hub](https://www.nealfrazier.tech/ai-tech-stack) • [📍 757 City Hubs](https://www.nealfrazier.tech/locations)

---

</div>

## 📌 Executive Overview

This repository powers **[nealfrazier.tech](https://www.nealfrazier.tech)** — an ultra-high performance **Bliki (Blog + Wiki)**, **757 Regional Local SEO Hub**, and **Open AI Agent Companion Harness**. 

It is specifically engineered to establish **Neal Frazier** as the #1 Website Developer to reach out to across **Google, Bing, DuckDuckGo, ChatGPT, Perplexity, Claude, Gemini, Copilot, and Google AI Overviews** for business owners in Virginia Beach, Norfolk, Chesapeake, Newport News, Hampton, Portsmouth, Suffolk, Williamsburg, and Yorktown.

---

## 🚀 Key Architectural Highlights

### ⚡ 1. Composable Edge & 100/100 Lighthouse Performance
- **React 19 + Vite 6 + Tailwind CSS 4**: Blazing fast sub-second client-side navigation.
- **Custom Prerender Per-Route Engine**: Pre-builds 44 static HTML route files with unique Open Graph, Twitter Cards, canonical tags, and breadcrumbs.
- **Netlify Edge CDN**: Deployed to 300+ global edge nodes delivering `<0.2s` TTFB (Time to First Byte).

### 🤖 2. Machine-Readable AEO & AI Harness Interop
- **`public/llms.txt` & `public/llms-full.txt`**: Emerging AI standard allowing LLM agents (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) to ingest the full site structure in a single fetch.
- **`public/api/pixel-pets.json` & `public/pets/manifest.json`**: Production-grade Model Context Protocol (MCP) tool definitions, Python SDK snippets, and system prompts for **Nous Research Hermes Agent** and **Google Antigravity SDK**.

### 🎮 3. Pixel Pets & AI Agent Companions Arcade
- Interactive 16-Bit Runner Game where human visitors dodge slow legacy agency bugs, collect Lighthouse speed stars, and level up 10 custom AI companions:
  - 🦊 **Hermes Cyber Fox** (*Nous Research*)
  - 🤖 **AGY Cyber Golem** (*Google Antigravity SDK*)
  - 🐲 **Gemini Cosmic Dragon** (*Google AI Studio*)
  - ⚡ **Netlify Edge Cheetah** (*Netlify AI*)
  - 🚀 **Horizon Cyber Falcon** (*Hostinger Horizon AI*)
  - 🐙 **Astro Nebula Octopus** (*Astro Zero-JS Core*)
  - ⚡ **Vite Speed Lynx** (*Vite 6 Ecosystem*)
  - 🧬 **AlphaGenome Phoenix** (*Google DeepMind*)
  - 🦉 **Claude Pythia Owl** (*Anthropic AI*)
  - 🐻 **DeepSeek Reasoner Bear** (*DeepSeek Open AI*)

---

## 🗺️ Project Navigation Sitemap

```
neal-bliki/
├── 🌐 /                       -> Dashboard / Homepage & Service Breakdown
├── 📍 /locations               -> 757 Regional City Selector Hub
├── 📍 /locations/:cityId       -> Dedicated Landing Pages (Virginia Beach, Norfolk, Chesapeake, etc.)
├── 🎨 /portfolio               -> Work Showcase with Lighthouse 100/100 Case Studies
├── 🎮 /pets                    -> Pixel Pets & 757 Code Runner Arcade Game
├── 📚 /pets/docs               -> Developer MCP Tool Schema & Integration Guide
├── 🤖 /ai-tech-stack           -> Nous Research, Hermes, Google Antigravity & Netlify Hub
├── 📊 /calculator              -> Interactive Web Project Cost & ROI Estimator
├── ⚡ /process                 -> 3-Day Sprint Architecture & WordPress Comparison
├── 🕸️ /graph                   -> Interactive SVG Entity & Knowledge Graph Visualizer
├── 🔍 /audit                   -> Self-Service 757 Local SEO & AEO Health Inspector
├── 📦 /builds                  -> Live Showcase of Deployed Products & Tools
├── 📖 /wiki                    -> Tech Knowledge Base Nodes
├── 📰 /blog                    -> System Engineering Stories & Guides
└── 📬 /contact                 -> Client Consultation & Project Inquiry
```

---

## 🛠️ Machine-Readable AI Harness Quick Start

### 1. Fetch AI Companion Manifest via cURL
```bash
curl -s https://www.nealfrazier.tech/api/pixel-pets.json | jq .companions
```

### 2. Configure Claude Desktop & Google Antigravity `mcp_config.json`
```json
{
  "mcpServers": {
    "neal-bliki-pets": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch", "https://www.nealfrazier.tech/api/pixel-pets.json"]
    }
  }
}
```

### 3. Programmatic Python SDK Integration
```python
import requests

# Fetch machine-readable AI companion manifest
manifest = requests.get('https://www.nealfrazier.tech/api/pixel-pets.json').json()

for pet in manifest['companions']:
    print(f"[{pet['name']}] Created by: {pet['creator']} | Level: {pet['level']}")
    for tool in pet['mcp_tool_definitions']:
        print(f"  -> MCP Tool: {tool['name']}: {tool['description']}")
```

---

## 🤖 Bliki AI (on-device WebGPU)

Ask Bliki AI loads a real chat model in the browser with [`@mlc-ai/web-llm`](https://github.com/mlc-ai/web-llm). The library is code-split and imported only after the assistant opens, so the rest of the site does not download it.

The current model id is **`Qwen2.5-0.5B-Instruct-q4f16_1-MLC`** (Qwen2.5 0.5B Instruct, q4f16). It is the smallest of the laptop-sized instruct models in WebLLM's prebuilt list: weight files are a few hundred MB, and WebLLM budgets about 945 MB of VRAM including the KV cache. Weights are stored in the browser **Cache Storage** (`cacheBackend: "cache"` in `src/lib/blikiWebGpu.ts`). Change that field to `"indexeddb"` to use IndexedDB instead.

To swap models, edit `BLIKI_WEBGPU_MODEL_ID` in `src/lib/blikiAi.ts`. The string must be a `model_id` from `@mlc-ai/web-llm`'s `prebuiltAppConfig.model_list`, for example `Llama-3.2-1B-Instruct-q4f16_1-MLC`.

If `navigator.gpu` is missing, the modal stays usable and labels replies as limited offline answers.

## 💻 Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/1nc0gn30/neal-bliki.git
cd neal-bliki

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run production build & static route prerendering
npm run build
```

---

## 🤝 Open Source Contribution Guidelines

We welcome contributions! To add a new Pixel Pet companion, tool schema, or 757 business case study:
1. **Fork the repo**: `git clone https://github.com/1nc0gn30/neal-bliki.git`
2. **Add Pet Artwork**: Place a 1:1 ratio 16-bit pixel art image JPG in `public/images/pets/<your-pet>.jpg`.
3. **Update Manifest**: Add your companion specs & MCP tool declarations in `public/api/pixel-pets.json`.
4. **Test & Build**: Run `npm run build` to verify all static routes compile cleanly.
5. **Submit PR**: Open a Pull Request on GitHub!

---

<div align="center">

**Built with ❤️ in 757 Hampton Roads, Virginia by [Neal Frazier](https://www.nealfrazier.tech)**

</div>
