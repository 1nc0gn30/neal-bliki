import { useState } from "react";
import { Link } from "react-router-dom";
import { Network, Search, Sparkles, Filter, Info, ShieldCheck, ArrowRight, Layers, MapPin, Code, Bot } from "lucide-react";

type Node = {
  id: string;
  name: string;
  category: "systems" | "cities" | "aeo" | "services";
  description: string;
  connections: string[];
  metrics?: string;
  link?: string;
};

const GRAPH_NODES: Node[] = [
  {
    id: "n_neal",
    name: "Neal Frazier (Bliki Core)",
    category: "systems",
    description: "Central web systems architect, 757 local SEO developer, and AI automation specialist based in Virginia Beach, VA.",
    connections: ["n_react", "n_netlify", "n_vb", "n_norfolk", "n_chesapeake", "n_aeo", "n_sprint"],
    metrics: "100+ Sites Shipped",
    link: "/",
  },
  {
    id: "n_react",
    name: "React 19 & Vite 6 Rails",
    category: "systems",
    description: "High-velocity modern frontend stack delivering sub-second page loads, zero runtime overhead, and 100/100 Lighthouse performance.",
    connections: ["n_neal", "n_tailwind", "n_prerender"],
    metrics: "0.2s TTFB",
    link: "/jamstack",
  },
  {
    id: "n_netlify",
    name: "Netlify Global Edge CDN",
    category: "systems",
    description: "Composable edge delivery platform with serverless functions, form capture, stateful Blobs, and instant global deployment.",
    connections: ["n_neal", "n_react", "n_sprint"],
    metrics: "99.99% Uptime",
    link: "/netlify",
  },
  {
    id: "n_prerender",
    name: "Static HTML Prerender Engine",
    category: "systems",
    description: "Custom Vite plugin compiling 40+ static HTML routes per build, ensuring 100% crawlability for Google, Bing, and LLM bots.",
    connections: ["n_react", "n_aeo"],
    metrics: "40 Prerendered Routes",
    link: "/process",
  },
  {
    id: "n_tailwind",
    name: "Tailwind CSS 4 & Motion",
    category: "systems",
    description: "Modern design system with dark glassmorphism, responsive utilities, and micro-animations.",
    connections: ["n_react"],
    metrics: "WCAG AAA Compliant",
    link: "/portfolio",
  },
  // 757 Cities
  {
    id: "n_vb",
    name: "Virginia Beach Hub",
    category: "cities",
    description: "Local SEO, oceanfront resort booking funnels, and home contractor web systems for Virginia Beach, VA.",
    connections: ["n_neal", "n_growth_stack"],
    metrics: "+310% Booking Growth",
    link: "/locations/virginia-beach",
  },
  {
    id: "n_norfolk",
    name: "Norfolk Enterprise Hub",
    category: "cities",
    description: "Maritime logistics command portals, legal practices, and defense contractor web platforms in Norfolk, VA.",
    connections: ["n_neal", "n_enterprise"],
    metrics: "Real-Time Tracking",
    link: "/locations/norfolk",
  },
  {
    id: "n_chesapeake",
    name: "Chesapeake Trades Hub",
    category: "cities",
    description: "Contractor lead generation systems, instant quote tools, and #1 Google Map Pack rankings in Chesapeake, VA.",
    connections: ["n_neal", "n_growth_stack"],
    metrics: "#1 Map Pack Rank",
    link: "/locations/chesapeake",
  },
  {
    id: "n_nn",
    name: "Newport News & Tech Hub",
    category: "cities",
    description: "Aerospace tech, shipbuilding, and commercial real estate web applications in Newport News, VA.",
    connections: ["n_neal", "n_enterprise"],
    metrics: "City Center Oyster Point",
    link: "/locations/newport-news",
  },
  {
    id: "n_hampton",
    name: "Hampton & Aerospace Hub",
    category: "cities",
    description: "High-speed web platforms for Hampton research vendors, waterfront hospitality, and specialty trades.",
    connections: ["n_neal"],
    metrics: "100/100 Speed",
    link: "/locations/hampton",
  },
  // AEO & Search
  {
    id: "n_aeo",
    name: "AEO (Answer Engine Optimization)",
    category: "aeo",
    description: "Structured JSON-LD schema graph and llms.txt syndication ensuring direct citation by ChatGPT, Perplexity, Claude, and Gemini.",
    connections: ["n_neal", "n_prerender", "n_jsonld"],
    metrics: "100% LLM Indexing",
    link: "/ai",
  },
  {
    id: "n_jsonld",
    name: "JSON-LD Entity Graph",
    category: "aeo",
    description: "Interconnected ProfessionalService, LocalBusiness, Person, and FAQPage structured data injected into every page head.",
    connections: ["n_aeo"],
    metrics: "9 Schema Types",
    link: "/ai",
  },
  // Services
  {
    id: "n_sprint",
    name: "3-Day Rapid Launch Sprint",
    category: "services",
    description: "High-velocity web build sprint delivering production-ready, SEO-optimized sites in 72 hours.",
    connections: ["n_neal", "n_react", "n_netlify"],
    metrics: "72-Hour Delivery",
    link: "/process",
  },
  {
    id: "n_growth_stack",
    name: "Growth Stack & Booking Funnel",
    category: "services",
    description: "Multi-page local growth package with integrated customer scheduling, review widgets, and city keyword targeting.",
    connections: ["n_neal", "n_vb", "n_chesapeake"],
    metrics: "$149–$997",
    link: "/calculator",
  },
  {
    id: "n_enterprise",
    name: "Enterprise Netlify Migration",
    category: "services",
    description: "Composable cloud migration advisory, AI Gateway governance, and global edge rollout strategy.",
    connections: ["n_neal", "n_norfolk", "n_nn"],
    metrics: "Advisory & Build",
    link: "/offerings",
  },
];

const CATEGORY_COLORS = {
  systems: "bg-blue-500 text-blue-100 border-blue-400",
  cities: "bg-emerald-500 text-emerald-100 border-emerald-400",
  aeo: "bg-purple-500 text-purple-100 border-purple-400",
  services: "bg-amber-500 text-amber-100 border-amber-400",
};

export default function KnowledgeGraph() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedNode, setSelectedNode] = useState<Node>(GRAPH_NODES[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNodes = GRAPH_NODES.filter((node) => {
    const matchesCategory = selectedCategory === "all" || node.category === selectedCategory;
    const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          node.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4285F4]/10 px-3.5 py-1 text-xs font-bold text-[#4285F4]">
          <Network className="h-3.5 w-3.5" /> Interactive 757 Knowledge Graph Visualizer
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
          Web Systems &amp; Entity <span className="bg-gradient-to-r from-[#4285F4] to-[#174ea6] bg-clip-text text-transparent">Graph Explorer</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#4b5563]">
          Interactively explore the architectural connections between React 19 web systems, 757 Hampton Roads city service areas, Answer Engine Optimization (AEO), and high-converting client funnels.
        </p>
      </div>

      {/* Visual Image Preview Banner */}
      <div className="mt-10 overflow-hidden rounded-3xl border border-black/10 shadow-xl">
        <div className="relative h-64 w-full bg-slate-900 md:h-80">
          <img
            src="/images/knowledge-graph.jpg"
            alt="Interactive Knowledge Graph Preview"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="rounded-full bg-[#4285F4] px-3 py-1 text-xs font-bold text-white">
                Live Entity Network
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-white">
                15 Connected Nodes • 4 Core Taxonomy Layers
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-300">
              Click any node below to inspect schema &amp; architecture connections
            </span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-4 shadow-sm md:flex-row">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search nodes or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-black/15 bg-slate-50 pl-10 pr-4 py-2 text-xs font-medium text-[#111111] focus:border-[#4285F4] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-1.5">
          {["all", "systems", "cities", "aeo", "services"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? "bg-[#111111] text-white shadow-sm"
                  : "bg-slate-100 text-[#4b5563] hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Explorer Layout */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Node Selection Canvas Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
          {filteredNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`group flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-[#4285F4] bg-[#4285F4]/5 ring-2 ring-[#4285F4] shadow-md"
                    : "border-black/10 bg-white hover:border-black/20 hover:shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        CATEGORY_COLORS[node.category]
                      }`}
                    >
                      {node.category}
                    </span>
                    {node.metrics && (
                      <span className="text-[11px] font-bold text-emerald-600">
                        {node.metrics}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-base font-bold text-[#111111] group-hover:text-[#4285F4]">
                    {node.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#4b5563] line-clamp-2">
                    {node.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-[#6b7280]">
                  <span>{node.connections.length} Connections</span>
                  <span className="text-[#4285F4]">Inspect Node →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Node Inspector Sidebar */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border border-black/10 bg-white p-8 shadow-xl">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <span className="inline-block rounded-full bg-[#4285F4]/10 px-3 py-1 text-xs font-bold uppercase text-[#4285F4]">
                {selectedNode.category} Node Detail
              </span>
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>

            <h2 className="mt-6 text-2xl font-black text-[#111111]">
              {selectedNode.name}
            </h2>

            {selectedNode.metrics && (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700">
                Metric: {selectedNode.metrics}
              </div>
            )}

            <p className="mt-4 text-sm leading-relaxed text-[#4b5563]">
              {selectedNode.description}
            </p>

            <div className="mt-6 border-t border-black/5 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6b7280]">
                Connected Entity Nodes ({selectedNode.connections.length})
              </h3>
              <div className="mt-3 space-y-2">
                {selectedNode.connections.map((connId) => {
                  const connNode = GRAPH_NODES.find((n) => n.id === connId);
                  if (!connNode) return null;
                  return (
                    <button
                      key={connId}
                      onClick={() => setSelectedNode(connNode)}
                      className="flex w-full items-center justify-between rounded-xl border border-black/5 bg-slate-50 p-2.5 text-xs transition-colors hover:bg-slate-100"
                    >
                      <span className="font-semibold text-[#111111]">{connNode.name}</span>
                      <span className="text-[10px] uppercase font-bold text-[#6b7280]">{connNode.category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedNode.link && (
              <div className="mt-8">
                <Link
                  to={selectedNode.link}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-xs font-bold text-white transition-colors hover:bg-[#333333]"
                >
                  View Related Page
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
