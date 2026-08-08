import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Gamepad2, Sparkles, ShieldCheck, Zap, Bot, Terminal, Copy, Check, Play, RefreshCw, Trophy, ArrowRight } from "lucide-react";

type Pet = {
  id: string;
  name: string;
  creator: string;
  role: string;
  image: string;
  level: number;
  xp: number;
  stats: { speed: number; reasoning: number; tools: number; edge: number };
  abilities: string[];
  hermesPrompt: string;
};

const INITIAL_PETS: Pet[] = [
  {
    id: "hermes-fox",
    name: "Hermes Cyber Fox",
    creator: "Nous Research",
    role: "Autonomous Mobile & Terminal Reasoning Companion",
    image: "/images/pets/hermes-fox.jpg",
    level: 42,
    xp: 890,
    stats: { speed: 94, reasoning: 99, tools: 98, edge: 90 },
    abilities: ["Termux Autonomous Code Edit", "Hermes Function Calling", "Open-Weights Reasoning", "Offline Tool Execution"],
    hermesPrompt: "hermes_agent.register_companion(name='Hermes Cyber Fox', skills=['termux_cli', 'code_refactor', 'function_calling'], provider='Nous Research')",
  },
  {
    id: "agy-golem",
    name: "AGY Cyber Golem",
    creator: "Google Antigravity SDK",
    role: "Multi-Agent Coordinator & Code Refactoring Golem",
    image: "/images/pets/agy-golem.jpg",
    level: 50,
    xp: 1200,
    stats: { speed: 92, reasoning: 98, tools: 96, edge: 95 },
    abilities: ["Subagent Delegation", "Safety Policy Enforcement", "Structured JSON Outputs", "Multi-Agent Orchestration"],
    hermesPrompt: "google_antigravity.spawn_agent(role='AGY Cyber Golem', config={'model': 'gemini-3.6-flash', 'thinking_tokens': 2048})",
  },
  {
    id: "gemini-dragon",
    name: "Gemini Cosmic Dragon",
    creator: "Google AI Studio",
    role: "Multimodal Visual & Audio Reasoning Companion",
    image: "/images/pets/gemini-dragon.jpg",
    level: 48,
    xp: 1100,
    stats: { speed: 96, reasoning: 99, tools: 94, edge: 92 },
    abilities: ["Multimodal Image Processing", "PDF Document Ingestion", "Structured Schema Output", "1M+ Context Window"],
    hermesPrompt: "google_ai_studio.connect_multimodal(model='gemini-3.6-pro', capabilities=['vision', 'audio', 'json_schema'])",
  },
  {
    id: "netlify-cheetah",
    name: "Netlify Edge Cheetah",
    creator: "Netlify AI",
    role: "Sub-Second Global Edge & Blobs Routing Companion",
    image: "/images/pets/netlify-cheetah.jpg",
    level: 45,
    xp: 950,
    stats: { speed: 100, reasoning: 90, tools: 92, edge: 100 },
    abilities: ["Global Edge CDN Routing", "Netlify Blobs State Persistence", "Agent Runners Execution", "0.2s TTFB Sprint"],
    hermesPrompt: "netlify_edge.deploy_agent_runner(region='global_edge', blobs_state=True, max_latency_ms=200)",
  },
  {
    id: "horizon-falcon",
    name: "Horizon Cyber Falcon",
    creator: "Hostinger Horizon AI",
    role: "Cloud VPS & Server Automation Companion",
    image: "/images/pets/horizon-falcon.jpg",
    level: 40,
    xp: 820,
    stats: { speed: 95, reasoning: 92, tools: 94, edge: 96 },
    abilities: ["Automated VPS Scaling", "Horizon AI Builder Sync", "Server Health Monitoring", "Cloud Storage Tunnel"],
    hermesPrompt: "hostinger_horizon.provision_vps(specs={'cpu': 8, 'ram': '32GB', 'nvme': '400GB'}, ai_scaling=True)",
  },
];

export default function PixelPetsPlayground() {
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [selectedPet, setSelectedPet] = useState<Pet>(INITIAL_PETS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Game state for 757 Code Collector Arcade Runner
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [playerY, setPlayerY] = useState(140);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacleX, setObstacleX] = useState(500);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Pet Feeding / Level Up
  const feedPet = (petId: string) => {
    setPets((prev) =>
      prev.map((p) => {
        if (p.id === petId) {
          const newXp = p.xp + 50;
          const newLevel = newXp >= 1000 ? p.level + 1 : p.level;
          const updated = {
            ...p,
            xp: newXp % 1000,
            level: newLevel,
            stats: {
              speed: Math.min(100, p.stats.speed + 1),
              reasoning: Math.min(100, p.stats.reasoning + 1),
              tools: Math.min(100, p.stats.tools + 1),
              edge: Math.min(100, p.stats.edge + 1),
            },
          };
          if (p.id === selectedPet.id) setSelectedPet(updated);
          return updated;
        }
        return p;
      })
    );
  };

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Arcade Runner Game Loop
  useEffect(() => {
    if (!gameActive || gameOver) return;

    const interval = setInterval(() => {
      setObstacleX((prev) => {
        if (prev <= -30) {
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) setHighScore(nextScore);
            return nextScore;
          });
          return 500;
        }
        return prev - 12;
      });

      // Jump gravity logic
      setPlayerY((prevY) => {
        if (isJumping) {
          if (prevY <= 40) {
            setIsJumping(false);
            return 40;
          }
          return prevY - 15;
        } else {
          if (prevY >= 140) return 140;
          return prevY + 12;
        }
      });
    }, 30);

    return () => clearInterval(interval);
  }, [gameActive, gameOver, isJumping, highScore]);

  // Collision Detection
  useEffect(() => {
    if (!gameActive || gameOver) return;
    if (obstacleX > 40 && obstacleX < 90 && playerY > 100) {
      setGameOver(true);
    }
  }, [obstacleX, playerY, gameActive, gameOver]);

  const handleJump = () => {
    if (!gameActive) {
      setGameActive(true);
      setGameOver(false);
      setScore(0);
      setObstacleX(500);
      setPlayerY(140);
    } else if (playerY >= 130) {
      setIsJumping(true);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4285F4]/10 px-3.5 py-1 text-xs font-bold text-[#4285F4]">
          <Gamepad2 className="h-3.5 w-3.5" /> Interactive AI Agent Companions &amp; Arcade
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
          Pixel Pets &amp; AI Agent <span className="bg-gradient-to-r from-[#4285F4] via-indigo-600 to-[#174ea6] bg-clip-text text-transparent">Playground</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#4b5563]">
          Interactive pixel companions built for human visitors &amp; autonomous AI agents (Hermes Agent, Google Antigravity SDK, Google AI Studio, Netlify AI, Hostinger Horizon). Play with them on screen or fetch their JSON-LD schema into your local AI orchestrator!
        </p>
      </div>

      {/* ARCADE GAME RUNNER SECTION */}
      <section className="mt-12 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 text-white shadow-2xl md:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400">
              <Trophy className="h-3.5 w-3.5" /> 757 Local Code Runner Arcade
            </span>
            <h2 className="mt-2 text-2xl font-black text-white">Playable 16-Bit Runner Game</h2>
            <p className="text-xs text-slate-400">Press Spacebar, Click, or Tap to jump over slow agency bugs and collect 100/100 Lighthouse speed stars!</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs font-bold uppercase text-slate-400">Score</div>
              <div className="text-2xl font-black text-[#60a5fa]">{score}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold uppercase text-slate-400">High Score</div>
              <div className="text-2xl font-black text-emerald-400">{highScore}</div>
            </div>
          </div>
        </div>

        {/* Game Canvas Area */}
        <div
          ref={canvasRef}
          onClick={handleJump}
          className="relative mt-6 h-48 w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-black select-none"
        >
          {/* Stars / Particles Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-60" />

          {/* Ground Line */}
          <div className="absolute bottom-0 left-0 right-0 h-10 border-t-2 border-slate-700 bg-slate-900/80" />

          {/* Player Sprite (Selected Pet Image) */}
          <div
            className="absolute left-12 h-12 w-12 transition-all duration-75"
            style={{ top: `${playerY}px` }}
          >
            <img
              src={selectedPet.image}
              alt={selectedPet.name}
              className="h-full w-full rounded-xl object-cover ring-2 ring-[#60a5fa] shadow-lg shadow-blue-500/50"
            />
          </div>

          {/* Obstacle Sprite (Slow Agency Bug) */}
          <div
            className="absolute bottom-10 flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 font-mono text-xs font-bold text-white shadow-lg shadow-red-500/50"
            style={{ left: `${obstacleX}px` }}
          >
            BUG!
          </div>

          {/* Overlay Prompts */}
          {!gameActive && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-center">
              <Play className="h-10 w-10 text-[#60a5fa] animate-pulse" />
              <div className="mt-2 text-sm font-bold text-white">Click or Press Jump to Start Game</div>
              <div className="text-xs text-slate-400">Playing with: {selectedPet.name}</div>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-center">
              <div className="text-xl font-extrabold text-red-400">Game Over! Score: {score}</div>
              <p className="mt-1 text-xs text-slate-300">Your {selectedPet.name} leveled up +20 XP!</p>
              <button
                onClick={handleJump}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#4285F4] px-6 py-2 text-xs font-bold text-white hover:bg-[#2563eb]"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Play Again
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PIXEL PETS SELECTION GALLERY */}
      <section className="mt-16">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#111111]">
              Select &amp; Level Up AI Agent Companions
            </h2>
            <p className="mt-1 text-sm text-[#4b5563]">
              Equip tools, feed XP, and copy machine-readable prompt directives for Nous Research Hermes Agent &amp; Google Antigravity.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700">
            5 Companions Active • 100% Agent Accessible
          </span>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {pets.map((pet) => {
            const isSelected = selectedPet.id === pet.id;
            return (
              <div
                key={pet.id}
                onClick={() => setSelectedPet(pet)}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border p-4 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-[#4285F4] bg-[#4285F4]/5 ring-2 ring-[#4285F4] shadow-xl"
                    : "border-black/10 bg-white hover:border-black/20 hover:shadow-md"
                }`}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-900">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                    Lvl {pet.level}
                  </div>
                  <div className="absolute top-2 right-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {pet.xp}/1000 XP
                  </div>
                </div>

                <div className="mt-3 flex flex-1 flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4285F4]">
                      {pet.creator}
                    </span>
                    <h3 className="text-sm font-bold text-[#111111] group-hover:text-[#4285F4]">
                      {pet.name}
                    </h3>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      feedPet(pet.id);
                    }}
                    className="mt-3 inline-flex items-center justify-center gap-1 rounded-xl border border-emerald-300 bg-emerald-50 py-1.5 text-xs font-bold text-emerald-800 transition-colors hover:bg-emerald-100"
                  >
                    <Sparkles className="h-3 w-3 text-emerald-600" />
                    Feed XP (+50)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SELECTED PET INSPECTOR & HERMES API DIRECTIVE */}
      <section className="mt-12 rounded-3xl border border-black/10 bg-slate-900 p-8 text-white shadow-2xl md:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Avatar & Specs */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="relative h-48 w-48 overflow-hidden rounded-3xl border-2 border-[#60a5fa] bg-slate-800 shadow-2xl shadow-blue-500/20">
              <img src={selectedPet.image} alt={selectedPet.name} className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-4 text-2xl font-black text-white">{selectedPet.name}</h3>
            <p className="text-xs text-[#60a5fa] font-semibold">{selectedPet.role}</p>
            <p className="mt-2 text-xs text-slate-300">Created by: <strong>{selectedPet.creator}</strong> • Level {selectedPet.level}</p>

            <div className="mt-4 w-full space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Speed / TTFB:</span>
                <span className="font-bold text-emerald-400">{selectedPet.stats.speed}/100</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Reasoning Score:</span>
                <span className="font-bold text-emerald-400">{selectedPet.stats.reasoning}/100</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Tool Execution:</span>
                <span className="font-bold text-emerald-400">{selectedPet.stats.tools}/100</span>
              </div>
            </div>
          </div>

          {/* Hermes Agent Schema & Prompt Copy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#60a5fa]">
                <Terminal className="h-4 w-4" /> Hermes Agent &amp; Nous Research Tool Directive
              </div>
              <h4 className="mt-2 text-xl font-bold text-white">Machine-Readable AI Companion Schema</h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Copy this python tool directive to equip <strong>{selectedPet.name}</strong> inside your local Hermes Agent runtime, Termux mobile terminal, or Google Antigravity SDK agent instance.
              </p>

              {/* Code Snippet Box */}
              <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-blue-300">
                <code>{selectedPet.hermesPrompt}</code>
                <button
                  onClick={() => copyPrompt(selectedPet.hermesPrompt, selectedPet.id)}
                  className="absolute top-3 right-3 rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  {copiedId === selectedPet.id ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Abilities Badges */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Equipped Abilities</div>
              <div className="flex flex-wrap gap-2">
                {selectedPet.abilities.map((ability, idx) => (
                  <span key={idx} className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 border border-slate-700">
                    ⚡ {ability}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
