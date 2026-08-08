import { useState } from "react";
import { Link } from "react-router-dom";
import { Terminal, Code2, Bot, Sparkles, Copy, Check, ExternalLink, ArrowRight, ShieldCheck, Download, BookOpen, GitBranch } from "lucide-react";

export default function PixelPetsDocs() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const HERMES_CLI_COMMAND = `curl -s https://www.nealfrazier.tech/api/pixel-pets.json | jq .companions`;
  
  const MCP_CONFIG_JSON = `{
  "mcpServers": {
    "neal-bliki-pets": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch", "https://www.nealfrazier.tech/api/pixel-pets.json"],
      "env": {}
    }
  }
}`;

  const PYTHON_HERMES_HARNESS = `import requests

# Fetch machine-readable AI companion manifest
manifest = requests.get('https://www.nealfrazier.tech/api/pixel-pets.json').json()

print(f"Loaded {manifest['total_companions']} Pixel Pet Companions!")
for pet in manifest['companions']:
    print(f"[{pet['name']}] Created by: {pet['creator']} | Level: {pet['level']}")
    print(f"System Prompt: {pet['system_prompt'][:60]}...")
    for tool in pet['mcp_tool_definitions']:
        print(f"  -> Tool: {tool['name']}: {tool['description']}")
`;

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-28">
      {/* Navigation Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#6b7280]">
        <Link to="/pets" className="hover:text-[#4285F4]">Pixel Pets Arcade</Link>
        <span>/</span>
        <span className="text-[#111111]">Developer &amp; AI Integration Docs</span>
      </div>

      {/* Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4285F4]/10 px-3.5 py-1 text-xs font-bold text-[#4285F4]">
          <BookOpen className="h-3.5 w-3.5" /> Open API &amp; Harness Integration Standard
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111111] md:text-5xl">
          AI Harness Integration &amp; Contribution Guide
        </h1>
        <p className="mt-4 text-base text-[#4b5563]">
          How to connect Pixel Pets, Hermes Agent (Nous Research), Google Antigravity SDK, and Claude Desktop MCP tools to your local AI harness or contribute new companions to the open-source repository.
        </p>
      </div>

      {/* QUICK START BOXES */}
      <div className="mt-12 space-y-10">
        {/* 1. FETCH VIA HERMES AGENT & CURL */}
        <section className="rounded-3xl border border-black/10 bg-slate-900 p-8 text-white shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#60a5fa]">
            <Terminal className="h-4 w-4" /> 1. Quick Terminal Fetch (cURL / jq)
          </div>
          <h2 className="mt-2 text-2xl font-bold text-white">Fetch Live AI Manifest in 1 Command</h2>
          <p className="mt-2 text-xs text-slate-300">
            AI agents and shell scripts can fetch the live, production-grade JSON manifest with full MCP tool schemas:
          </p>

          <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-400">
            <code>{HERMES_CLI_COMMAND}</code>
            <button
              onClick={() => copyText(HERMES_CLI_COMMAND, "cmd1")}
              className="absolute top-3 right-3 rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              {copiedId === "cmd1" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </section>

        {/* 2. MCP CONFIG JSON FOR CLAUDE DESKTOP & AGY */}
        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4285F4]">
            <Code2 className="h-4 w-4" /> 2. Claude Desktop &amp; AGY `mcp_config.json`
          </div>
          <h2 className="mt-2 text-2xl font-bold text-[#111111]">Register MCP Server Credentials</h2>
          <p className="mt-2 text-xs text-[#4b5563]">
            Add this server block to your <code>claude_desktop_config.json</code> or Antigravity <code>.agents/mcp_config.json</code>:
          </p>

          <div className="relative mt-4 overflow-hidden rounded-2xl border border-black/10 bg-slate-950 p-4 font-mono text-xs text-blue-300">
            <pre>{MCP_CONFIG_JSON}</pre>
            <button
              onClick={() => copyText(MCP_CONFIG_JSON, "mcp1")}
              className="absolute top-3 right-3 rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              {copiedId === "mcp1" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </section>

        {/* 3. PYTHON HARNESS SNIPPET */}
        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600">
            <Bot className="h-4 w-4" /> 3. Python Harness Code (Hermes / AutoGen / LangChain)
          </div>
          <h2 className="mt-2 text-2xl font-bold text-[#111111]">Programmatic Python SDK Integration</h2>
          <p className="mt-2 text-xs text-[#4b5563]">
            Ingest companion prompts, system roles, and tools dynamically inside Python agent execution loops:
          </p>

          <div className="relative mt-4 overflow-hidden rounded-2xl border border-black/10 bg-slate-950 p-4 font-mono text-xs text-purple-300">
            <pre>{PYTHON_HERMES_HARNESS}</pre>
            <button
              onClick={() => copyText(PYTHON_HERMES_HARNESS, "py1")}
              className="absolute top-3 right-3 rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              {copiedId === "py1" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </section>

        {/* 4. HOW TO CONTRIBUTE A NEW PET */}
        <section className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-950 via-slate-900 to-black p-8 text-white shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <GitBranch className="h-4 w-4" /> Open Source Contribution Guidelines
          </div>
          <h2 className="mt-2 text-2xl font-black text-white">How to Contribute New Companions</h2>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            Want to add your own AI companion, custom tool schema, or pixel artwork to the Neal Frazier Bliki ecosystem? Follow these 4 steps:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/20 p-4">
              <div className="text-xs font-bold text-emerald-400">Step 1: Fork &amp; Clone Repo</div>
              <p className="mt-1 text-xs text-slate-300">Clone <code>github.com/1nc0gn30/neal-bliki</code> to your local development machine.</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/20 p-4">
              <div className="text-xs font-bold text-emerald-400">Step 2: Add Artwork Asset</div>
              <p className="mt-1 text-xs text-slate-300">Add a 1:1 ratio 16-bit pixel art image JPG under <code>public/images/pets/&lt;your-pet&gt;.jpg</code>.</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/20 p-4">
              <div className="text-xs font-bold text-emerald-400">Step 3: Define MCP Schema</div>
              <p className="mt-1 text-xs text-slate-300">Add your pet companion specs, MCP tool definitions, and system prompts to <code>public/api/pixel-pets.json</code>.</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-900/20 p-4">
              <div className="text-xs font-bold text-emerald-400">Step 4: Submit Pull Request</div>
              <p className="mt-1 text-xs text-slate-300">Run <code>npm run build</code> to verify static route generation and open a PR on GitHub!</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="https://github.com/1nc0gn30/neal-bliki"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-xs font-bold text-slate-950 transition-all hover:bg-emerald-400"
            >
              Fork Repository on GitHub
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
